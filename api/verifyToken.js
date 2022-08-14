import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
  // Get access token from cookies
  const token = req.cookies.access_token;

  // if no token found
  if (!token) return next(createError(401, 'You are not authenticated'));

  // verify token
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid'));

    req.user = user;
    next();
  });
};
