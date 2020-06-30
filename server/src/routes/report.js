import express, { request } from 'express'
import * as reportController from '../controllers/report'

const router = express.Router()

router.get('/api/shop/getReport', reportController.getReport)

export default router