import request from './request'

export function comment(commentInfo) {
  return request({
    method: 'POST',
    url: '/comment',
    data: commentInfo
  })
}

export function getComment(shopId) {
  return request({
    url: '/getComment',
    params: {
      shopId
    }
  })
}