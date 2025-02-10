import express from 'express';
import * as customerController from '../controllers/customerController.js'
import * as petController from '../controllers/petController.js'

const router = express.Router()

/*
    CUSTOMERS
*/ 

router.post('/db/createCustomer', customerController.createCustomer)

router.get('/db/getCustomers', customerController.getCustomers)
router.get('/db/findCustomer', customerController.findCustomer)

router.put('/db/updateCustomer/:id', customerController.updateCustomer)
// router.delete('/db/deleteCustomer/:id', mainController.deleteCustomer) 

/*
    PETS
*/ 

router.post('/db/createPet', petController.createPet)
router.get('/db/getPets/:id', petController.getPets)
router.put('/db/updatePet', petController.updatePet)



export default router