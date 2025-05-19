import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

let sequelize;

if (process.env.NODE_ENV === 'production') {
  // On Railway: use the single DATABASE_URL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    },
    pool: { max: 3, min: 0, acquire: 30000, idle: 10000 },
  });
} else {
  // Local development: use separate host/user/password
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: false,
      pool: { max: 3, min: 0, acquire: 30000, idle: 10000 },
    }
  );
}

export default sequelize;
