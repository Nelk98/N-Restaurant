import express from 'express'
const router = express.Router()

import * as commentController from '../controllers/comment'

//获取数据库的商品
router.post('/api/comment', commentController.comment)
router.get('/api/getComment', commentController.getComment)
router.get('/api/getCommentOrder', commentController.getCommentOrder)
router.post('/api/reply', commentController.reply)


export default router