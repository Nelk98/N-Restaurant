import request from './request'

export function getReport(today, shopId) {
  return request({
    url: '/shop/getReport',
    params: {
      today,
      shopId
    }
  })
}