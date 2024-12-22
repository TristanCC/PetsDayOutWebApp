// backend/src/routes/authRoutes.js
import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Route to log in using passport
router.post('/login', authController.login);

// Route to check login status
router.get('/status', authController.checkStatus);

// Google OAuth routes
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);

// Route to log out
router.get('/logout', authController.logout);

export default router;
