// backend/src/config/passport-setup.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy} from 'passport-local'
import dotenv from 'dotenv';
import User from '../models/User.js'; // Your User model

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists in database
      let existingUser = await User.findOne({ 
        where: { googleId: profile.id } 
      });

      if (existingUser) {
        // User exists, pass to done
        return done(null, existingUser);
      }
      
      // Ensure required data from Google profile exists
      const firstName = 'DefaultFirstName'; //const firstName = profile.name?.givenName || 'DefaultFirstName';
      const lastName = 'DefaultLastName';  //const lastName = profile.name?.familyName || 'DefaultLastName';
      const email = profile.emails?.[0]?.value || 'defaultemail@example.com';

      // Create new user if not exists
      const newUser = await User.create({
        googleId: profile.id,
        firstName,
        lastName,
        email,
        // You might want to add more fields
      });

      return done(null, newUser);
    } catch (error) {
      console.error('Error during Google login:', error);
      return done(error, false);
    }
  }
));

// Local Strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // Explicitly use 'email' instead of the default 'username'
  async function(email, password, done) {
    email = email.toLowerCase()
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));



// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        // If no user is found, it's likely that the session has been cleared
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
  

export default passport;