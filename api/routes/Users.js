import express from 'express';
import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeVideo,
  subscribeUser,
  unsubscribeUser,
  updateUser,
} from '../controllers/User.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// update user
router.put('/:id', verifyToken, updateUser);

// delete user
router.delete('/:id', verifyToken, deleteUser);

// get user
router.get('/find/:id', getUser);

// subscribe to user
router.put('/subscribe/:id', verifyToken, subscribeUser);

// unsubscribe to user
router.put('/unsubscribe/:id', verifyToken, unsubscribeUser);

// like a video
router.put('/like/:videoId', verifyToken, likeVideo);

// dislike a video
router.put('/dislike/:videoId', verifyToken, dislikeVideo);

export default router;
