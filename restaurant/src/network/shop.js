import request from './request'

export function getFood(shopId) {
  return request({
    url: '/food',
    params: {
      shopId: shopId
    }
  })
}

export function getShopInfo(shopId) {
  return request({
    url: '/shop',
    params: {
      shopId: shopId
    }
  })
}