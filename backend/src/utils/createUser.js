import { where } from 'sequelize';
import User from '../models/User.js'
// Find the user by ID (or another identifier like email)

const [rowsUpdated] = await User.update(
  {
    firstName: "Tristan",
    lastName: "Johnston",
    email: "tristan.c.johnston@gmail.com",
    password: "bonk"
  },
  {
    where: { firstName: "Tristan" }
  }
);

if (rowsUpdated > 0) {
  console.log('User updated successfully');
} else {
  console.log('User not found');
}
