import express from 'express'
const router = express.Router()

import * as foodController from '../controllers/food'

//获取数据库
router.get('/food', foodController.getFoodList)
//获取json文件
router.get('/foodAll', foodController.getAll)

router.get('/changeOnsale', foodController.changeOnsale)
router.get('/getFoodDetail', foodController.getFoodDetail)

//增删改查
router.post('/modifyFood', foodController.modifyFood)
router.post('/createFood', foodController.createFood)
router.get('/deleteFood', foodController.deleteFood)
router.get('/getManageLogs', foodController.getManageLogs)
router.get('/searchFoods', foodController.searchFoods)

export default router