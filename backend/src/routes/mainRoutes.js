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
router.get('/db/getCustomer/:id', customerController.getCustomer)
router.get('/db/getHousehold/:groupID', customerController.getHousehold)
router.get("/db/verifyPhone/:phoneNumber", customerController.verifyPhone)

router.put('/db/updateCustomer/:id', customerController.updateCustomer)
// router.delete('/db/deleteCustomer/:id', mainController.deleteCustomer) 

/*
    PETS
*/ 

router.post('/db/createPet', petController.createPet)
router.get('/db/getPets/:id', petController.getPets)
router.put('/db/updatePet', petController.updatePet)
router.delete('/db/deletePet/:petID', petController.deletePet)

router.put('/db/linkCustomers', petController.linkCustomers)


/*
    PRESENT
*/ 

router.post('/db/markPresent', customerController.markPresent)
router.get('/db/getPresent', customerController.getPresent)
router.post('/db/togglePetComplete', customerController.togglePetComplete)
router.patch('/db/archivePresentCustomers', customerController.archivePresentCustomers)

export default router