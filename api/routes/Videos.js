import express from 'express';
import {
  addVideo,
  addView,
  deleteVideo,
  getRandomVideo,
  getSubVideo,
  getTrendVideo,
  getVideo,
  getVideoBySearch,
  getVideoByTag,
  updateVideo,
} from '../controllers/Video.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// create a video
router.post('/', verifyToken, addVideo);

// update a video
router.put('/:id', verifyToken, updateVideo);

// delete a video
router.delete('/:id', verifyToken, deleteVideo);

// get a video
router.get('/find/:id', getVideo);

// update video views
router.put('/view/:id', addView);

// get trending videos
router.get('/trend', getTrendVideo);

// get random videos
router.get('/random', getRandomVideo);

// get subscription's videos
router.get('/sub', verifyToken, getSubVideo);

// get videos by tags
router.get('/tags', getVideoByTag);

// // get videos by title
router.get('/search', getVideoBySearch);

export default router;
