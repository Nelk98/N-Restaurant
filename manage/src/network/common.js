import request from './request'


export function getShopInfo(shopId) {
  return request({
    url: '/getShopInfo',
    params: {
      shopId
    }
  })
}

export function getCouponMaster() {
  return request({
    url: '/getCouponMaster'
  })
}