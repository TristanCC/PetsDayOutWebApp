// app.js
import express from 'express';
import dotenv from 'dotenv';
import { admin } from './private/firebase/firebaseAdmin.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// app.js (continued)
async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ error: "Token verification failed" });
    }
  }
  
  app.post('/api/protected', verifyToken, (req, res) => {
    res.send(`Hello, ${req.user.uid}`);
  });
  
