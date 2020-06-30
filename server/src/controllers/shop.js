import Shop from '../models/shop'

export function getShopList(req, res) {
  if(!req.query.shopId) {
    Shop.getShopList(function(err, ret) {
      if (err) {
        res.send({ code: -1, msg: "请求失败" })
      } else {
        res.send({ code: 1, msg: "请求成功", data: ret })
      }
    })
  }else {
    Shop.getShopInfo(req.query.shopId, function(err, ret) {
      if (err) {
        res.send({ code: -1, msg: "请求失败" })
      } else {
        res.send({ code: 1, msg: '请求成功', data: ret })
      }
    })
  }
}

export function getShopInfo(req, res) {
  Shop.getShopInfo(req.query.shopId, function(err, ret) {
    if (err) {
      res.send({ code: -1, msg: "请求失败" })
    } else {
      res.send({ code: 1, msg: '请求成功', data: ret })
    }
  })
}