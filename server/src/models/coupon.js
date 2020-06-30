import mongoose from './db'
import uuid from 'node-uuid'
import {getTimeStamp} from '../public/utils'
import User from '../models/user'
const couponSchema = mongoose.Schema({
  iid: {
    type: String,
    unique: true
  },
  attain: Number,
  value: Number,
  owner: String,
  created: Number,
  useAble: {
    type: Boolean,
    default: true
  },
  expireTime: Number,
})

const couponMasterSchema = mongoose.Schema({
  attain: Number,
  value: Number,
  score: Number,
  limit: Number,
  rest: Number,
  iid: String
})

const CouponMaster = mongoose.model('CouponMaster', couponMasterSchema, 'coupon_master')
const Coupon = mongoose.model('Coupon', couponSchema, 'coupons')

Coupon.getCouponMaster = function(callback) {
  CouponMaster.find({},{_id: 0, __v:0}, function(err, docs) {
    if(err) {
      return callback(err)
    }
    callback(null, docs)
  })
}

Coupon.getCouponMasterOne = function(iid, callback) {
  CouponMaster.findOne({iid: iid}, {_id: 0, __v: 0}, function(err, doc) {
    if(err) {
      return callback(err)
    }
    callback(null, doc)
  })
}


Coupon.exchangeOne = function (cm, tell, callback) {
  let coupon = new Coupon({
    iid: uuid.v4(),
    attain: cm.attain,
    value: cm.value,
    owner: tell,
    created: getTimeStamp(),
    expireTime: getTimeStamp() + (7*24*60*60)
  })
  coupon.save(function(err) {
    if(err) {
      return callback(err)
    }
    CouponMaster.updateOne({iid: cm.iid}, {$inc: {rest: -1}}, function(err) {
      if(err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

Coupon.getUserCoupon = function(tell, callback) {
  Coupon.find({owner: tell, useAble: true}, {__v: 0, _id: 0}, function(err, docs) {
    if(err) {
      return callback(err)
    }
    callback(null, docs)
  })
}

export default Coupon
