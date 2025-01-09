// defining the associations between the models
import Pet from '../models/Pet.js';
import Customer from '../models/Customer.js';

Customer.hasMany(Pet, {
    foreignKey: 'ownerID',
    onDelete: 'CASCADE'
})

Pet.belongsTo(Customer, {
    foreignKey: 'ownerID'
})

export { Customer, Pet };