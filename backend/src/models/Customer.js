import { DataTypes } from 'sequelize';
import sequelize from '../db/pool.js';

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]{10}$/
    }
  },

  customerComment: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  numberOfPets: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
});

export default Customer;
