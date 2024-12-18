// backend/src/routes/authRoutes.js
import express from 'express';
import passport from '../config/passport-setup.js';

const router = express.Router();

// Initiate Google OAuth
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

// Google OAuth callback
router.get('/google/callback', 
    passport.authenticate('google', { 
      failureRedirect: '/login', 
      session: true 
    }),
    (req, res) => {
      if (!req.user) {
        return res.redirect('/login'); // If authentication failed
      }
      res.redirect('http://localhost:5173'); // Successful login
    }
  );

// Local Authentication

app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded


router.post('/login', 
  passport.authenticate('local', {failureRedirect: '/login'}),
  (req,res) => {
    res.redirect('/')
  }
)
  

// Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).send('Failed to logout');
      }
  
      console.log('Logged out, session data:', req.session); // Add this line to check session data
  
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send('Failed to destroy session');
        }
  
        console.log('Session destroyed');
        res.clearCookie('connect.sid'); // Clear the session cookie manually
        res.redirect('http://localhost:5000'); // Redirect after logging out
      });
    });
  });
  
export default router;