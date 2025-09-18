import authController from '../controllers/auth.controllers.js';
import express from 'express';
const router = express.Router();

// POST http://localhost:5555/api/auth/signup
router.post('/signup', authController.signUp);

// POST http://localhost:5555/api/auth/signin
router.post('/signin', authController.signIn);

export default router;

