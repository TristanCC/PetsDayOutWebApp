import Customer from '../models/Customer.js';

export const getCustomers = async (req, res) => {
  try {
    const users = await Customer.findAll();
    
    // Convert Sequelize instances to plain objects
    const plainCustomers = users.map(customer => customer.toJSON());

    // Send plain users as JSON
    res.json(plainCustomers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers. Please try again later.' });
  }
};
