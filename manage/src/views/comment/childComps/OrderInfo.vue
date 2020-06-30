<template>
  <div class="order-info">
    <div class="foods">
      <div class="food-item" v-for="item in info.foods" :key="item.iid">
        <img :src="item.img" class="food-img">
        <span class="name">{{item.name}}</span>
        <span class="price"><span style="font-size: 12px">&yen;&nbsp;</span>{{item.price}}</span>
        <span class="count"><span style="font-size: 12px">&times;&nbsp;</span>{{item.count}}</span>
      </div>
    </div>
    <div class="order-info-item">
      <span class="title">订单编号</span>
      <span class="content">{{info.orderId}}</span>
    </div>
    <div class="order-info-item">
      <span class="title">下单时间</span>
      <span class="content">{{info.createTime | time}}</span>
    </div>
    <div class="order-info-item">
      <span class="title">完成时间</span>
      <span class="content">{{info.updateTime | time}}</span>
    </div>
    <div class="order-info-item">
      <span class="title">订单金额</span>
      <span class="content">&yen;&nbsp;{{info.originPrice}}</span>
    </div>
    <div class="order-info-item">
      <span class="title">实付</span>
      <span class="content">&yen;&nbsp;{{info.pay}}</span>
    </div>
    <div class="order-info-item">
      <span class="title">优惠券使用</span>
      <span class="content">&yen;&nbsp;{{info.coupon}}</span>
    </div>
    <div class="order-info-item">
      <span class="title">用餐方式</span>
      <span class="content" v-if="info.isHere">店内用餐, {{info.table}}号桌</span>
      <span class="content" v-else>打包带走, 餐具{{info.dishware}}副</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderInfo',
  props: {
    info: Object
  },
  filters: {
    time(ts) {
      let date = new Date(ts * 1000)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month > 9 ? month : '0' + month
      let day = date.getDate()
      day = day > 9 ? day : '0' + day
      let hour = date.getHours()
      hour = hour > 9 ? hour : '0' + hour
      let mins = date.getMinutes()
      mins = mins > 9 ? mins : '0' + mins
      return `${year}-${month}-${day} ${hour}:${mins}`
    }
  }
}
</script>

<style scoped>
.order-info {
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(51, 51, 51, .18);
  padding:  0 20px;
}
.order-info-item {
  height: 49px;
  position: relative;
  border-bottom: 1px dashed #ccc;
  line-height: 49px;
  display: flex;
}
.order-info-item:last-child {
  border: none;
}
.title {
  width: 100px;
  font-size: 14px;
  font-weight: 600;
}
.content {
  flex: 1;
  text-align: right;
  font-size: 14px;
}
.food-item {
  height: 88px;
  position: relative;
  border-bottom: 1px dashed #ccc;
}
img.food-img {
  width: 66px;
  height: 66px;
  margin-top: 11px;
}
span.name {
  position: absolute;
  top: 22px;
  left: 78px;
  font-size: 16px;
  font-weight: 600;
}
span.price {
  position: absolute;
  top: 22px;
  right: 10px;
  font-size: 20px;
  color: #333;
}
span.count {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 18px;
  color: #888;
}
</style>