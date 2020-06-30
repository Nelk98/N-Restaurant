import request from './request'

export function getOrderPay(orderId) {
  return request({
    url: '/getOrderPay',
    method: 'GET',
    params: {
      orderId: orderId
    }
  })
}

export function getOrder(page, limit) {
  return request({
    url: '/getOrder',
    params: {
      page,
      limit
    }
  })
}

export function pay(orderId) {
  return request({
    url: '/pay',
    params: {
      orderId: orderId
    }
  })
}

export function cancelOrder(orderId) {
  return request({
    url: '/cancelOrder',
    params: {
      orderId: orderId
    }
  })
}

export function cancelPay(orderId) {
  return request({
    url: '/cancelPay',
    params: {
      orderId: orderId
    }
  })
}
