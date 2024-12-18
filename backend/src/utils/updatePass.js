import User from '../models/User.js';

// Find the user by ID (or another identifier like email)
const user = await User.findOne({ where: { id: '10a31c35-9965-4997-8661-f1e72497151f' } });

if (user) {
  // Update the password directly
  await user.update({ password: 'bingobongo' });

  console.log('Password updated successfully');
} else {
  console.log('User not found');
}
