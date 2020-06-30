import axios from 'axios'
axios.defaults.withCredentials = true
export default function request(config, success, failure) {

  const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
  })


  // 拦截
  instance.interceptors.request.use(config => {

    //config 一些信息不符合服务器要求
    //每次发送网络请求过程 有等待图标转动
    //某些网络请求 需要携带 token（登录）信息
    return config
  }, err => {
    console.log(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)

}


// url  路径
// method   默认 get
// baseURL 自动加url前
// params 携带参数 必须是一个对象
// data 发送的数据