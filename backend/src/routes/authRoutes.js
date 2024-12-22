// backend/src/routes/authRoutes.js
import express from 'express';
import passport from '../config/passport-setup.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/login', (req, res, next) => authController.login(req, res, next, passport));
router.get('/status', authController.checkStatus);
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account',
}));
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:5173/login',
    session: true,
  }), 
  authController.googleCallback
);
router.get('/logout', authController.logout);

export default router;
