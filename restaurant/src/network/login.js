import request from './request'

export function requestCode(tell) {
  return request({
    url: '/identify',
    params: {
      tell: tell
    }
  })
}

export function login(tell, code) {
  return request({
    url: '/login',
    params: {
      tell: tell,
      identify: code
    }
  })
}

export function register(token, nickName, avatar) {
  return request({
    url: '/register',
    params: {
      token: token,
      nickName: nickName,
      avatar: avatar
    }
  })
}

export function isLogin() {
  return request({
    url: '/isLogin'
  })
}

export function getUserInfo() {
  return request({
    url: '/userInfo'
  })
}

export function logout() {
  return request({
    url: '/logout'
  })
}