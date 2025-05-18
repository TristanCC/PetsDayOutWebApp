// scripts/seed-user.js
import dotenv from 'dotenv';
dotenv.config();
import sequelize from '../db/pool.js';
import User from '../models/User.js';

async function seed() {
  await sequelize.authenticate();
  console.log('✅ Connected to DB');

  const email = 'tristan.c.johnston@gmail.com';
  const exists = await User.findOne({ where: { email } });
  if (exists) {
    console.log('⚠️  User already exists:', email);
    return process.exit(0);
  }

  // Plain-text password goes in here; your model hashes it automatically
  const user = await User.create({
    firstName: 'Tristan',
    lastName: 'Johnston',
    email,
    password: 'yourDesiredPassword123',
  });

  console.log('🎉 Created user:', user.toJSON());
  process.exit(0);
}

async function updatePass() {
  await sequelize.authenticate();
  console.log('✅ Connected to DB');

  // Plain-text password goes in here; your model hashes it automatically
  const user = await User.findOne({where: {firstName: "Tristan"}})
  await user.update({
    password: 'bonk',
  });

  console.log('🎉 updated user:', user.toJSON());
  process.exit(0);
}

//seed().catch(err => {
//  console.error('❌ Seed failed:', err);
//  process.exit(1);
//});

updatePass().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
