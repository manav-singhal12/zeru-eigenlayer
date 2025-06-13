import express from 'express';
import { getRestakers } from '../controllers/restaker.controller.js';

const router = express.Router();

router.get('/', getRestakers);

export default router;
