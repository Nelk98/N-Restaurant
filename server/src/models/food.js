import mongoose from './db'
import { createFoodId } from '../public/utils'

const foodSchema = mongoose.Schema({
  iid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: false,
    default: ''
  },
  sold: {
    type: Number,
    required: false,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  tags: {
    type: Object,
    required: false,
    default: { clod: false, hot: false, sour: false, sweet: false }
  },
  onsale: {
    type: Boolean,
    required: false,
    default: true
  },
  shopId: {
    type: String,
    required: true
  }




})
const Food = mongoose.model('Food', foodSchema)

Food.getFoodList = function(shopId, callback) {
  Food.find({ shopId: shopId }).exec((err, ret) => {
    if (err) {
      callback(err)
    } else {
      // 进行分类
      let finnalData = []
      let flag = false
      for (let i = 0; i < ret.length; i++) {
        let index = 0
        for (let j = 0; j < finnalData.length; j++) {
          if (finnalData[j].title == ret[i].category) {
            flag = true
            index = j
            break
          }
        }
        if (flag) {
          finnalData[index].list.push(ret[i])
          flag = false
        } else {
          finnalData.push({ title: ret[i].category, list: [ret[i]] })
        }
      }

      callback(null, finnalData)
    }
  })
}


Food.getFoodById = function(shopId, list, callback) {
  let ret = []
  Food.find({ shopId: shopId }, { iid: 1, name: 1, price: 1, img: 1, _id: 0 }).in('iid', list).exec((err, docs) => {
    if (err) {
      return callback(err)
    }
    callback(null, docs)
  })
}

Food.changeOnsale = function(shopId, iid, flag, callback) {
  Food.updateOne({ shopId: shopId, iid: iid }, { onsale: flag }, function(err) {
    if (err) {
      return callback(err)
    }
    callback(null)
  })
}

Food.modifyWithoutImg = function(shopId, iid, options, callback) {
  let obj = {
    name: options.name,
    category: options.category,
    price: options.price,
    desc: options.desc,
    tags: options.tags
  }
  Food.updateOne({ shopId, iid }, obj, function(err) {
    if (err) {
      return callback(err)
    }
    callback(null)
  })
}

Food.modifyWithImg = function(shopId, iid, options, img, callback) {
  let obj = {
    name: options.name,
    category: options.category,
    price: options.price,
    desc: options.desc,
    tags: options.tags,
    img: img
  }
  Food.updateOne({ shopId, iid }, obj, function(err) {
    if (err) {
      return callback(err)
    }
    callback(null)
  })
}

Food.createOne = function(shopId, options, callback) {
  let food = new Food({
    shopId: shopId,
    iid: createFoodId(),
    name: options.name,
    price: options.price,
    category: options.category,
    img: options.img,
    tags: options.tags,
    desc: options.desc
  })
  food.save(err => {
    if (err) {
      return callback(err)
    }
    callback(null)
  })

}

Food.searchFoods = function(shopId, keyword, callback) {
  Food.find({ shopId: shopId, name: { $regex: eval(`/${keyword}/ig`) } }, function(err, docs) {
    if (err) {
      return callback(err)
    }
    let finnalData = []
    let flag = false
    for (let i = 0; i < docs.length; i++) {
      let index = 0
      for (let j = 0; j < finnalData.length; j++) {
        if (finnalData[j].title == docs[i].category) {
          flag = true
          index = j
          break
        }
      }
      if (flag) {
        finnalData[index].list.push(docs[i])
        flag = false
      } else {
        finnalData.push({ title: docs[i].category, list: [docs[i]] })
      }
    }
    callback(null, finnalData)
  })
}

export default Food