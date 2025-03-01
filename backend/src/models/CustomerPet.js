import { DataTypes } from 'sequelize';
import sequelize from '../db/pool.js';

const CustomerPet = sequelize.define('CustomerPet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

export default CustomerPet;
