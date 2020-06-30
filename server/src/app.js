import express from 'express'
import session from 'express-session'
import cookie from 'cookie-parser'
import bodyParser from 'body-parser'
import _ from 'underscore'
const app = express()

const http = require('http').Server(app)


export const io = require('socket.io')(http)

io.on('connection', socket => {
  socket.on('shopId', shopId => {
    socket.shopId = shopId
  })
})

import shopRouter from './routes/shop'
import foodRouter from './routes/food'
import loginRouter from './routes/login'
import orderRouter from './routes/order'
import reportRouter from './routes/report'
import commentRouter from './routes/comment'
import couponRouter from './routes/coupon'


app.use('/public/', express.static('./public/'))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// app.use(cors({
//   methods: ['GET', 'POST']
// }));

// app.all('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://192.168.0.150:8080');
//   res.header('Access-Control-Allow-Headers', 'Origin,No-Cache,X-Requested-With,If-Modified-Since,Pragma,Last-Modified,Cache-Control,Expires,Content-Type,Access-Control-Allow-Credentials,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Cache-Webcdn');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   res.header('Access-Control-Allow-Credentials', 'true')
//   res.header('Access-Control-Allow-Methods', 'GET,POST')
//   next();
// });


app.use(cookie('Nelk1998'))

app.use(session({
  secret: 'nelk',
  resave: false,
  savaUninitialized: true
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
app.use(bodyParser.json())

app.use(shopRouter)
app.use('/api', foodRouter)
app.use(loginRouter)
app.use(orderRouter)
app.use(reportRouter)
app.use(commentRouter)
app.use('/api', couponRouter)


http.listen(3000, function() {
  console.log('服务器启动成功...')
})