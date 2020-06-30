# 目录结构

- public
  + css
  + js
  + images
  + media

- routes
  + 根据路由抽离到不同路由文件

- controllers
  + 每个处理方法文件对应一个route使用

- models
  + 处理数据库
  + 导出接口对象给controllers使用

- middlewares
  + body-parser 处理表单数据
  + error-log 报错信息
