import request from 'request'
import CryptoJS from 'crypto-js'

//时间戳
export function getTimeStamp() {
  return Math.round(new Date().getTime() / 1000)
}
//随机数
function getRandom(max, min = 0) {
  return Math.round(Math.random() * (max - min) + min)
}

function sortObj2Str(obj) {
  return Object.keys(obj).sort((a, b) => {
    return a.localeCompare(b)
  }).map(key => {
    return key + '=' + obj[key]
  }).join('&')
}

//短信服务
export function sendSms(tell, code) {
  let host = 'sms.tencentcloudapi.com'
  let params = {
    'Action': "SendSms",
    Version: "2019-07-11",
    'PhoneNumberSet.0': '+86' + tell,
    TemplateID: '549411',
    SmsSdkAppid: '1400329439',
    'TemplateParamSet.0': code,
    Timestamp: getTimeStamp(),
    Sign: "Nelk来了",
    Nonce: getRandom(10000),
    SecretId: 'AKIDrWx98tAoKUP5VaQ4SaaKp4PVLvE5RiB3',
  }

  let str = sortObj2Str(params)
  str = ['GET', host, '/?', str].join('')
  let key = 'av1rW0GH3Tg7OUO3WfS3OULzNM7D7qKY'
  str = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(str, key))
  params.Signature = str
  console.log(params)
    // return str
  request({
    url: 'https://' + host,
    qs: params
  }, (err, res, body) => {
    console.log(body)
  })
}

export function getToken() {
  return CryptoJS.enc.Base64.stringify(CryptoJS.MD5('nelk' + getTimeStamp() + '888' + getRandom(1000)))
}


export function createOrderId() {
  return String(getTimeStamp()) + getRandom(999999)
}

export function createFoodId() {
  let arr = []
  let arr1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let arr2 = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  let arr3 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  arr.push(...arr1)
  arr.push(...arr2)
  arr.push(...arr1)
  arr.push(...arr3)
  arr.push(...arr1)
  let id = ''
  for(let i = 0; i < 5; i++) {
    let index = Math.floor(Math.random() * 82)
    id = id + arr[index]
  }
  return id
}