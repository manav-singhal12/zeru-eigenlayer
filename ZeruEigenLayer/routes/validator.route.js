import express from 'express';
import { getValidators } from '../controllers/validator.controller.js';

const router = express.Router();

router.get('/', getValidators);

export default router;
