import { createError } from '../error.js';
import Comment from '../models/Comment.js';
import Video from '../models/Video.js';

// create a comment
export const addComment = async (req, res, next) => {
  const newComment = new Comment({ userId: req.user.id, ...req.body });

  try {
    const savedComment = await newComment.save(); // save comment
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};

// delete a comment
export const deleteComment = async (req, res, next) => {
  try {
    // find comment by id
    const comment = await Comment.findById(req.params.id);

    // find video by id
    const video = await Video.findById(req.params.videoId);

    // if no comment found
    if (!comment) return next(createError(404, 'Comment not found'));

    // if no video found
    if (!video) return next(createError(404, 'Video not found'));

    // check if request user id matches comment's userId or video's userId and delete comment
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json('Comment deleted');
    } else {
      return next(createError(403, 'Unauthorized'));
    }
  } catch (err) {
    next(err);
  }
};

// get comments
export const getComments = async (req, res, next) => {
  try {
    // get all comments by video id
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
