import mongoose from './db'
import { getTimeStamp } from '../public/utils'

const commentSchema = mongoose.Schema({
  orderId: Number,
  shopId: String,
  created: Number,
  nickName: String,
  avatar: String,
  star: Number,
  text: String,
  imgs: Array,
  likes: Array,
  isReply: {
    type: Boolean,
    default: false
  },
  reply: {
    type: String,
    default: ''
  }
})

const Comment = mongoose.model('Comment', commentSchema)


Comment.commitComment = function (commentInfo, user, callback) {
  let commentData = new Comment({
    orderId: commentInfo.orderId,
    shopId: commentInfo.shopId,
    created: getTimeStamp(),
    nickName: user.nickName,
    avatar: user.avatar,
    star: commentInfo.star,
    text: commentInfo.text,
    imgs: commentInfo.imgs || [],
    likes: commentInfo.likes
  })
  commentData.save(function(err) {
    if(err) {
      return callback(err)
    }
    callback(null)
  })
}

Comment.getComment = function (shopId, callback) {
  Comment.find({shopId: shopId},{_id: 0, __v: 0}).sort({created: -1}).limit(8).skip(0).exec((err, docs) => {
    if(err) {
      return callback(err)
    }
    callback(null, docs)
  })
}

Comment.reply = function(orderId, reply, callback) {
  Comment.updateOne({orderId: Number(orderId)}, {isReply: true, reply: reply}, function(err) {
    if(err) {
      return callback(err)
    }
    callback(null)
  })
}

export default Comment