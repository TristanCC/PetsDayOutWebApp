import Pet from '../models/Pet.js';
import Customer from '../models/Customer.js';
import CustomerPet from '../models/CustomerPet.js';

// Many-to-Many Relationship
Customer.belongsToMany(Pet, {
  through: CustomerPet,
  foreignKey: 'ownerID',
  otherKey: 'petID',
  onDelete: 'CASCADE',
});

Pet.belongsToMany(Customer, {
  through: CustomerPet,
  foreignKey: 'petID',
  otherKey: 'ownerID',
  onDelete: 'CASCADE',
});

// Ensure models are exported properly
export { Customer, Pet, CustomerPet };
