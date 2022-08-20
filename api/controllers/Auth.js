import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

// Sign up
export const signup = async (req, res, next) => {
  try {
    // encrypt password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // create new user
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send('User has been created');
  } catch (err) {
    next(err);
  }
};

// Sign in
export const signin = async (req, res, next) => {
  try {
    // find user
    const user = await User.findOne({
      name: req.body.name,
    });

    // if no user found throw error
    if (!user) return next(createError(404, 'User not found'));

    // check if password is correct
    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    // if password is incorrect throw error
    if (!isCorrect)
      return next(createError(400, 'Name or password is incorrect'));

    // create access token
    const token = jwt.sign({ id: user._id }, process.env.JWT);

    // remove password from response
    const { password, ...otherInfo } = user._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherInfo);
  } catch (err) {
    next(err);
  }
};

// Google authentication
export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      // create access token
      const token = jwt.sign({ id: user._id }, process.env.JWT);

      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });

      const savedUser = await newUser.save();

      // create access token
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);

      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
