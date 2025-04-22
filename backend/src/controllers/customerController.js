import Customer from '../models/Customer.js';
import Pet from '../models/Pet.js'
import Group from '../models/Group.js';
import Present from '../models/Present.js'
import { Op } from 'sequelize';

export const createCustomer = async (req, res) => {
  const { firstName, middleName, lastName, email, phoneNumber, customerComment } = req.body;

  try {
    console.log('Request body:', req.body);

    // Check if phone number already in system
    let customerWithMatchingPhone = await Customer.findOne({
      where: { phoneNumber }
    });

    let matchingGroup = null;

    if (customerWithMatchingPhone) {
      // Create a group if the matched customer doesn't have one
      if (!customerWithMatchingPhone.groupID) {
        const newGroup = await Group.create();
        await customerWithMatchingPhone.update({ groupID: newGroup.id });
        matchingGroup = newGroup.id;
      } else {
        matchingGroup = customerWithMatchingPhone.groupID;
      }
    }

    // Create new customer, adding to group if phone matches
    const newCustomerData = {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      customerComment,
      ...(matchingGroup && { groupID: matchingGroup }) // Add groupID only if present
    };

    const newCustomer = await Customer.create(newCustomerData);

    console.log('Customer created successfully:', newCustomer);
    res.status(201).json({ newCustomer });
  } catch (error) {
    console.error('Error creating customer:', error);
    console.error('Request body:', req.body);
    res.status(500).json({ error: 'Failed to create customer.' });
  }
};


export const getCustomer = async (req, res) => {
  const { id } = req.params; // Customer ID

  try{
    const customer = await Customer.findOne({
      where: { id: `${id}` }
    })
    res.json(customer)
  } catch(error) {
    console.error("error getting customer", error)
    res.status(500).json({error: 'failed to fetch customer.'})
  }
}


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
    const customer = await Customer.findAll({
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

// function to get all members of a particular household
export const getHousehold = async (req, res) => {

  try {
    const { groupID } = req.params
    if (!groupID) {
      return res.status(404).json({ error: 'No groupID provided.'})
    }

    const groupMembers = await Customer.findAll({ where: { groupID: `${groupID}` } })
    if (!groupMembers) {
      return res.status(404).json({ error: 'No group members provided.'})
    }

    const groupPets = await Pet.findAll({
      include: [{
        model: Customer,
        where: {groupID},
        through: {attributes: []}
      }]
    })

    res.json({
      groupMembers,
      groupPets
  })

  } catch(error) {
    console.error("error getting household", error)
    res.status(500).json({ error: 'Failed to get household.' });
  }
}

export const removeFromHousehold = async (req, res) => {
  // handle case where 1 person left
}

export const verifyPhone = async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    const customer = await Customer.findOne({ where: { phoneNumber } });

    if (customer) {
      const customerID = customer.id
      return res.status(200).json({ status: "verified", id: customerID });
    } else {
      return res.status(404).json({ status: "not found", message: "Customer not found" });
    }
  } catch (error) {
    console.error("Error verifying phone number:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};



/*
    PRESENT
*/ 

export const markPresent = async (req, res) => {
  try {
    const { customer: customerId, pets } = req.body;

    if (!customerId || !Array.isArray(pets)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Check for existing records
    const existingRecords = await Present.findAll({
      where: {
        petID: { [Op.in]: pets },
        status: 'present'
      }
    });

    // Filter out already marked pets
    const existingPetIDs = existingRecords.map(record => record.petID);
    const newPets = pets.filter(petID => !existingPetIDs.includes(petID));

    if (newPets.length === 0) {
      return res.status(400).json({ 
        message: "All pets are already marked as present" 
      });
    }

    // Prepare and create new records
    const entries = newPets.map(petID => ({
      customerID: customerId,
      petID: petID,
      status: 'present',
      date: new Date().toISOString().split('T')[0]
    }));

    const results = await Present.bulkCreate(entries);

    res.status(200).json({ 
      message: "Marked as present", 
      records: results 
    });
  } catch (error) {
    console.error("Error marking present:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getPresent = async (req, res) => {
  try {
    const presentCustomers = await Present.findAll({
      where: { status: 'present' },
      include: [
        { model: Customer, attributes: { exclude: ['createdAt', 'updatedAt'] } },
        { model: Pet }
      ]
    });

    if (!presentCustomers || presentCustomers.length === 0) {
      return res.status(404).json({ message: "No present customers found" });
    }

    const grouped = presentCustomers.reduce((acc, record) => {
      if (!record.Customer || !record.Pet) return acc;

      const customerId = record.customerID;

      if (!acc[customerId]) {
        acc[customerId] = {
          customer: record.Customer,
          pets: []
        };
      }

      const petWithStatus = {
        ...record.Pet.get({ plain: true }),
        completed: record.completed
      };

      acc[customerId].pets.push(petWithStatus);
      return acc;
    }, {});

    const groupedArray = Object.values(grouped);
    res.json(groupedArray);
  } catch (error) {
    console.error('Error getting present customers:', error);
    res.status(500).json({ message: "Server error" });
  }
};


export const togglePetComplete = async (req, res) => {
  try {
    const { petID} = req.body;

    const record = await Present.findOne({
      where: { petID, status: 'present' }
    });

    if (!record) {
      return res.status(404).json({ message: "Pet record not found" });
    }

    record.completed = !record.completed;
    await record.save();

    res.status(200).json({ message: "Updated completion status", record });
  } catch (error) {
    console.error("Error toggling pet completion:", error);
    res.status(500).json({ message: "Server error" });
  }
};
