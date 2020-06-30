import request from './request'

export function getOrder(shopId) {
  return request({
    url: '/shop/getOrder',
    params: {
      shopId: shopId
    }
  })
}

export function getComplete(shopId, start, end) {
  return request({
    url: '/shop/getComplete',
    params: {
      shopId,
      start,
      end
    }
  })
}

export function getCancel(shopId, start, end) {
  return request({
    url: '/shop/getCancel',
    params: {
      shopId,
      start,
      end
    }
  })
}

export function stateChange(orderId, state) {
  return request({
    url: '/shop/changeOrderState',
    params: {
      orderId: orderId,
      state: state
    }
  })
}
export function foodDone(orderId, iid, state) {
  return request({
    url: '/shop/foodDone',
    params: {
      orderId: orderId,
      iid: iid,
      state: state
    }
  })
}

export function completeOrder(orderId, shopId, pay) {
  return request({
    url: '/shop/completeOrder',
    params: {
      orderId: orderId,
      shopId: shopId,
      pay: pay
    }
  })
}

export function makeOrder(shopId, isHere, table, dishware, list, pay) {
  return request({
    method: 'POST',
    url: '/shop/makeOrder',
    data: {
      shopId,
      isHere,
      table,
      dishware,
      list,
      pay
    }
  })
}