import axios from 'axios';

const GITHUB_API = 'https://api.github.com/users';

export const fetchGitHubUser = async (username: string) => {
  try {
    const response = await axios.get(`${GITHUB_API}/${username}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data from GitHub');
  }
};

export const fetchGitHubFollowers = async (username: string) => {
  try {
    const response = await axios.get(`${GITHUB_API}/${username}/followers`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch followers from GitHub');
  }
};

export const fetchGitHubFollowing = async (username: string) => {
  try {
    const response = await axios.get(`${GITHUB_API}/${username}/following`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch following from GitHub');
  }
};
