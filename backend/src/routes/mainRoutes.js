import express from 'express';
import * as mainController from '../controllers/mainController.js'

const router = express.Router()

// TODOTODOTODOTODOTODO
router.put('/db/createCustomers')
// TODOTODOTODOTODOTODO

router.get('/db/getCustomers', mainController.getCustomers)
router.put('/db/updateCustomer/:id', mainController.updateCustomer)
router.delete('/db/deleteCustomer/:id', mainController.deleteCustomer)

export default router