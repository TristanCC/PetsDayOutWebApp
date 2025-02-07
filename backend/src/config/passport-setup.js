// backend/src/config/passport-setup.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy} from 'passport-local'
import dotenv from 'dotenv';
import User from '../models/User.js'; // Your User model

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, // Ensure this is set correctly in your .env file
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Ensure this is set correctly
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/auth/google/callback', // Ensure this is set correctly in your .env
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ where: { email: profile.emails[0].value } });

    if (!user) {
      // If the user doesn't exist, create a new one
      user = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      });
      await user.save();
    } else if (!user.googleId) {
      // If the user exists but doesn't have a googleId, update the user's googleId
      user.googleId = profile.id;
      await user.save(); // Save the updated user
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
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
      console.log(`User with ID ${id} not found in database.`);
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    console.error('Error deserializing user:', error);
    return done(error, false);
  }
});

  

export default passport;