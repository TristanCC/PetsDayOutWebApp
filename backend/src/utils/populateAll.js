import sequelize from '../db/pool.js';
import { Customer, Pet, CustomerPet } from '../db/associations.js';

const seedDatabase = async () => {
  try {
    // Sync all models with the database
    await sequelize.sync({ force: true }); // Force true drops tables if they exist
    console.log('Database synced successfully.');

    // Create Customers
    const customers = await Customer.bulkCreate([
      {
        firstName: 'Alice',
        middleName: 'Marie',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        phoneNumber: '+1 (123) 456-7890',
        customerComment: 'Loves golden retrievers.',
        numberOfPets: 2,
      },
      {
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob.smith@example.com',
        phoneNumber: '+1 (321) 654-0987',
        customerComment: 'Prefers small dogs.',
        numberOfPets: 1,
      },
      {
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'charlie.brown@example.com',
        phoneNumber: '+1 (987) 123-4567',
        customerComment: 'Cat lover.',
        numberOfPets: 1,
      },
    ]);

    // Create Pets
    const pets = await Pet.bulkCreate([
      {
        name: 'Fido',
        breed: 'Golden Retriever',
        size: 'large',
        photoUrl: 'https://example.com/photos/fido.jpg',
        ownerID: customers[0].id, // Assign to Alice
      },
      {
        name: 'Max',
        breed: 'Beagle',
        size: 'medium',
        photoUrl: 'https://example.com/photos/max.jpg',
        ownerID: customers[0].id, // Assign to Alice
      },
      {
        name: 'Bella',
        breed: 'Poodle',
        size: 'small',
        photoUrl: 'https://example.com/photos/bella.jpg',
        ownerID: customers[1].id, // Assign to Bob
      },
      {
        name: 'Whiskers',
        breed: 'Siamese Cat',
        size: 'small',
        photoUrl: 'https://example.com/photos/whiskers.jpg',
        ownerID: customers[2].id, // Assign to Charlie
      },
    ]);

    // Create Customer-Pet Relationships in the Junction Table
    await CustomerPet.bulkCreate([
      { ownerID: customers[0].id, petID: pets[0].id }, // Alice -> Fido
      { ownerID: customers[0].id, petID: pets[1].id }, // Alice -> Max
      { ownerID: customers[1].id, petID: pets[2].id }, // Bob -> Bella
      { ownerID: customers[2].id, petID: pets[3].id }, // Charlie -> Whiskers
    ]);

    console.log('Demo data successfully seeded.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
