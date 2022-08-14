import express from 'express';
import {
  addComment,
  deleteComment,
  getComments,
} from '../controllers/Comment.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// create a comment
router.post('/', verifyToken, addComment);

// delete a comment
router.delete('/:videoId/:id', verifyToken, deleteComment);

// get comments
router.get('/:videoId', getComments);

export default router;
