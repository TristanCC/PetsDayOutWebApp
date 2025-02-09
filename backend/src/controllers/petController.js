import CustomerPet from '../models/CustomerPet.js'
import Customer from '../models/Customer.js'
import Pet from '../models/Pet.js'

// create

export const createPet = async (req, res) => {
    const { name, breed, size, photoUrl, ownerID, notes } = req.body;

    try {
        // Step 1: Create the pet
        const newPet = await Pet.create({ name, breed, size, photoUrl, notes });

        // Step 2: If a ownerID is provided, link the pet to the customer
        if (ownerID) {
            await CustomerPet.create({ ownerID, petID: newPet.id });
        }

        res.status(201).json(newPet);
    } catch (error) {
        console.error('Error creating pet:', error);
        res.status(500).json({ error: 'Failed to create pet.' });
    }
};

export const linkCustomers = async (req, res) => {
    // take in searched for ownerID, current ownerID, array of current petIDs
    // 
    // 
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

