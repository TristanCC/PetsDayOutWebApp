import express from 'express';
import passport from '../config/passport-setup.js';
import fetch from 'node-fetch'; // If not already installed, run `npm install node-fetch`

const router = express.Router();

// Proxy endpoint for login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();  // Parse the response as JSON
    res.status(response.status).json(data);  // Send JSON response to the frontend
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Check if user is logged in
router.get('/status', (req, res) => {
  if (req.user) {  // Check if the user is authenticated
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Initiate Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: true }),
  (req, res) => {
    if (!req.user) {
      return res.redirect('/login'); // If authentication failed
    }
    res.redirect('http://localhost:5173/success'); // Successful login
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Failed to logout');
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Failed to destroy session');
      }

      res.clearCookie('connect.sid');  // Clear the session cookie
      res.json({ message: 'Logged out successfully' });  // Send JSON response on logout
    });
  });
});

// GET /login route for rendering login page
router.get('/login', (req, res) => {
  const errorMessage = req.flash('error') || null;  // Get any flash message
  console.log(errorMessage);  // Log the error message for debugging
  res.render('login', { errorMessage });  // Render the login page, passing errorMessage to the template
});

export default router;
