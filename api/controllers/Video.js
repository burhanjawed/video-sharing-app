import { createError } from '../error.js';
import User from '../models/User.js';
import Video from '../models/Video.js';

// Create a video
export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });

  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

// Update a video
export const updateVideo = async (req, res, next) => {
  try {
    // find video by id
    const video = await Video.findById(req.params.id);

    // if no video found
    if (!video) return next(createError(404, 'Video not found'));

    // check if request user id matches video's userId and update video
    if (video.userId === req.user.id) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, 'Unauthorized'));
    }
  } catch (err) {
    next(err);
  }
};

// Delete a video
export const deleteVideo = async (req, res, next) => {
  try {
    // find video by id
    const video = await Video.findById(req.params.id);

    // if no video found
    if (!video) return next(createError(404, 'Video not found'));

    // check if request user id matches video's userId and delete video
    if (video.userId === req.user.id) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json('Video deleted');
    } else {
      return next(createError(403, 'Unauthorized'));
    }
  } catch (err) {
    next(err);
  }
};

// Get a video
export const getVideo = async (req, res, next) => {
  try {
    // find video by id
    const video = await Video.findById(req.params.id);

    // if no video found
    if (!video) return next(createError(404, 'Video not found'));

    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

// update video's views
export const addView = async (req, res, next) => {
  try {
    // find video by id and update views
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.status(200).json("Video's views has been updated");
  } catch (err) {
    next(err);
  }
};

// Get random videos
export const getRandomVideo = async (req, res, next) => {
  try {
    // find video by id
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);

    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// Get trending videos
export const getTrendVideo = async (req, res, next) => {
  try {
    // find and sort videos with the most views
    const videos = await Video.find().sort({ views: -1 });

    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// Get subscription's videos
export const getSubVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscriptions = user.subscriptions; // get user subscriptions

    // return list of subscriptions' videos
    const list = await Promise.all(
      subscriptions.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt)); // sort by video created date
  } catch (err) {
    next(err);
  }
};

// Get videos by tags
export const getVideoByTag = async (req, res, next) => {
  // get tags query
  const tags = req.query.tags.split(',');

  try {
    // search all videos with tags
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// Get videos by title
export const getVideoBySearch = async (req, res, next) => {
  // get search query
  const query = req.query.q;

  try {
    // search all videos' title with query
    const videos = await Video.find({
      title: { $regex: query, $options: 'i' },
    }).limit(40);

    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
