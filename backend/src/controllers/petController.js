import CustomerPet from '../models/CustomerPet.js'
import Customer from '../models/Customer.js'
import Pet from '../models/Pet.js'
import Group from "../models/Group.js"
import { copyMoveAndDeleteTempImage, generateUploadUrl } from '../s3/s3Client.js';

// create

export const createPet = async (req, res) => {
    const { name, sex, breed, size, photoUrl, ownerID, notes, tempImageId } = req.body;

    try {
        // Step 1: Create the new pet
        const newPet = await Pet.create({ name, sex, breed, size, photoUrl, notes, tempImageId });

        if (tempImageId) {
          await copyMoveAndDeleteTempImage(ownerID, newPet.id, tempImageId)
          const newPhotoUrl = `https://pets-day-out-photos.s3.us-east-2.amazonaws.com/${newPet.id}/profile.jpg`
          await newPet.update({ photoUrl: newPhotoUrl})
        }

        // Step 2: Check if the owner is part of a shared group
        console.log("CHECKING IF PART OF GROUP");

        const customer = await Customer.findByPk(ownerID);

        if (customer?.groupID) {
            console.log("Owner belongs to a group, linking pet to all members.");

            // Find all customers in the same group
            const groupCustomers = await Customer.findAll({
                where: { groupID: customer.groupID } // Use customer.groupID here
            });

            // Create a record for each group member
            await Promise.all(
                groupCustomers.map(async (groupCustomer) => {
                    const existingEntry = await CustomerPet.findOne({
                        where: { petID: newPet.id, ownerID: groupCustomer.id }
                    });

                    if (!existingEntry) {
                        await CustomerPet.create({
                            petID: newPet.id,
                            ownerID: groupCustomer.id,
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
    const { id, name, sex, breed, size, photoUrl, notes, tempImageId } = req.body;
    console.log("Received update request for pet:", { id, name, sex, breed, size, photoUrl, notes, tempImageId });

    try {
        const pet = await Pet.findByPk(id); // Find pet by primary key
        console.log("Pet found:", pet);

        if (!pet) {
            console.log("Pet not found with id:", id);
            return res.status(404).json({ message: 'Pet not found' });
        }
      

        await pet.update({ name, sex, breed, size, photoUrl, notes });
        console.log("Pet updated successfully:", pet);

        res.status(200).json({ message: 'Pet updated successfully', pet });
    } catch (error) {
        console.error('Error updating pet:', error);
        res.status(500).json({ error: 'Failed to update pet.' });
    }
};

export const deletePet = async (req, res) => {
  const {petID} = req.params
  
  try {
    const pet = await Pet.findByPk(petID)

    if(!pet) {
      res.status(404).json({message: "pet not found"})
    }

    pet.destroy()
    res.status(200).json({ message: "pet deleted successfully"})

  } catch (error) {
    console.error("error deleting pet", error)
    res.status(500).json({error: "failed to delete pet"})
  }
} 

// PET IMAGES AND S3

export async function getSignedUploadURL(req, res) {
  try {
    const { filename, contentType } = req.query;
    if (!filename || !contentType) {
      return res.status(400).json({ error: 'filename and contentType are required' });
    }
    // Generate a presigned PUT URL
    const url = await generateUploadUrl(filename, contentType);
    res.json({ url });
  } catch (err) {
    console.error('Error generating S3 URL:', err);
    res.status(500).json({ error: 'Could not generate signed URL' });
  }
}
