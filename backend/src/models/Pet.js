import { DataTypes } from 'sequelize';
import sequelize from '../db/pool.js';


const Pet = sequelize.define('Pet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: [['small', 'medium', 'large']]
    }
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    }
  }
});


export default Pet