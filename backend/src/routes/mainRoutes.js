import express from 'express';
import * as customerController from '../controllers/customerController.js'
import * as petController from '../controllers/petController.js'

const router = express.Router()

/*
    CUSTOMERS
*/ 

// TODOTODOTODOTODOTODO
router.put('/db/createCustomers')
// TODOTODOTODOTODOTODO

router.get('/db/getCustomers', customerController.getCustomers)
router.get('/db/findCustomer', customerController.findCustomer)

router.put('/db/updateCustomer/:id', customerController.updateCustomer)
// router.delete('/db/deleteCustomer/:id', mainController.deleteCustomer) 

/*
    PETS
*/ 

router.get('/db/getPets/:id', petController.getPets)



export default router