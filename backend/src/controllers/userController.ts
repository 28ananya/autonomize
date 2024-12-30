import { Request, Response } from 'express';
import User from '../models/User';
import Friend from '../models/Friend';
import { fetchGitHubUser, fetchGitHubFollowers, fetchGitHubFollowing } from '../services/githubService';

// Save GitHub User
export const saveUser = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    let user = await User.findOne({ where: { username } });

    if (!user) {
      const data = await fetchGitHubUser(username);
      user = await User.create({
        username: data.login,
        name: data.name,
        bio: data.bio,
        blog: data.blog,
        location: data.location,
        avatar_url: data.avatar_url,
        public_repos: data.public_repos,
        public_gists: data.public_gists,
        followers: data.followers,
        following: data.following,
        created_at: data.created_at,
        updated_at: data.updated_at,
      });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Find Mutual Friends
export const findMutualFriends = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const followers = await fetchGitHubFollowers(username);
    const following = await fetchGitHubFollowing(username);
    console.log(followers)
    const mutualFriends = followers.filter((follower: any) =>
      following.some((followed: any) => followed.login === follower.login)
    );

    const user = await User.findOne({ where: { username } });
    if (user) {
      for (const friend of mutualFriends) {
        const friendRecord = await User.findOne({ where: { username: friend.login } });
        if (friendRecord) {
          await Friend.create({ user_id: user.id, friend_id: friendRecord.id });
        }
      }
    }

    res.json(mutualFriends);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Search Users
export const searchUsers = async (req: Request, res: Response) => {
  const { username, location } = req.query;

  try {
    const filters: any = {};
    if (username) filters.username = username;
    if (location) filters.location = location;

    const users = await User.findAll({ where: filters });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Soft Delete User
export const softDeleteUser = async (req: Request, res: Response) : Promise<any> => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User soft deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update User
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { username } = req.params;
  const updates = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update(updates);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get Sorted Users
export const getSortedUsers = async (req: Request, res: Response) => {
  const { sortBy = 'public_repos', order = 'DESC' } = req.query;

  try {
    const users = await User.findAll({
      order: [[String(sortBy), String(order)]],
    });

    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getUserDetails = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
