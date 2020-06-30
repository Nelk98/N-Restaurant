import request from './request'

export function getCoupon() {
  return request({
    url: '/coupon'
  })
}

export function placeOrder(options) {
  return request({
    url: '/order/forhere',
    method: 'POST',
    data: {
      options
    }
  })
}