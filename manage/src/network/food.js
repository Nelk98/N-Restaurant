import request from './request'

export function getFood(shopId) {
  return request({
    url: '/food',
    params: {
      shopId
    }
  })
}

export function changeOnsale(shopId, iid, flag, name) {
  return request({
    url: '/changeOnsale',
    params: {
      shopId,
      iid,
      flag,
      name
    }
  })
}

export function getFoodDetail(shopId, iid) {
  return request({
    url: '/getFoodDetail',
    params: {
      shopId,
      iid
    }
  })
}

export function modifyFood(shopId, iid, options) {
  return request({
    url: '/modifyFood',
    method: 'POST',
    data: {
      shopId,
      iid,
      options
    }
  })
}
 
export function createFood(shopId, options) {
  return request({
    url: '/createFood',
    method: 'POST',
    data: {
      shopId,
      options
    }
  })
}

export function deleteFood(shopId, iid, name) {
  return request({
    url: '/deleteFood',
    params: {
      shopId, 
      iid,
      name
    }
  })
}

export function getManageLogs(shopId) {
  return request({
    url: '/getManageLogs',
    params: {
      shopId
    }
  })
}

export function searchFoods(shopId, keyword) {
  return request({
    url: '/searchFoods',
    params: {
      shopId,
      keyword
    }
  })
}