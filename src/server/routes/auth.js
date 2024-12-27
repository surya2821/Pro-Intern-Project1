import express from 'express';
import { login, signup } from '../controllers/authController.js';
import { validateAuth } from '../middleware/validateAuth.js';

const router = express.Router();

router.post('/login', validateAuth, login);
router.post('/signup', validateAuth, signup);

export default router;