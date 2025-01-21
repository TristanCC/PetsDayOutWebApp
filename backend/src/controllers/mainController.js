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

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, customerComment } = req.body;


  try {
    console.log("recieved id: ", id);
    // Corrected model reference and assignment
    const customer = await Customer.findOne({ where: { id: `${id}` } });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    console.log("recieved customer: ", customer.firstName);
    // Use .update() directly instead of setting properties manually
    await customer.update({ firstName, lastName, email, phoneNumber, customerComment });

    console.log('Customer updated successfully!!!');
    
    res.json(customer.toJSON());  // Return updated customer
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Failed to update customer. Please try again later.' });
  }
};