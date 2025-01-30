import Pet from '../models/Pet.js';
import Customer from '../models/Customer.js';
import CustomerPet from '../models/CustomerPet.js';

// Many-to-Many Relationship with Cascade
Customer.belongsToMany(Pet, {
  through: CustomerPet,
  foreignKey: 'ownerID',
  otherKey: 'petID',
  onDelete: 'CASCADE', // Cascade when a customer is deleted
});

Pet.belongsToMany(Customer, {
  through: CustomerPet,
  foreignKey: 'petID',
  otherKey: 'ownerID',
  onDelete: 'CASCADE', // Cascade when a pet is deleted
});

export { Customer, Pet, CustomerPet };
