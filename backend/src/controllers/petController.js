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

        const customerPet = await CustomerPet.findOne({ where: { ownerID } });

        if (customerPet?.groupID) {
            console.log("Owner belongs to a group, linking pet to all members.");

            // Find all customers in the group
            const groupCustomers = await CustomerPet.findAll({
                where: { groupID: customerPet.groupID }
            });

            // Create a record for each group member
            await Promise.all(
                groupCustomers.map(async (customer) => {
                    const existingEntry = await CustomerPet.findOne({
                        where: { petID: newPet.id, ownerID: customer.ownerID }
                    });
            
                    if (!existingEntry) {
                        await CustomerPet.create({
                            petID: newPet.id,
                            ownerID: customer.ownerID,
                            groupID: customerPet.groupID
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
    const { currentOwnerID, targetOwnerID } = req.body

    try {

        let sharedGroup = await Group.findOne({
            include: {
                model: CustomerPet,
                where: {
                    ownerID: currentOwnerID
                }
            }
        })

        if (!sharedGroup) {
            sharedGroup = await Group.create()
        }

        await CustomerPet.update({groupID: sharedGroup}, {where: currentOwnerID})
        await CustomerPet.update({groupID: sharedGroup}, {where: targetOwnerID})

        return res.status(200).json({ message: 'Customers are now linked in a shared pet group.' });

    } catch(error) {
        console.error('Error linking customers:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// GET

export const getPets = async (req, res) => {
    const { id } = req.params; // Customer ID

    try {
        const pets = await Pet.findAll({
            include: [{
                model: Customer,
                where: { id }, // Fetch pets linked to this customer
                through: { attributes: [] } // Exclude CustomerPet join table attributes
            }]
        });

        if (pets.length === 0) {
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
