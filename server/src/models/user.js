import mongoose from './db'

const userSchema = mongoose.Schema({
  nickName: {
    type: String,
    default: '匿名用户'
  },
  tell: {
    type: String,
    required: true
  },
  avatarURL: {
    type: String,
    default: '/public/static/avatar01.png'
  },
  register: {
    type: Number,
    default: Math.round(new Date().getTime() / 1000)
  },
  total: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  orderCount: {
    type: Number,
    default: 0
  },
  coupon: {
    type: Object,
    default: {
      c1: {
        attain: 0,
        value: 1,
        number: 0
      },
      c2: {
        attain: 0,
        value: 2,
        number: 0
      },
      c5: {
        attain: 0,
        value: 5,
        number: 0
      },
      c10: {
        attain: 35,
        value: 10,
        number: 0
      },
      c20: {
        attain: 98,
        value: 20,
        number: 0
      }
    }
  },
  score: {
    type: Number,
    default: 0
  }

})

const User = mongoose.model('User', userSchema)

User.createAccount = function(nickName, tell, avatarURL, callback) {
  User.insertMany({ nickName: nickName, tell: tell, avatarURL: avatarURL }, function(err, ret) {
    if (err) {
      callback(err)
    } else {
      callback(null, ret)
    }
  })
}

User.getUserInfo = function(tell, callback) {

  User.findOne({ tell: tell }, function(err, ret) {
    if (err) {
      callback(err)
    } else {
      callback(null, ret)
    }
  })

}


User.useCoupon = function(tell, value, callback) {
  let coupon = {}
  User.findOne({ tell: tell }, { coupon: 1, _id: 0 }).exec((err, doc) => {
    if (err) {
      return;
    }
    coupon = doc.coupon
    coupon['c' + value].number--;
    User.update({ tell: tell }, { coupon: coupon }, err => {})
  })
}

export default User