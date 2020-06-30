import mongoose from './db'
import { getTimeStamp } from '../public/utils'


const orderSchema = mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    default: 'N/A'
  },
  userTell: {
    type: String,
    default: 'N/A'
  },
  shopId: {
    type: String,
    required: true
  },
  isHere: Boolean,
  table: Number,
  dishware: Number,
  coupon: Number,
  originPrice: Number,
  pay: Number,
  remark: String,
  done: { //是否完成
    type: Boolean,
    default: false
  },
  doing: { //正在制作
    type: Boolean,
    default: false
  },
  createTime: Number,
  updateTime: {
    type: Number,
    default: null
  },
  expireTime: Number,
  isPay: { //是否付款
    type: Boolean,
    default: false
  },
  isComment: { //是否评论
    type: Boolean,
    default: false
  },
  isCancel: {
    type: Boolean,
    default: false
  },
  msg: {
    type: String,
    default: ''
  }
})

const orderItemSchema = mongoose.Schema({
  orderId: {
    type: Number,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  iid: String,
  name: String,
  price: Number,
  img: String,
  count: Number
})

const Order = mongoose.model('Order', orderSchema, 'order_master')
const OrderItem = mongoose.model('OrderItem', orderItemSchema, 'order_item')

Order.createOrder = function(orderInfo, callback) {
  const o = new Order({
    orderId: orderInfo.orderId,
    userName: orderInfo.userName,
    userTell: orderInfo.userTell,
    shopId: orderInfo.shopId,
    isHere: orderInfo.isHere,
    table: orderInfo.table,
    dishware: orderInfo.dishware,
    coupon: orderInfo.coupon,
    originPrice: orderInfo.originPrice,
    pay: orderInfo.pay,
    isPay: orderInfo.isPay,
    remark: orderInfo.remark,
    createTime: orderInfo.createTime,
    expireTime: orderInfo.expireTime
  })
  o.save(function(err) {
    if (err) {
      return callback(err)
    }
    callback(null)
  })
}

Order.captureOrder = function(list, callback) {
  OrderItem.insertMany(list, function(err) {
    if (err) {
      return callback(err)
    }
    callback(null)
  })
}


Order.getOrderInfo = function(orderId, callback) {
  Order.findOne({ orderId: orderId }, { _id: 0, isHere: 0, table: 0, coupon: 0, _v: 0, remark: 0 }, function(err, ret) {
    if (err) {
      return callback(err)
    }
    callback(null, ret)
  })
}

Order.getOrderList = function(tell, page, limit, callback) {
  Order.aggregate([{
    $match: {
      userTell: tell
    }
  }, {
    $sort: {
      createTime: -1
    }
  }, {
    $skip: page * limit
  }, {
    $limit: limit
  }, {
    $project: {
      _id: 0
    }
  }, {
    $lookup: {
      from: "order_item",
      localField: "orderId",
      foreignField: "orderId",
      as: "items"
    }
  }, {
    $lookup: {
      from: "shops",
      localField: "shopId",
      foreignField: "shopId",
      as: "shop"
    }
  }], function(err, docs) {
    if (err) {
      return callback(err)
    }
    // callback(null, docs)
    let ts = Math.round(new Date().getTime() / 1000)
    docs.forEach((el, index) => {
      if (ts > el.expireTime && !el.isPay && !el.isCancel) {
        Order.updateOne({ orderId: el.orderId }, { isCancel: true, msg: '订单超时未支付' }, err => {
          if (err) {
            return;
          }
        })
        docs[index].isCancel = true
        docs[index].msg = '订单超时未支付'
      }
    })
    callback(null, docs)
  })
}

Order.pay = function(orderId, callback) {
  Order.updateOne({ orderId: orderId }, { isPay: true }, function(err) {
    if (err) {
      return callback(err)
    }
    callback(null)
  })
}

//取消订单
Order.cancel = function(orderId, callback) {
  Order.updateOne({ orderId: orderId }, { isCancel: true, updateTime: getTimeStamp(), msg: '主动取消 已退款' }, function(err) {
    if (err) {
      return callback(err)
    }
    callback(null)
  })
}

//取消付款
Order.cancelPay = function(orderId, callback) {
  Order.updateOne({ orderId: orderId }, { isCancel: true, msg: '取消支付' }, function(err) {
    if (err) {
      return callback(err)
    }
    callback(null)
  })
}

//获取门店订单 -- 未完成 -- 已付款 -- 
Order.getShopOrder = function(shopId, callback) {
  Order.aggregate([{
    $match: {
      shopId: shopId,
      isPay: true,
      done: false,
      isCancel: false
    }
  }, {
    $sort: {
      createTime: 1
    }
  }, {
    $skip: 0
  }, {
    $project: {
      _id: 0
    }
  }, {
    $lookup: {
      from: "order_item",
      localField: "orderId",
      foreignField: "orderId",
      as: "items"
    }
  }], function(err, docs) {
    if (err) {
      return callback(err)
    }
    callback(null, docs)
  })
}

Order.getNewOrder = function(orderId, callback) {
  Order.aggregate([{
    $match: {
      orderId: Number(orderId)
    }
  }, {
    $project: {
      _id: 0
    }
  }, {
    $lookup: {
      from: "order_item",
      localField: "orderId",
      foreignField: "orderId",
      as: "items"
    }
  }], function(err, doc) {
    if (err) {
      return callback(err)
    }
    callback(null, doc[0])
  })
}

//改变订单状态
Order.changeOrderState = function(orderId, state, callback) {
  Order.updateOne({ orderId: orderId }, { doing: state }, function(err) {
    if (err) {
      return callback(err)
    }
    callback(null)
  })
}

//出餐状态 true
Order.foodDone = function(orderId, iid, state, callback) {
  OrderItem.updateOne({ orderId: orderId, iid: iid }, { done: state }, function(err) {
    if (err) {
      return callback(err)
    }
    callback(null)
  })
}


//完成订单
Order.completeOrder = function(orderId, timeStamp, callback) {
  Order.updateOne({ orderId: orderId }, { done: true, updateTime: timeStamp }, function(err, ret) {
    if (err) {
      return callback(err)
    }
    callback(null)
  })
}

//获取完成的订单
Order.getComplete = function(query, callback) {
  Order.aggregate([{
    $match: {
      shopId: query.shopId,
      isPay: true,
      done: true,
      updateTime: { $gt: parseInt(query.start), $lt: parseInt(query.end) }
    }
  }, {
    $sort: {
      updateTime: -1
    }
  }, {
    $skip: 0
  }, {
    $project: {
      _id: 0
    }
  }, {
    $lookup: {
      from: "order_item",
      localField: "orderId",
      foreignField: "orderId",
      as: "items"
    }
  }], function(err, docs) {
    if (err) {
      return callback(err)
    }
    callback(null, docs)
  })
}

//获取取消的订单
Order.getCancel = function(query, callback) {
  Order.aggregate([{
    $match: {
      shopId: query.shopId,
      isPay: true,
      isCancel: true,
      updateTime: { $gt: parseInt(query.start), $lt: parseInt(query.end) }
    }
  }, {
    $sort: {
      updateTime: -1
    }
  }, {
    $skip: 0
  }, {
    $project: {
      _id: 0
    }
  }, {
    $lookup: {
      from: "order_item",
      localField: "orderId",
      foreignField: "orderId",
      as: "items"
    }
  }], function(err, docs) {
    if (err) {
      return callback(err)
    }
    callback(null, docs)
  })
}

//完成评论状态
Order.completeComment = function(orderId, callback) {
  Order.updateOne({ orderId: orderId }, { isComment: true }, function(err) {
    if (err) {
      return callback(err)
    }
    callback(null)
  })
}

//门店管理获取 订单评论
Order.getCommentOrder = function(orderId, callback) {
  Order.aggregate([{
    $match: {
      orderId: Number(orderId)
    }
  }, {
    $project: {
      _id: 0
    }
  }, {
    $lookup: {
      from: "comments",
      localField: "orderId",
      foreignField: "orderId",
      as: "comment"
    }
  }, {
    $lookup: {
      from: "order_item",
      localField: "orderId",
      foreignField: "orderId",
      as: "foods"
    }
  }], function(err, docs) {
    if (err) {
      return callback(err)
    }
    callback(null, docs)
  })
}

Order.getOrderItems = function(orderId, callback) {
  OrderItem.find({ orderId: orderId }, function(err, docs) {
    if (err) {
      return callback(err)
    }
    callback(null, docs)
  })
}

export default Order