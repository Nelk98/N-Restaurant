import express from 'express'
import * as shopController from '../controllers/shop'

const router = express.Router()

router.get('/api/shop', shopController.getShopList)
router.get('/api/getShopInfo', shopController.getShopInfo)
export default router