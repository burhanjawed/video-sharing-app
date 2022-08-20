import express from 'express';
import { signin, signup, googleAuth } from '../controllers/Auth.js';

const router = express.Router();

// Create a user
router.post('/signup', signup);

// Sign in
router.post('/signin', signin);

// Google authentication
router.post('/google', googleAuth);

export default router;
