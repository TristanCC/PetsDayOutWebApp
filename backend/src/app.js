import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './db/pool.js';
import session from 'express-session';
import passport from './config/passport-setup.js';
import authRoutes from './routes/authRoutes.js';

// Import models to ensure they're loaded
import User from './models/User.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Add to .env
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // In development, this should be false
    httpOnly: true, // Ensures cookie is not accessible via JS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours, can reduce this temporarily for testing
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

// Database connection function
async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync models (be careful with force: true in production)
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

// Initialize the server
async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
