import User from '../models/user'
import Food from '../models/food'
import Order from '../models/order'
import Report from '../models/report'
import Coupon from '../models/coupon'

import { createOrderId, getTimeStamp } from '../public/utils'

import { io } from '../app'
import _ from 'underscore'


// export function getCoupon(req, res) {
//   let user = req.signedCookies.user
//   User.getUserInfo(user.tell, function(err, ret) {
//     if (err) {

//       res.send({ code: -1, msg: '请求失败' })
//     } else {
//       res.send({ code: 1, msg: '请求成功', data: ret.coupon })
//     }
//   })
// }

//用户下单
export function orderForHere(req, res) {
  let options = req.body.options
  let user = req.signedCookies.user
  let orderId = createOrderId()
  new Promise((resolve, reject) => {
    Food.getFoodById(options.shopId, options.list.idList, function(err, ret) {
      if (err) {
        return reject()
      }
      let list = []
      for (let i in ret) {
        list.push({
          orderId: orderId,
          iid: ret[i].iid,
          name: ret[i].name,
          price: ret[i].price,
          img: ret[i].img,
          count: options.list[ret[i].iid]
        })
        if (i == ret.length - 1) {
          resolve(list)
        }
      }
    })
  }).then(list => {
    let orderInfo = {
      orderId: orderId,
      userName: user.nickName,
      userTell: user.tell,
      shopId: options.shopId,
      isHere: options.isHere,
      table: options.table,
      dishware: options.dishware,
      coupon: options.coupon,
      originPrice: 9999,
      pay: 9999,
      isPay: false,
      remark: options.remark,
      createTime: getTimeStamp(),
      expireTime: getTimeStamp() + 900
    }
    let op = 0
    list.forEach(el => {
      op += el.price * el.count
    })
    orderInfo.originPrice = op
    orderInfo.pay = Math.round((op * 0.95 - orderInfo.coupon) * 100) / 100
    return new Promise((resolve, reject) => {
      Order.captureOrder(list, function(err) {
        if (err) {
          return reject(err)
        }
        resolve(orderInfo)
      })
    })

  }).then(orderInfo => {
    return new Promise((resolve, reject) => {
      Order.createOrder(orderInfo, function(err) {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }).then(() => {
    options.couponIID && Coupon.updateOne({ iid: options.couponIID }, { useAble: false }, function(err) {})
    res.json({ errcode: '', msg: '下单成功', orderId: orderId })
  }).catch(err => {
    res.json({ errcode: 1001, msg: '系统出错', error: err })
  })
}


//获取订单支付信息
export function getOrderPay(req, res) {
  Order.getOrderInfo(req.query.orderId, function(err, ret) {
    if (err) {
      return res.send({ code: -1, msg: '系统出错' })
    }
    res.send({ code: 1, msg: '请求成功', data: ret })
  })
}

//获取用户订单
export function getOrder(req, res) {
  let page = Number(req.query.page)
  let limit = Number(req.query.limit)

  Order.getOrderList(req.signedCookies.user.tell, page, limit, function(err, ret) {
    if (err) {
      return res.send({ code: -1, msg: "请求失败", err: err })
    }
    res.send({ code: 1, msg: "请求订单成功", data: ret })
  })
}

export function payFor(req, res) {
  Order.pay(req.query.orderId, function(err) {
    if (err) {
      res.send({ code: -1, msg: '付款失败' })
    }
    res.send({ code: 1, msg: '付款成功' })
    Order.getNewOrder(req.query.orderId, function(err, doc) {
      sendToClient(doc.shopId, doc)
    })
  })
}

export function cancelOrder(req, res) {
  Order.findOne({ orderId: req.query.orderId }, function(err, ret) {
    if (err) {
      return res.send({ code: -1, msg: '取消失败' })
    }
    if (ret.doing) {
      return res.send({ code: 2, msg: '已经开始制作，请联系服务员取消' })
    }
    Order.cancel(req.query.orderId, function(err) {
      if (err) {
        res.send({ code: -1, msg: '取消失败' })
      }
      res.send({ code: 1, msg: '主动取消 已退款' })
    })
  })
}

export function cancelPay(req, res) {
  Order.cancelPay(req.query.orderId, function(err) {
    if (err) {
      res.send({ code: -1, msg: '取消支付失败' })
    }
    res.send({ code: 1, msg: '取消支付' })
  })
}

// 以下是商家接口

export function getShopOrder(req, res) { //获取进行中的订单 （已付款 && 未完成）
  Order.getShopOrder(req.query.shopId, function(err, ret) {
    if (err) {
      return res.send({ code: -1, msg: '获取订单失败', error: err })
    }
    res.send({ code: 1, msg: '获取订单成功', data: ret })
  })
}

export function changeOrderState(req, res) { //转换订单状态 （doing）
  new Promise((resolve, reject) => {
    Order.findOne({ orderId: req.query.orderId }, { isCancel: 1 }, function(err, doc) {
      doc = doc.toObject()
      if (doc.isCancel) {
        return res.json({ code: 2, msg: '已取消' })
      }
      resolve()
    })
  }).then(() => {
    Order.changeOrderState(req.query.orderId, req.query.state, function(err) {
      if (err) {
        res.send({ code: -1, msg: '更改失败，请重试', error: err })
      }
      res.send({ code: 1, msg: '更改成功' })
    })
  })
}

export function foodDone(req, res) { //某一订单的某一实物 出餐完成 （done）
  Order.foodDone(req.query.orderId, req.query.iid, req.query.state, function(err) {
    if (err) {
      return res.send({ code: -1, msg: '更新失败，请重试', error: err })
    }
    res.send({ code: 1, msg: '更改成功' })
  })
}

//获取当天 0 点 时间戳
function getDayTime() {
  let date = new Date()
  let times = date.getTime()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  let dayTime = times - hour * 3600 * 1000 - minute * 60 * 1000 - second * 1000
  return Math.floor(dayTime / 1000)
}
//获取时间段
function getHour() {
  let date = new Date()
  return date.getHours()
}

export function completeOrder(req, res) { //完成订单 （done）
  let timeStamp = Math.round(new Date().getTime() / 1000)
  new Promise((resolve, reject) => {
    Order.completeOrder(req.query.orderId, timeStamp, function(err) {
      if (err) {
        return res.send({ code: -1, msg: '完成失败', error: err })
      }
      let reportInfo = {
        today: getDayTime(),
        hour: getHour(),
        shopId: req.query.shopId,
        income: Number(req.query.pay)
      }
      Report.upsertReport(reportInfo, function(err) {
        if (err) {
          return res.send({ code: 1, msg: '完成成功,加入报表失败', error: err })
        }
        resolve()
        res.send({ code: 1, msg: '完成成功' })
      })
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      Order.findOne({ orderId: req.query.orderId }, { userTell: 1 }, function(err, doc) {
        if (!err) {
          resolve(doc.userTell)
        }
      })
    })
  }).then(tell => {
    return new Promise((resolve, reject) => {
      let score = Math.round(req.query.pay)
      User.updateOne({ tell: tell }, { $inc: { score: score } }, function(err) {
        resolve()
      })
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      Order.getOrderItems(req.query.orderId, function(err, ret) {
        resolve(ret)
      })
    })
  }).then(items => {
    let idList = []
    let countList = []
      // let shopId = items[0].shopId
    for (let i in items) {
      idList.push(String(items[i].iid))
      countList.push(Number(items[i].count))
    }
    for (let i in idList) {
      Food.updateOne({ shopId: 'test', iid: idList[i] }, { $inc: { sold: countList[i] } }, function(err) {})
    }
  })
}


export function getComplete(req, res) {
  Order.getComplete(req.query, function(err, ret) {
    if (err) {
      return rres.send({ code: -1, msg: '查询完成订单失败', error: err })
    }
    res.send({ code: 1, msg: '查询完成订单成功', data: ret })
  })
}

export function getCancel(req, res) {
  Order.getCancel(req.query, function(err, ret) {
    if (err) {
      return rres.send({ code: -1, msg: '查询取消订单失败', error: err })
    }
    res.send({ code: 1, msg: '查询取消订单成功', data: ret })
  })
}

export function staffMakeOrder(req, res) {
  let data = req.body
  let orderId = createOrderId()
  let orderInfo = {
    orderId: orderId,
    shopId: data.shopId,
    isHere: data.isHere,
    table: data.table,
    dishware: data.dishware,
    coupon: 0,
    originPrice: data.pay,
    pay: data.pay,
    isPay: true,
    remark: '',
    createTime: Math.round(new Date().getTime() / 1000),
    expireTime: Math.round(new Date().getTime() / 1000) + 900
  }

  let list = data.list
  let docs = []
  for (let i in list) {
    docs.push({
      orderId: orderId,
      iid: list[i].iid,
      name: list[i].name,
      price: list[i].price,
      img: list[i].img,
      count: list[i].count
    })
  }
  Order.captureOrder(docs, function(err) {
    if (err) {
      return res.send({ code: -1, msg: '快照创建失败' })
    }
    Order.createOrder(orderInfo, function(err) {
      if (err) {
        return res.send({ code: -1, msg: '订单创建失败' })
      }
      res.send({ code: 1, msg: '下单成功', orderId: orderId })

      //通知管理端
      Order.getNewOrder(orderId, function(err, doc) {
        if (err) {
          return false
        }
        sendToClient(data.shopId, doc)
      })
    })
  })
}

export function newOrder(req, res) {
  Order.getNewOrder(req.query.orderId, (err, doc) => {
    if (err) {
      res.json({ err: err })
    }
    res.json({ msg: 'ok', data: doc })
  })
}

function sendToClient(shopId, orderInfo) {
  const socket = _.findWhere(io.sockets.sockets, { shopId })
  socket && socket.emit('makeOrder', {
    shopId,
    orderInfo
  })
}