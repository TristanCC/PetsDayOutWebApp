import { DataTypes } from 'sequelize';
import sequelize from '../db/pool.js';
import Customer from './Customer.js'; // Import the Customer model
import Pet from './Pet.js'; // Import the Pet model

const Present = sequelize.define('Present', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  petID: { 
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Pet,
      key: 'id'
    }
  },
  customerID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Customer,
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['present', 'archived']]
    }
  }
});

// Define the associations
Present.belongsTo(Customer, { foreignKey: 'customerID' });
Present.belongsTo(Pet, { foreignKey: 'petID' });

export default Present;
