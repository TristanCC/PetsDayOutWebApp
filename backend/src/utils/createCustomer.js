import Customer from '../models/Customer.js';

// Find the user by ID (or another identifier like email)
const user = await Customer.create({ firstName: "Tristan", lastName: "Johnston", phoneNumber: "205-659-9002"})
