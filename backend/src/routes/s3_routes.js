import express from 'express';
import * as petController from '../controllers/petController.js'

const router = express.Router()

router.get('/s3-url', petController.getSignedUploadURL)

export default router