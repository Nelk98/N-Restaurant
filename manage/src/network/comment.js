import request from './request'

export function getComments(shopId, page) {
  return request({
    url: '/getComment',
    params: {
      shopId
    }
  })
}

export function getCommentOrder(orderId) {
  return request({
    url: '/getCommentOrder',
    params: {
      orderId
    }
  })
}

export function reply(orderId, reply) {
  return request({
    url: '/reply',
    method: 'POST',
    data: {
      orderId,
      reply
    }
  })
}