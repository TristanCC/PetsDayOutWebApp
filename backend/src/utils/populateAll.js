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
      {
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@example.com',
        phoneNumber: '+1 (555) 123-4567',
        customerComment: 'Has a large family of pets.',
        numberOfPets: 3,
      },
      {
        firstName: 'Eve',
        lastName: 'Davis',
        email: 'eve.davis@example.com',
        phoneNumber: '+1 (555) 765-4321',
        customerComment: 'Enjoys training dogs.',
        numberOfPets: 2,
      },
      {
        firstName: 'Frank',
        lastName: 'Miller',
        email: 'frank.miller@example.com',
        phoneNumber: '+1 (555) 234-5678',
        customerComment: 'Loves exotic pets.',
        numberOfPets: 1,
      },
      {
        firstName: 'Grace',
        lastName: 'Garcia',
        email: 'grace.garcia@example.com',
        phoneNumber: '+1 (555) 876-5432',
        customerComment: 'Has a pet bird.',
        numberOfPets: 1,
      },
      {
        firstName: 'Hank',
        lastName: 'Martinez',
        email: 'hank.martinez@example.com',
        phoneNumber: '+1 (555) 345-6789',
        customerComment: 'Owns a pet shop.',
        numberOfPets: 5,
      },
      {
        firstName: 'Ivy',
        lastName: 'Rodriguez',
        email: 'ivy.rodriguez@example.com',
        phoneNumber: '+1 (555) 987-6543',
        customerComment: 'Loves reptiles.',
        numberOfPets: 2,
      },
      {
        firstName: 'Jack',
        lastName: 'Martinez',
        email: 'jack.martinez@example.com',
        phoneNumber: '+1 (555) 456-7890',
        customerComment: 'Has a pet rabbit.',
        numberOfPets: 1,
      },
      {
        firstName: 'Karen',
        lastName: 'Hernandez',
        email: 'karen.hernandez@example.com',
        phoneNumber: '+1 (555) 654-3210',
        customerComment: 'Enjoys pet grooming.',
        numberOfPets: 2,
      },
      {
        firstName: 'Leo',
        lastName: 'Lopez',
        email: 'leo.lopez@example.com',
        phoneNumber: '+1 (555) 567-8901',
        customerComment: 'Has a pet turtle.',
        numberOfPets: 1,
      },
      {
        firstName: 'Mia',
        lastName: 'Gonzalez',
        email: 'mia.gonzalez@example.com',
        phoneNumber: '+1 (555) 789-0123',
        customerComment: 'Loves pet photography.',
        numberOfPets: 2,
      },
      {
        firstName: 'Nina',
        lastName: 'Perez',
        email: 'nina.perez@example.com',
        phoneNumber: '+1 (555) 890-1234',
        customerComment: 'Has a pet hamster.',
        numberOfPets: 1,
      },
      {
        firstName: 'Oscar',
        lastName: 'Sanchez',
        email: 'oscar.sanchez@example.com',
        phoneNumber: '+1 (555) 901-2345',
        customerComment: 'Enjoys pet training.',
        numberOfPets: 2,
      },
      {
        firstName: 'Paul',
        lastName: 'Clark',
        email: 'paul.clark@example.com',
        phoneNumber: '+1 (555) 012-3456',
        customerComment: 'Has a pet snake.',
        numberOfPets: 1,
      },
      {
        firstName: 'Quinn',
        lastName: 'Lewis',
        email: 'quinn.lewis@example.com',
        phoneNumber: '+1 (555) 123-4567',
        customerComment: 'Loves pet shows.',
        numberOfPets: 2,
      },
      {
        firstName: 'Rachel',
        lastName: 'Walker',
        email: 'rachel.walker@example.com',
        phoneNumber: '+1 (555) 234-5678',
        customerComment: 'Has a pet parrot.',
        numberOfPets: 1,
      },
      {
        firstName: 'Steve',
        lastName: 'Hall',
        email: 'steve.hall@example.com',
        phoneNumber: '+1 (555) 345-6789',
        customerComment: 'Enjoys pet competitions.',
        numberOfPets: 3,
      },
      {
        firstName: 'Tina',
        lastName: 'Allen',
        email: 'tina.allen@example.com',
        phoneNumber: '+1 (555) 456-7890',
        customerComment: 'Has a pet fish.',
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
      // ...additional pets for other customers...
    ]);

    // Create Customer-Pet Relationships in the Junction Table
    await CustomerPet.bulkCreate([
      { ownerID: customers[0].id, petID: pets[0].id }, // Alice -> Fido
      { ownerID: customers[0].id, petID: pets[1].id }, // Alice -> Max
      { ownerID: customers[1].id, petID: pets[2].id }, // Bob -> Bella
      { ownerID: customers[2].id, petID: pets[3].id }, // Charlie -> Whiskers
      // ...additional relationships...
    ]);

    console.log('Demo data successfully seeded.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
