import express from 'express';
import {
  saveUser,
  findMutualFriends,
  searchUsers,
  softDeleteUser,
  updateUser,
  getSortedUsers,
} from '../controllers/userController';

const router = express.Router();

router.post('/', saveUser); // Save GitHub user
router.post('/:username/friends', findMutualFriends); // Find mutual friends
router.get('/search', searchUsers); // Search users
router.delete('/:username', softDeleteUser); // Soft delete user
router.put('/:username', updateUser); // Update user details
router.get('/', getSortedUsers); // Get sorted users

export default router;
