import User from '../models/User.js';

// Find the user by ID (or another identifier like email)
const user = await User.create({ firstName: "Tristan", lastName: "Johnston", email:"tristan.c.johnston@gmail.com", password: "bonk"})

if (user) {
    // Update the password directly
    await user.update({ password: 'bingobongo' });
  
    console.log('Password updated successfully');
  } else {
    console.log('User not found');
  }
  