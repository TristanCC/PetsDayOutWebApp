import Customer from '../models/Customer.js';

// Find the user by ID (or another identifier like email)
await Customer.create({ firstName: "Tristan", lastName: "Johnston", phoneNumber: "205-845-5000" });
//await Customer.create({ firstName: "Ty", middleName: "Scotty", lastName: "Jernigan", phoneNumber: "205-845-5000" });
await Customer.create({ firstName: "Kaylean", middleName: "Michelle", lastName: "Lindell", phoneNumber: "205-842-5000" });

await Customer.create({ firstName: "John", lastName: "Doe", phoneNumber: "205-845-5001" });
await Customer.create({ firstName: "Jane", lastName: "Smith", phoneNumber: "205-845-5002" });
await Customer.create({ firstName: "Alice", lastName: "Johnson", phoneNumber: "205-845-5003" });
await Customer.create({ firstName: "Bob", lastName: "Brown", phoneNumber: "205-845-5004" });
await Customer.create({ firstName: "Charlie", lastName: "Davis", phoneNumber: "205-845-5005" });
await Customer.create({ firstName: "Diana", lastName: "Miller", phoneNumber: "205-845-5006" });
await Customer.create({ firstName: "Eve", lastName: "Wilson", phoneNumber: "205-845-5007" });
await Customer.create({ firstName: "Frank", lastName: "Moore", phoneNumber: "205-845-5008" });
await Customer.create({ firstName: "Grace", lastName: "Taylor", phoneNumber: "205-845-5009" });
await Customer.create({ firstName: "Hank", lastName: "Anderson", phoneNumber: "205-845-5010" });
await Customer.create({ firstName: "Ivy", lastName: "Thomas", phoneNumber: "205-845-5011" });
await Customer.create({ firstName: "Jack", lastName: "Jackson", phoneNumber: "205-845-5012" });
await Customer.create({ firstName: "Karen", lastName: "White", phoneNumber: "205-845-5013" });
await Customer.create({ firstName: "Leo", lastName: "Harris", phoneNumber: "205-845-5014" });
await Customer.create({ firstName: "Mia", lastName: "Martin", phoneNumber: "205-845-5015" });
await Customer.create({ firstName: "Nina", lastName: "Garcia", phoneNumber: "205-845-5016" });
await Customer.create({ firstName: "Oscar", lastName: "Martinez", phoneNumber: "205-845-5017" });

// delete user
//const user2 = await Customer.destroy({
//    where: {
//        firstName: "Tristan"
//    }
//})
