// backend/src/controllers/authController.js
//export const login = (req, res, next, passport) => {
//  req.isLoading = true;
//  passport.authenticate('local', (err, user, info) => {
//    req.isLoading = false;
//    if (err) {
//      console.error('Authentication error:', err);
//      return res.status(500).json({ error: 'Internal server error' });
//    }
//
//    if (!user) {
//      return res.status(401).json({ error: info.message || 'Authentication failed' });
//    }
//
//    req.login(user, (err) => {
//      if (err) {
//        console.error('Login error:', err);
//        return res.status(500).json({ error: 'Error logging in' });
//        
//      }
//      
//      
//
//      return res.json({
//        success: true,
//        user: {
//          id: user.id,
//          email: user.email,
//          firstName: user.firstName,
//          lastName: user.lastName,
//        },
//      });
//    });
//  })(req, res, next);
//};

export const login = (req, res, next, passport) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)      return res.status(500).json({ error: 'Internal server error' });
    if (!user)   return res.status(401).json({ error: info.message });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: 'Error logging in' });

      // **This forces the Set-Cookie to go out before we send JSON**
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({ error: 'Session save failed' });
        }

        // Now the cookie header has been sent
        res.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        });
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

export const googleCallback = (req, res) => {
  if (req.user) {
    res.redirect('http://localhost:5173'); // Redirect to the frontend
  } else {
    res.status(401).json({ error: 'Google authentication failed' });
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
