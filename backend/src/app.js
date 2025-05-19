import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './db/pool.js';
import session from 'express-session';
import flash from 'connect-flash'; 

import './db/associations.js'; // Import associations to ensure they're loaded


import passport from './config/passport-setup.js';
import authRoutes from './routes/authRoutes.js';
import mainRoutes from './routes/mainRoutes.js'
import s3_routes from './routes/s3_routes.js'

// Import models to ensure they're loaded
import User from './models/User.js';
import Customer from './models/Customer.js'

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust-proxy', 1)
// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  },
}));

// Log incoming requests
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.path);
  next();
});


// Connect-flash middleware
app.use(flash());

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log('Session Data:', req.session);
  next();
});


app.use('/auth', authRoutes);
app.use('/', mainRoutes);
app.use('/s3', s3_routes)

// add endpoints for updating profile info: first name, last name, password

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
