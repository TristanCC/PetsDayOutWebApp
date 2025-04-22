
import sequelize from '../db/pool.js';
import { Customer, Pet, CustomerPet, Group } from '../db/associations.js';

const resetDatabase = async () => {
  try {
    // Reset the database: Drop and recreate all tables
    await sequelize.sync({ force: true });
    console.log('Database reset successfully!');
  } catch (error) {
    console.error('Error resetting the database:', error);
  }
};

const seedData = async () => {
  try {
    // Seed Groups
    const group1 = await Group.create({});
    const group2 = await Group.create({});

    // Seed Customers
    const customer1 = await Customer.create({
      firstName: 'John',
      middleName: 'Doe',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      phoneNumber: '1234567890',
      customerComment: 'Loves dogs!',
      groupID: group1.id,
    });

    const customer2 = await Customer.create({
      firstName: 'Jane',
      middleName: 'A.',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phoneNumber: '9876543210',
      customerComment: 'Cat person.',
      groupID: group1.id,
    });

    const customer3 = await Customer.create({
      firstName: 'Michael',
      middleName: 'J.',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      phoneNumber: '1122334455',
      customerComment: 'Bird lover.',
      groupID: group2.id,
    });

    // Seed Pets
    const pet1 = await Pet.create({
      name: 'Buddy',
      sex: "male",
      breed: 'Golden Retriever',
      size: 'large',
      photoUrl: 'http://placekitten.com/200/300',
    });

    const pet2 = await Pet.create({
      name: 'Fluffy',
      sex: "male",
      breed: 'Persian',
      size: 'small',
      photoUrl: 'http://placekitten.com/200/300',
    });

    const pet3 = await Pet.create({
      name: 'Chirpy',
      sex: "male",
      breed: 'Parakeet',
      size: 'small',
      photoUrl: 'http://placekitten.com/200/300',
    });

    // Create associations between Customers and Pets in CustomerPet table
    await CustomerPet.create({
      petID: pet1.id,
      ownerID: customer1.id,
    });

    await CustomerPet.create({
      petID: pet2.id,
      ownerID: customer2.id,
    });

    await CustomerPet.create({
      petID: pet3.id,
      ownerID: customer3.id,
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    sequelize.close();
  }
};

const resetAndSeed = async () => {
  await resetDatabase();  // Reset the database before seeding
  await seedData();       // Then seed the database
};

resetAndSeed();

