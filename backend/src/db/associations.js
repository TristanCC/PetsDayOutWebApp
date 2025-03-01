import Pet from '../models/Pet.js';
import Customer from '../models/Customer.js';
import CustomerPet from '../models/CustomerPet.js';
import Group from '../models/Group.js';

// Many-to-Many Relationship between Customer and Pet (via CustomerPet)
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

// Association between Customer and Group
Customer.belongsTo(Group, { foreignKey: 'groupID' }); // Customer belongs to a Group
Group.hasMany(Customer, { foreignKey: 'groupID' });   // Group has many Customers

// Association between CustomerPet and Pet
CustomerPet.belongsTo(Pet, { foreignKey: 'petID' }); // CustomerPet belongs to Pet
Pet.hasMany(CustomerPet, { foreignKey: 'petID' });   // Pet has many CustomerPets

export { Customer, Pet, CustomerPet, Group };
