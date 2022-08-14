import { createError } from '../error.js';
import User from '../models/User.js';

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      // find user by id and update
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, 'Unauthorized'));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      // find user by id and delete
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted');
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, 'Unauthorized'));
  }
};

export const getUser = async (req, res, next) => {
  try {
    // get user
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Subscribe to user
export const subscribeUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    // if no user is found
    if (!user) return next(createError(404, 'User not found'));

    // subscribe to user and add user to subscriptions
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscriptions: req.params.id },
    });

    // Increase number of subscribers for subscribed channel
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });

    res.status(200).json('Subscription successful');
  } catch (err) {
    next(err);
  }
};

export const unsubscribeUser = async (req, res, next) => {
  try {
    // unsubscribe to user
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscriptions: req.params.id },
    });

    // Decrease number of subscribers for subscribed channel
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    res.status(200).json('Unsubscribed successfully');
  } catch (err) {
    next(err);
  }
};

export const likeVideo = async (req, res, next) => {};

export const dislikeVideo = async (req, res, next) => {};
