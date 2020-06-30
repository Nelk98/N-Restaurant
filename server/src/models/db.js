import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/Graduation', { useNewUrlParser: true }, function(err) {
  if (err) {
    return console.log(err)
  }
  console.log('数据库连接成功')
})

module.exports = mongoose