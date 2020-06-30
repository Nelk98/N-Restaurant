import mongoose from './db'

const shopSchema = mongoose.Schema({
  shopId: {
    type: String,
    required: true
  },
  shopName: {
    type: String,
    required: true
  },
  tell: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  fulladdress: {
    type: String
  },
  shopPic: {
    type: String,
    required: true
  },
  img: {
    type: Array,
    default: []
  },
  serTime: {
    type: String,
    required: false,
    default: "11:00 - 22:00"
  },
  tip: {
    type: String,
    required: false,
    default: "希望大家能够喜欢我们餐厅，欢迎您提出宝贵意见。"
  },
  discounts: {
    type: Array,
    required: false,
    default: [{ attain: 20, discount: 2 }]
  },
  sold: {
    type: Number,
    required: false,
    default: 0
  },
  comment: {
    type: Number,
    required: false,
    default: 0
  },
  like: {
    type: Number,
    default: 0
  }
})

const Shop = mongoose.model('Shop', shopSchema)

Shop.getShopList = function(callback) {
  Shop.find({ shopId: { $ne: "test" } }).exec(function(err, ret) {
    if (err) {
      callback(err)
    } else {
      callback(null, ret)
    }
  })
}

Shop.getShopInfo = function(shopId, callback) {
  Shop.findOne({ shopId: shopId }).exec(function(err, ret) {
    if (err) {
      callback(err)
    } else {
      callback(null, ret)
    }
  })
}

export default Shop