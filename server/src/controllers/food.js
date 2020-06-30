import Food from '../models/food'
import MLog from '../models/manage-log'

import fs from 'fs'
import path from 'path'
import uuid from 'node-uuid'
import { resolve } from 'dns'

//获取食物列表
export function getFoodList(req, res) {
  const shopId = req.query.shopId
  Food.getFoodList(shopId, function(err, ret) {
    if (err) {
      res.send({ code: '-1', msg: '请求失败' })
    } else {
      res.send({ code: '1', msg: '请求成功', data: ret })
    }

  })
}

export function getAll(req, res) {
  fs.readFile(path.join(__dirname, '../models/food.json'), function(err, ret) {
    if (err) {
      res.send('xxxx')
    } else {
      res.send(JSON.parse(ret))
    }
  })
}

//上下架食物
export function changeOnsale(req, res) {
  let data = req.query
  Food.changeOnsale(data.shopId, data.iid, data.flag, function(err) {
    if (err) {
      return res.send({ code: -1, msg: '更新状态失败' })
    }
    if (data.flag == 'true') {
      MLog.newLog(data.shopId, 'onsale', data.name)
    } else {
      MLog.newLog(data.shopId, 'soldout', data.name)
    }
    res.send({ code: 1, msg: '更新状态成功' })
  })
}

//获取食物详情信息
export function getFoodDetail(req, res) {
  Food.findOne({ shopId: req.query.shopId, iid: req.query.iid }, { _id: 0, __v: 0 }, function(err, ret) {
    if (err) {
      return res.send({ code: -1, msg: '查询失败' })
    }
    res.send({ code: 1, msg: '查询成功', data: ret })
  })
}

//编辑食物
export function modifyFood(req, res) {
  let shopId = req.body.shopId
  let iid = req.body.iid
  let options = req.body.options
  MLog.newLog(shopId, 'modify', options.name)
    //没有修改图片
  if (!options.isChangeImg) {
    Food.modifyWithoutImg(shopId, iid, options, function(err) {
      if (err) {
        return res.json({ errcode: 1001, msg: '修改数据失败', error: err })
      }
      res.json({ errcode: '', msg: '修改数据成功' })
    })
  } else {
    //修改了图片
    let content = req.body.options.imgList[0].content.replace(/^data:image\/\w+;base64,/, "")
    let dataBuffer = Buffer.from(content, 'base64')
    const creatuuid = uuid.v1()
    let fileSrc = `public/images/food/${creatuuid}.png`
    let imgSrc = ''
    fs.writeFile(fileSrc, dataBuffer, function(err) {
      if (err) {
        return res.json({ errcode: 1003, msg: '图片上传失败' })
      } else {
        imgSrc = '/' + fileSrc
      }
      Food.modifyWithImg(shopId, iid, options, imgSrc, function(err) {
        if (err) {
          return res.json({ errcode: 1001, msg: '修改数据失败', error: err })
        }
        res.json({ errcode: '', msg: '修改数据成功' })
      })
    })
  }
}

//新增食物
export function createFood(req, res) {
  // res.json({errcode: 1001, msg: 'failue'})
  let shopId = req.body.shopId
  let options = req.body.options
  let content = req.body.options.imgList[0].content.replace(/^data:image\/\w+;base64,/, "")
  let dataBuffer = Buffer.from(content, 'base64')
  const creatuuid = uuid.v1()
  let fileSrc = `public/images/food/${creatuuid}.png`
  let imgSrc = ''
  fs.writeFile(fileSrc, dataBuffer, function(err) {
    if (err) {
      return res.json({ errcode: 1002, msg: '图片保存失败' })
    }
    imgSrc = '/' + fileSrc
    options.img = imgSrc
    Food.createOne(shopId, options, function(err) {
      if (err) {
        return res.json({ errcode: 1001, msg: '保存失败' })
      }
      MLog.newLog(shopId, 'create', options.name)
      res.json({ errcode: '', msg: '保存成功' })
    })
  })
}

//删除食物
export function deleteFood(req, res) {
  const data = req.query
  new Promise((resolve, reject) => {
    Food.deleteOne({ shopId: data.shopId, iid: data.iid }, function(err) {
      if (err) {
        return res.json({ errcode: 1001, msg: '删除失败' })
      }
      resolve()
    })
  }).then(ret => {
    MLog.newLog(data.shopId, 'delete', data.name)
    res.json({ errcode: '', msg: '删除成功' })
  })
}

//获取管理日志信息
export function getManageLogs(req, res) {
  if (!req.query.shopId) {
    return res.json({ errcode: 1002, msg: 'lack of required params call shopId' })
  }
  MLog.getLogs(req.query.shopId, function(err, ret) {
    if (err) {
      return res.json({ errcode: 1001, msg: '查询失败' })
    }
    res.json({ errcode: '', msg: '查询成功', data: ret })
  })
}

export function searchFoods(req, res) {
  let shopId = req.query.shopId
  let keyword = req.query.keyword
  Food.searchFoods(shopId, keyword, function(err, ret) {
    if (err) {
      return res.json({ errcode: 1001, mgs: '查询失败' })
    }
    res.json({ errcode: '', msg: '查询成功', data: ret })
  })
}