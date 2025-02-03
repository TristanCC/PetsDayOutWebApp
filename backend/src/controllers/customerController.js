import Customer from '../models/Customer.js';
import { Op } from 'sequelize';

export const createCustomer = async (req, res) => {
  const { firstName, middleName, lastName, email, phoneNumber, customerComment } = req.body;
  
  try {
    const newCustomer = await Customer.create({ firstName, middleName, lastName, email, phoneNumber, customerComment });
    res.status(201).json(newCustomer); // Respond with the created customer
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Failed to create customer.' });
  }
};


export const getCustomers = async (req, res) => {
  const { limit, offset } = req.query
  try {
    const customers = await Customer.findAll({
      limit,
      offset
    });
    
    // Convert Sequelize instances to plain objects
    const plainCustomers = customers.map(customer => customer.toJSON());

    // Send plain customers as JSON
    res.json(plainCustomers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers. Please try again later.' });
  }
};

const sanitizeNames = (names) => {
  return names.map((name) => name.toLowerCase()); // Convert everything to lowercase
}


const searchFirstAndLast = async (firstName, lastName) => {
  const namesToSanitize = [firstName, lastName]
  const names = sanitizeNames(namesToSanitize)
  try {
    const customer = await Customer.findAll({
      where: {
        firstName: { [Op.iLike]: `%${names[0]}%` },
        lastName: { [Op.iLike]: `%${names[1]}%` }
      }
    })
    return customer
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

const searchFirst = async (firstName) => {
  const namesToSanitize = [firstName]
  const names = sanitizeNames(namesToSanitize)
  try {
    const customer = await Customer.findAll({
      where: {
        firstName: { [Op.iLike]: `%${names[0]}%` }
      }
    })
    return customer
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

const searchLast = async (lastName) => {
  const namesToSanitize = [lastName]
  const names = sanitizeNames(namesToSanitize)
  try {
    const customer = await Customer.findAll({
      where: {
        lastName: { [Op.iLike]: `%${names[0]}%` }
      }
    })
    return customer
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}


//TODO SANITIZE PHONE
const searchPhone = async (phone) => {
  try {
    const customer = await Customer.findOne({
      where: {
        phoneNumber: { [Op.iLike]: `%${phone}%` }
      }
    })
    return customer
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

export const findCustomer = async (req, res) => {
  const { firstName, lastName, phone } = req.query;
  try {
    let customer;
    if (firstName && lastName) {
      customer = await searchFirstAndLast(firstName, lastName);
      if (!customer || customer.length === 0) {
        customer = await searchFirst(firstName);
        if (!customer || customer.length === 0) {
          customer = await searchLast(lastName);
        }
      }
    } else if (firstName) {
      customer = await searchFirst(firstName);
    } else if (lastName) {
      customer = await searchLast(lastName);
    } else if (phone) {
      customer = await searchPhone(phone);
    } else {
      return res.status(400).json({ error: 'No search parameters provided' });
    }

    // **Force fresh response**
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Expires', '0');
    res.setHeader('Pragma', 'no-cache');
    
    console.log(customer);
    res.status(200).json(customer);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customer.' });
  }
};


export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { firstName, middleName, lastName, email, phoneNumber, customerComment } = req.body;


  try {
    console.log("recieved id: ", id);
    // Corrected model reference and assignment
    const customer = await Customer.findOne({ where: { id: `${id}` } });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    await customer.update({ firstName, middleName, lastName, email, phoneNumber, customerComment });

    console.log('Customer updated successfully!!!');
    
    res.json(customer.toJSON());  // Return updated customer
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Failed to update customer. Please try again later.' });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id)

    const customerToDelete = await Customer.findOne({ where: { id: `${id}` } });

    if (!customerToDelete) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const deletedCustomer = customerToDelete.toJSON(); // Capture customer data before deletion

    await customerToDelete.destroy();

    res.json(deletedCustomer); // Send the deleted customer data back to the frontend
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Failed to delete customer. Please try again later.' });
  }
};
