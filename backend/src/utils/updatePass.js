import User from '../models/User.js';

// Find the user by ID (or another identifier like email)
const user = await User.findOne({ where: { id: 'e529f07d-e45e-4021-ad07-aea346c1455a' } });

if (user) {
  // Update the password directly
  await user.update({ password: 'bonk' });

  console.log('Password updated successfully');
} else {
  console.log('User not found');
}
