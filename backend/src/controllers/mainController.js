import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    
    // Convert Sequelize instances to plain objects
    const plainUsers = users.map(user => user.toJSON());

    // Send plain users as JSON
    res.json(plainUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users. Please try again later.' });
  }
};
