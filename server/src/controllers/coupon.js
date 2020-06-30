
import Coupon from '../models/coupon'
import User from '../models/user'

export function getCoupons(req, res) {
  res.json({errcode: '', msg: 'success'})
}

export function getCouponMaster(req, res) {
  Coupon.getCouponMaster(function(err, ret) {
    if(err) {
      return res.json({errcode: '', msg: '查询失败'})
    }
    res.status(200).json({errcode: '', msg: '查询成功', data: ret})
  })
}

export function exchangeCoupon(req, res) {
  let user = req.signedCookies.user
  let iid = req.query.iid
  new Promise((resolve, reject) => {
    Coupon.getCouponMasterOne(iid, function(err, ret) {
      if(err) {
        return res.json({errcode: 1001, msg: '兑换失败'})
      }
      ret = ret.toObject()
      if(ret.rest > 0) {
        resolve(ret)
      }else {
        res.json({errcode: 1002, msg: '优惠券余量不足'})
      }
    })
  }).then(result => {
    return new Promise((resolve, reject) => {
      Coupon.exchangeOne(result, user.tell, function(err, ret) {
        if(err) {
          return res.json({errcode: 1001, msg: '兑换失败'})
        }
        resolve(result.score)
      })
    })
  }).then(score => {
    return new Promise((resolve, reject) => {
      User.updateOne({tell: user.tell}, {$inc: {score: -score}}, function(err) {
        if(err) {
          return res.json({errcode: 1001, msg: '兑换失败'})
        }
        resolve()
      })
    })
  }).then(() => {
    Coupon.getCouponMaster(function(err, ret){
      if(err) {
        return res.json({errcode: '', msg: '成功失败'})
      }
      res.json({errcode: '', msg: '兑换成功', data: ret})
    })
  })
} 

export function getCoupon(req, res) {
  let user = req.signedCookies.user
  Coupon.getUserCoupon(user.tell, function(err, ret) {
    if(err) {
      return res.json({errcode: 1001, msg: '查询失败'})
    }
    res.json({errcode: '', msg: '查询成功', data: ret})
  })
}
