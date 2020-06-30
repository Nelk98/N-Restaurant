import mongoose from './db'
import { getTimeStamp } from '../public/utils'

const logSchema = mongoose.Schema({
  shopId: String,
  type: String,
  time: Number,
  target: String
})

const MLog = mongoose.model('Log', logSchema, 'manage_logs')


MLog.getLogs = function(shopId, callback) {
  MLog.find({ shopId: shopId }, { __v: 0, _id: 0 }).limit(50).sort({ time: -1 }).exec((err, docs) => {
    if (err) {
      return callback(err)
    }
    callback(null, docs)
  })
}

MLog.newLog = function(shopId, type, target) {
  const mlog = new MLog({
    shopId: shopId,
    type: type,
    target: target,
    time: getTimeStamp()
  })
  mlog.save()
}

export default MLog