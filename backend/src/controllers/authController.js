// backend/src/controllers/authController.js
import passport from '../config/passport-setup.js';

// Login endpoint using passport local strategy
export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ error: info.message || 'Authentication failed' });
    }

    req.login(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Error logging in' });
      }

      return res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    });
  })(req, res, next);
};

// Check login status
export const checkStatus = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      loggedIn: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName
      }
    });
  } else {
    return res.json({ loggedIn: false });
  }
};

// Google OAuth routes
export const googleAuth = passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account'
});

export const googleCallback = (req, res) => {
  res.redirect('http://localhost:5173');
};

// Logout route
export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to destroy session' });
      }
      res.clearCookie('connect.sid');
      return res.json({ success: true });
    });
  });
};
