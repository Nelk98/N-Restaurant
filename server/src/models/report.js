import mongoose from './db'

const reportSchema = mongoose.Schema({
  today: {
    type: Number,
    required: true
  },
  hour: {
    type: Number,
    required: true
  },
  shopId: {
    type: String,
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
})

const Report = mongoose.model('Report', reportSchema)

// Report.newReport = function (reportInfo, callback) {
//     let o = new Report({
//         today: reportInfo.today,
//         hour: reportInfo.hour,
//         shopId: reportInfo.shopId,
//         income: reportInfo.income,
//         count: reportInfo.count
//     })
//     o.save(function(err) {
//         if(err) {
//            return callback(err)
//         }
//         callback(null)
//     })
// }
// Report.updateReport = function(reportInfo, callback) {
//     Report.updateOne({today: reportInfo.today, hour: reportInfo.hour, shopId: reportInfo.shopId},reportInfo, function(err) {
//         if(err) {
//             return callback(err)
//         }
//         callback(null)
//     })
// }

// Report.findReport = function (reportInfo, callback) {
//     Report.findOne({today: reportInfo.today, hour: reportInfo.hour, shopId: reportInfo.shopId}, function(err, doc) {
//         if(err) {
//            return callback(err)
//         }
//         callback(null, doc)
//     })
// }

Report.getReport = function(reportInfo, callback) {
  Report.find({
    shopId: reportInfo.shopId,
    today: { $gte: reportInfo.start, $lte: reportInfo.end }
  }, { _id: 0, __v: 0 }).sort({ today: 1 }).exec(function(err, docs) {
    if (err) {
      return callback(err)
    }
    callback(null, docs)
  })
}


Report.upsertReport = function(reportInfo, callback) {
  let hour = reportInfo.hour
  let today = reportInfo.today
  let shopId = reportInfo.shopId
  let income = reportInfo.income
  Report.updateOne({ today, hour, shopId }, { $inc: { income: income, count: 1 } }, { upsert: true }).exec(err => {
    if (err) {
      return callback(err)
    }
    callback(null)
  })
}

export default Report