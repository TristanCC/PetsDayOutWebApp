import express from 'express';
import * as mainController from '../controllers/mainController.js'

const router = express.Router()

router.get('/db/getCustomers', mainController.getCustomers)

export default router