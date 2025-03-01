import CustomerPet from '../models/CustomerPet.js'
import Customer from '../models/Customer.js'
import Pet from '../models/Pet.js'
import Group from "../models/Group.js"

// create

export const createPet = async (req, res) => {
    const { name, breed, size, photoUrl, ownerID } = req.body;

    try {
        // Step 1: Create the new pet
        const newPet = await Pet.create({ name, breed, size, photoUrl });

        // Step 2: Check if the owner is part of a shared group
        console.log("CHECKING IF PART OF GROUP");

        const customer = await Customer.findByPk(ownerID);

        if (customer?.groupID) {
            console.log("Owner belongs to a group, linking pet to all members.");

            // Find all customers in the same group
            const groupCustomers = await CustomerPet.findAll({
                where: { groupID: customer.groupID } // Use customer.groupID here
            });

            // Create a record for each group member
            await Promise.all(
                groupCustomers.map(async (groupCustomer) => {
                    const existingEntry = await CustomerPet.findOne({
                        where: { petID: newPet.id, ownerID: groupCustomer.ownerID }
                    });

                    if (!existingEntry) {
                        await CustomerPet.create({
                            petID: newPet.id,
                            ownerID: groupCustomer.ownerID,
                            groupID: customer.groupID // Use customer.groupID here
                        });
                    }
                })
            );

        } else {
            console.log("Owner does NOT belong to a group, linking pet to the owner only.");
            await CustomerPet.create({ petID: newPet.id, ownerID });
        }

        return res.status(201).json(newPet);
    } catch (error) {
        console.error("Error creating pet:", error);
        return res.status(500).json({ message: "Failed to create pet." });
    }
};


export const linkCustomers = async (req, res) => {
    const { currentOwnerID, targetOwnerID } = req.body;

    try {
        // Look up one of the customers to see if they already belong to a group
        const targetCustomer = await Customer.findByPk(targetOwnerID);
        let groupID = targetCustomer.groupID;

        // If the target customer doesn't have a group, create one
        if (!groupID) {
            const sharedGroup = await Group.create();
            groupID = sharedGroup.id;
        }

        // Update both customers to have the same groupID
        await Customer.update({ groupID }, { where: { id: [currentOwnerID, targetOwnerID] } });

        return res.status(200).json({ message: 'Customers are now linked in a shared pet group.' });
    } catch (error) {
        console.error('Error linking customers:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



// GET

export const getPets = async (req, res) => {
    const { id } = req.params; // Customer ID
  
    try {
      // Check if the customer exists and get their groupID
      const customer = await Customer.findByPk(id, { attributes: ['groupID'] });
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      const groupID = customer.groupID;
  
      let pets;
  
      if (groupID) {
        // If the customer has a group, fetch pets associated with customers in that group
        pets = await Pet.findAll({
          include: [{
            model: Customer,
            where: { groupID }, // Filter customers by groupID
            through: { attributes: [] } // Exclude attributes from the join table
          }]
        });
      } else {
        // If no group, fetch pets associated with this specific customer
        pets = await Pet.findAll({
          include: [{
            model: Customer,
            where: { id }, // Filter by the specific customer ID
            through: { attributes: [] }
          }]
        });
      }
  
      if (pets.length === 0) {
        console.log('nopets')
        return res.status(404).json({ message: 'No pets found for this customer' });
      }
  
      return res.status(200).json(pets);
    } catch (error) {
      console.error('Error fetching pets:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  



export const updatePet = async (req, res) => {
    const { id, name, breed, size, photoUrl, notes } = req.body;
    console.log("Received update request for pet:", { id, name, breed, size, photoUrl, notes });

    try {
        const pet = await Pet.findByPk(id); // Find pet by primary key
        console.log("Pet found:", pet);

        if (!pet) {
            console.log("Pet not found with id:", id);
            return res.status(404).json({ message: 'Pet not found' });
        }

        await pet.update({ name, breed, size, photoUrl, notes });
        console.log("Pet updated successfully:", pet);

        res.status(200).json({ message: 'Pet updated successfully', pet });
    } catch (error) {
        console.error('Error updating pet:', error);
        res.status(500).json({ error: 'Failed to update pet.' });
    }
};
