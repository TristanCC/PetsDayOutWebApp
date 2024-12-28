import Customer from '../models/Customer.js';

// Find the user by ID (or another identifier like email)
const user = await Customer.create({ firstName: "Ty", middleName:"Fuck", lastName: "Jernigan", phoneNumber: "205-845-5000"})

// delete user
//const user2 = await Customer.destroy({
//    where: {
//        firstName: "Tristan"
//    }
//})
