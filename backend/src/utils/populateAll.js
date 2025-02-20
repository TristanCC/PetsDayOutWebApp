// seed.js
import sequelize from '../db/pool.js';
import { Customer, Pet, CustomerPet, Group } from '../db/associations.js';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Reset the database

    // Step 1: Create Customers
    const customers = await Customer.bulkCreate([
      { firstName: 'John', lastName: 'Smith', email: 'john@example.com', phoneNumber: '2053563548' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phoneNumber: '2054894875' },
      { firstName: 'Fella', lastName: 'Reese', email: 'Fella@example.com', phoneNumber: '2056987787' },
      { firstName: 'Crane', lastName: 'Frock', email: 'Crane@example.com', phoneNumber: '2056927787' },
    ]);

    // Step 2: Create Pets
    const pets = await Pet.bulkCreate([
      { name: 'Buddy', breed: 'Golden Retriever', size: 'Large', photoUrl: 'https://example.com/buddy.jpg' },
      { name: 'Mittens', breed: 'Siamese Cat', size: 'Small', photoUrl: 'https://example.com/mittens.jpg' },
      { name: 'Rex', breed: 'German Shepherd', size: 'Large', photoUrl: 'https://example.com/rex.jpg' },
      { name: 'Whiskers', breed: 'Persian Cat', size: 'Small', photoUrl: 'https://example.com/whiskers.jpg' },
      { name: 'Bella', breed: 'Beagle', size: 'Medium', photoUrl: 'https://example.com/bella.jpg' },
    ]);

    // Step 3: Individual Customer-Pet Links
    await CustomerPet.create({ ownerID: customers[0].id, petID: pets[0].id }); // John -> Buddy
    await CustomerPet.create({ ownerID: customers[1].id, petID: pets[1].id }); // Jane -> Mittens

    // Step 4: Shared Pet Group Setup
    const sharedGroup = await Group.create();

    await CustomerPet.create({ ownerID: customers[2].id, petID: pets[2].id, groupID: sharedGroup.id }); // Sam -> Rex (shared)
    await CustomerPet.create({ ownerID: customers[3].id, petID: pets[2].id, groupID: sharedGroup.id }); // Alex -> Rex (shared)

    // Also share Whiskers in the same group
    await CustomerPet.create({ ownerID: customers[2].id, petID: pets[3].id, groupID: sharedGroup.id });
    await CustomerPet.create({ ownerID: customers[3].id, petID: pets[3].id, groupID: sharedGroup.id });

    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
