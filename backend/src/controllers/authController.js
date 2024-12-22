// backend/src/controllers/authController.js
export const login = (req, res, next, passport) => {
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
          lastName: user.lastName,
        },
      });
    });
  })(req, res, next);
};

export const checkStatus = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      loggedIn: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      },
    });
  } else {
    return res.json({ loggedIn: false });
  }
};

export const googleCallback = async (req, res) => {
  try {
    const user = req.user; // This is the authenticated user from Passport
    console.log('Authenticated User:', user); // Add this line to check the user

    if (user) {
      // User is already authenticated (via local strategy)
      if (!user.googleId) {
        user.googleId = req.user.googleId;
        await user.save();
      }
    }

    res.redirect('http://localhost:5173'); // Redirect to your frontend
  } catch (err) {
    console.error('Error during Google callback:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



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
