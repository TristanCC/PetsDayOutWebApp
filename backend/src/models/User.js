import { DataTypes } from 'sequelize';
import sequelize from '../db/pool.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    set(value) {
      // Only hash the password if it's being set directly (not via Google OAuth)
      if (value) {
        const salt = bcrypt.genSaltSync(10);
        this.setDataValue('password', bcrypt.hashSync(value, salt));
      }
    }
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  }
});

// Define `validPassword` as a prototype method
User.prototype.validPassword = function (password) {
  return this.password ? bcrypt.compareSync(password, this.password) : false;
};

export default User;
