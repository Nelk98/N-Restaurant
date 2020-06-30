import express from 'express'
const router = express.Router()

import * as couponController from '../controllers/coupon'

router.get('/getCoupons', couponController.getCoupons)
router.get('/getCouponMaster', couponController.getCouponMaster)
router.get('/exchangeCoupon', couponController.exchangeCoupon)
router.get('/getCoupon', couponController.getCoupon)


export default router