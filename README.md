# Vue-Restaurant

基于Vue和Node的毕业设计项目，实现点餐、订单管理、菜单管理、评论、店铺管理等功能。

线上链接：

http://restaurant.nelk.xyz （移动端）

http://manage.nelk.xyz （pc端）

2020.3 - 2020.4

## restaurant

移动端、顾客点餐系统前端部分。

项目起步

```shell
npm install
```

开发时编译

```shell
npm run serve
```

打包输出

```shell
npm run build
```



## manage

pc端、后台管理系统前端部分。

项目起步

```shell
npm install
```

开发时编译

```shell
npm run serve
```

打包输出

```shell
npm run build
```



## server

基于Node、mongoDB的系统后台。

项目起步

```shell
npm install
```

开发时编译

```shell
npm run dev
```

打包输出

```shell
npm run build
```



## json

导入测试数据

```shell
mongoimport -d 库名 -c 集合名 --file json文件路径
```

数据库连接配置

```js
//server/src/models/db.js
import mongoose from 'mongoose'
const dbName = 'Graduation' //数据库名称
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true }, function(err) {
  if (err) {
    return console.log(err)
  }
  console.log('数据库连接成功')
})

module.exports = mongoose
```

