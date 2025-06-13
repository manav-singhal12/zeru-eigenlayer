import express from 'express';
import { getRewards } from '../controllers/reward.controller.js';

const router = express.Router();

router.get('/:address', getRewards);

export default router;
