
import Report from '../models/report'

export function getReport(req, res) {
  let reportInfo = {
    shopId: req.query.shopId,
    start: req.query.today - (6 * 24 * 60 * 60),
    end: req.query.today
  }
  Report.getReport(reportInfo, function(err, ret) {
    if(err) {
      return res.send({code: -1, msg: '报表查询失败', error: err})
    }
    res.send({code: 1, msg: '报表查询成功', data: ret})
  })
}