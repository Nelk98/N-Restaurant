import express from 'express'
const router = express.Router()

import * as loginController from '../controllers/login'

//获取数据库的商品
router.get('/api/identify', loginController.requestCode)
router.get('/api/login', loginController.login)
router.get('/api/register', loginController.register)
router.get('/api/isLogin', loginController.isLogin)
router.get('/api/userInfo', loginController.getUserInfo)
router.get('/api/logout', loginController.logout)
router.get('/api/getUserScore', loginController.getUserScore)

export default router