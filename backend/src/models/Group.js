import { DataTypes } from 'sequelize';
import sequelize from '../db/pool.js';

const Group = sequelize.define('Group', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    }
});

export default Group;
