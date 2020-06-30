
import fs from 'fs'
import uuid from 'node-uuid'
import Comment from '../models/comment'
import Order from '../models/order'

export function comment(req, res) {
  let commentInfo = req.body
  let user = req.signedCookies.user
  if(req.body.files.length > 0) {
    let base64List = commentInfo.files
    let resSrc = []
    for(let i in base64List) {
      let content = base64List[i].content.replace(/^data:image\/\w+;base64,/, "")
      let dataBuffer = Buffer.from(content, 'base64')
      const creatuuid= uuid.v1()
      let fileSrc = "public/images/comment/"+creatuuid+".png"
      fs.writeFile(fileSrc, dataBuffer, function(err) {
        if(err){
          resSrc.push('/public/images/static/errcomment.png')
        }else{
          resSrc.push('/'+fileSrc)
        }
        if(resSrc.length == base64List.length) {
          commentInfo.imgs = resSrc
          Comment.commitComment(commentInfo, user, function(err, ret) {
            if(err) {
              return res.send({code: -1, msg: '评论失败'})
            }
            Order.completeComment(commentInfo.orderId, function(err) {
              if(err) {
              return res.send({code: -1, msg: '评论失败'})
              }
              res.send({code: 1, msg: '评论成功'})
            })
          })
        }
      })
    }
  }else {
    Comment.commitComment(commentInfo, user, function(err, ret) {
      if(err) {
        return res.send({code: -1, msg: '评论失败'})
      }
      Order.completeComment(commentInfo.orderId, function(err) {
        if(err) {
        return res.send({code: -1, msg: '评论失败'})
        }
        res.send({code: 1, msg: '评论成功'})
      })
    })
  }
}

export function getComment(req, res) {
  Comment.getComment(req.query.shopId, function(err, ret) {
    if(err) {
      return res.send({code: -1, msg: '评价查询失败'})
    }
    res.send({code: 1, msg: '评价查询成功', data: ret})
  })
}

export function getCommentOrder(req, res) {
  Order.getCommentOrder(req.query.orderId, function(err, ret) {
    if(err) {
      return res.json({errcode: 1001, msg: '查询失败'})
    }
    let data = ret[0]
    data.comment = data.comment[0]
    res.json({errcode: '', msg: '查询成功', data: data})
  })
}

export function reply(req, res) {
  Comment.reply(req.body.orderId, req.body.reply, function(err) {
    if(err) {
      return res.json({errcode: 1001, msg: '回复失败'})
    }
    res.json({errcode: '', msg: '回复成功'})
  })
}