import express, { request } from 'express'
import * as orderController from '../controllers/order'

const router = express.Router()

// router.get('/api/coupon', orderController.getCoupon)
router.post('/api/order/forhere', orderController.orderForHere)
router.get('/api/getOrderPay', orderController.getOrderPay)
router.get('/api/getOrder', orderController.getOrder)
router.get('/api/pay', orderController.payFor)
router.get('/api/cancelOrder', orderController.cancelOrder)
router.get('/api/cancelPay', orderController.cancelPay)

//商家接口
router.get('/api/shop/getOrder', orderController.getShopOrder)
router.get('/api/shop/changeOrderState', orderController.changeOrderState)
router.get('/api/shop/foodDone', orderController.foodDone)
router.get('/api/shop/completeOrder', orderController.completeOrder)
router.get('/api/shop/getComplete', orderController.getComplete)
router.get('/api/shop/getCancel', orderController.getCancel)
router.post('/api/shop/makeOrder', orderController.staffMakeOrder)
router.get('/api/newOrder', orderController.newOrder)

export default router