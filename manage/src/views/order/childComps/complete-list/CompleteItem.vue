<template>
  <div class="complete-item">
    <div class="table" v-if="info.isHere">{{info.table}}</div>
    <div class="pack" v-else>&#xe600;</div>
    <span>订单编号：{{info.orderId}}</span>
    <span>用户名：{{info.userName}}</span>
    <span>用户电话：{{info.userTell}}</span>
    <span>下单时间：{{info.createTime | formatTime}}</span>
    <span>更新时间：{{info.updateTime | formatTime}}</span>
    <span>原价：{{info.originPrice}}</span>
    <span>实付：{{info.pay}}</span>
    <span>优惠券使用：{{info.coupon}}</span>
    <span>备注：{{info.remark}}</span>
    <div class="dish-box">
      <div class="food-item" v-for="item in info.items" :key="item.iid">
        <img class="food-img" :src="item.img" alt="">
        <span class="food-name">{{item.name}}</span>
        <span class="food-price">&yen;{{item.price}}</span>
        <span class="food-count">&times;{{item.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompleteItem',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    formatTime(ts) {
      let t = new Date(ts * 1000)
      let year = t.getFullYear()
      let month = t.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = t.getDate()
      date = date < 10 ? '0' + date : date
      let h = t.getHours()
      h = h < 10 ? '0' + h : h
      let m = t.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = t.getSeconds()
      s = s < 10 ? '0' + s : s
      return year+'-'+month+'-'+date+' '+h+':'+ m+':'+s
    }
  }
}
</script>

<style scoped>
.complete-item {
  background-color: #fff;
  position: relative;
  box-shadow: 0 0 6px rgba(51, 51, 51, .28);
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
}
.complete-item span {
  display: block;
  margin-bottom: 6px;
}
.table,
.pack {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 30px;
  color: #888;
}
.pack {
  font-family: 'iconfont';
  font-weight: 600;
}
.food-item {
  height: 70px;
  border-top: 1px dashed #ccc;
  position: relative;
}
.food-img {
  height: 60px;
  width: 60px;
}
span.food-name,
span.food-price,
span.food-count {
  position: absolute;
}
span.food-name {
  left: 80px;
  top: 10px;
  font-size: 14px;
}
span.food-price {
  top: 10px;
  right: 20px;
  font-size: 18px;
}
span.food-count {
  bottom: 0;
  right: 20px;
  color: #666;
}
</style>