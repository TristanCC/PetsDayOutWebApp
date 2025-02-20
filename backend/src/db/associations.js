import Pet from '../models/Pet.js';
import Customer from '../models/Customer.js';
import CustomerPet from '../models/CustomerPet.js';
import Group from '../models/Group.js'; // Import the shared group model

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

// Association to link CustomerPet to SharedPetGroup
CustomerPet.belongsTo(Group, { foreignKey: 'groupID' });
Group.hasMany(CustomerPet, { foreignKey: 'groupID' });

export { Customer, Pet, CustomerPet, Group };
