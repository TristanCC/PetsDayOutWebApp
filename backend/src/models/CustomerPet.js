import { DataTypes } from 'sequelize';
import sequelize from '../db/pool.js';

const CustomerPet = sequelize.define('CustomerPet', {
  ownerID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Customers', // Table name of the customers
      key: 'id', // Primary key of the Customers table
    },
  },
  petID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Pets', // Table name of the pets
      key: 'id', // Primary key of the Pets table
    },
  },
}, {
  timestamps: false, // Disable createdAt/updatedAt for this join table
  indexes: [
    {
      unique: true,
      fields: ['ownerID', 'petID'], // Prevent duplicate rows for the same owner-pet relationship
    },
  ],
});

export default CustomerPet;
