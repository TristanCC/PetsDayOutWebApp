import CustomerPet from '../models/CustomerPet.js'
import Pet from '../models/Pet.js'

// create

export const createPet = async (req, res) => {
    const {name, breed, size, photoUrl} = req.body

    try {
        const newPet = await Pet.create( {
            name, breed, size, photoUrl
        })
        res.status(201).json(newPet)

    } catch (error) {
        console.error('Error creating pet:', error)
        res.status(500).json({error: 'Failed to create pet.'})
    }
}


// GET

export const getPets = async (req, res) => {
    const { id } = req.params; // Change ownerID to id

    try {
        // Step 1: Find all petIDs associated with the ownerID in CustomerPet
        const customerPetArray = await CustomerPet.findAll({
            where: {
                ownerID: id // Change ownerID to id
            }
        });

        // Step 2: If no petIDs found, return 404 response
        if (customerPetArray.length < 1) {
            return res.status(404).json({ message: 'No pets found for this owner' });
        }

        // Step 3: Extract petIDs and query the Pet model for details
        const petIDs = customerPetArray.map((item) => item.petID);

        // Fetch pet details for each petID using Promise.all to handle asynchronous calls
        const petsWithDetails = await Promise.all(
            petIDs.map(async (petID) => {
                const pet = await Pet.findOne({
                    where: { id: petID } // Use 'id' for the pet column
                });
                return pet; // This will return the pet details for each pet
            })
        );

        // Step 4: Return the retrieved pet data
        return res.status(200).json(petsWithDetails);

    } catch (error) {
        // Step 5: Handle errors gracefully
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
