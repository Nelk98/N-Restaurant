import request from './request'

export function getCouponMaster() {
  return request({
    url: '/getCouponMaster'
  })
}

export function getScore(tell) {
  return request({
    url: '/getUserScore'
  })
}

export function exchangeCoupon(iid) {
  return request({
    url: '/exchangeCoupon',
    params: {
      iid
    }
  })
}

export function getCoupon() {
  return request({
    url: '/getCoupon'
  })
}