import { DataTypes } from 'sequelize';
import sequelize from '../db/pool.js';

const CustomerPet = sequelize.define('CustomerPet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  groupID: {
    type: DataTypes.UUID,
    allowNull: true, // Group ID can be null if not linked
  },
});

export default CustomerPet;
