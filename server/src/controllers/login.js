import { sendSms, getToken } from '../public/utils'


import User from '../models/user'


export function isLogin(req, res) {
  let user = req.signedCookies.user
  if (user && user.secret == 'hello') {
    User.getUserInfo(user.tell, function(err, ret) {
      if (err) {
        res.send({ code: -1, isLogin: false })
      } else {
        res.send({ code: 1, isLogin: true, data: ret })
      }
    })
  } else {
    res.send({ code: -1, isLogin: false })
  }
}

// 请求验证码
export function requestCode(req, res) {
  if (req.query.tell) {
    req.session.tell = req.query.tell
    let code = String(Math.round(Math.random() * 8999 + 1000))

    // 发送短信
    // sendSms(req.query.tell, code)

    req.session.code = code
    res.send({ code: 1, msg: '发送成功', secret: req.session.code })
  } else {
    res.send({ code: 0, msg: '缺少电话' })
  }
}

//登录
export function login(req, res) {
  if (req.query.identify == req.session.code && req.query.tell == req.session.tell) {
    //清空验证码，防止重现
    delete req.session.code

    User.getUserInfo(req.query.tell, function(err, ret) {
      if (err) {
        res.send({ code: -1, msg: '服务器繁忙' })
      } else {
        if (ret) { //用户存在
          res.cookie('user', { //记录cookie登录状态 
            nickName: ret.nickName,
            tell: ret.tell,
            avatar: ret.avatarURL,
            secret: 'hello'
          }, { maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true });
          res.send({ code: 1, msg: '登录成功' })
        } else { //用户不存在
          req.session.token = getToken()
          res.send({ code: 0, msg: '新用户', token: req.session.token })
        }
      }
    })

  } else {
    res.send({ code: -1, msg: '登录失败' })
  }
}

export function register(req, res) {
  //解决服务器接收到base64字符串将＋转化成空格问题
  if (req.query.token) {
    var token = req.query.token.replace(' ', '+')
  }

  if (req.session.token && token == req.session.token) {
    let nickName = req.query.nickName
    let tell = req.session.tell
    let avatar = '/public/images/avatar/avatar' + req.query.avatar + '.png'
    User.createAccount(nickName, tell, avatar, function(err, ret) {
      if (err) {
        res.send({ code: -1, msg: '服务器繁忙' })
      } else {
        delete req.session.token //删除token 防止重现
        res.cookie('user', { //记录cookie登录状态 
          nickName: nickName,
          tell: tell,
          avatar: avatar,
          secret: 'hello'
        }, { maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true })
        res.send({ code: 1, msg: '注册成功' })
      }
    })
  } else {
    res.send({ code: -1, msg: '注册超时' })
  }
}

export function getUserInfo(req, res) {
  if (req.signedCookies.user) {
    let user = req.signedCookies.user
    User.getUserInfo(user.tell, function(err, ret) {
      if (err) {
        res.send({ code: -1, msg: '服务器繁忙' })
      } else if (ret) {
        res.send({ code: 1, msg: '请求成功', data: ret })
      } else {
        res.send({ code: 0, msg: '请求失败', data: ret })
      }
    })
  } else {
    res.send({ code: 0, msg: '尚未登录', })
  }
}


export function logout(req, res) {
  res.clearCookie('user')
  res.send({ code: 1, msg: '退出成功' })
}

export function getUserScore(req, res) {
  let user = req.signedCookies.user
  User.getUserInfo(user.tell, function(err, ret) {
    if (err) {
      return res.json({ code: -1, msg: '服务器繁忙' })
    }
    res.json({ code: 1, msg: '请求成功', data: ret.score })
  })
}