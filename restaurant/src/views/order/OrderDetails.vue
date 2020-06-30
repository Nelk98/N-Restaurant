<template>
  <div class="order-details">
    <nav-bar class="nav">
      <template v-slot:left>
        <div class="back" @click="back"></div>
      </template>
      <template v-slot:center>订单详情</template>
    </nav-bar>
    <scroll class="content" top="10" bottom="30">
      <div class="list">
        <div class="title">{{orderDetail.shop[0].shopName}}</div>
        <details-item v-for="item in orderDetail.items" :food="item" :key=item.iid></details-item>
        <div class="o-item" v-if="orderDetail.isHere">桌号<span class="item-r">{{orderDetail.table}} 号桌</span></div>
        <div class="o-item" v-else>一次性餐具<span class="item-r">{{orderDetail.dishware}} 副</span></div>
        <div class="o-item">使用优惠券<span class="item-r" style="color: #eb2f06">-￥{{orderDetail.coupon}}</span></div>
        <div class="o-item" v-if="orderDetail.isPay" style="textAlign: right;">实付：&yen;&nbsp;<span style="fontSize: 18px">{{orderDetail.pay}}</span></div>
        <div class="o-item" v-else-if="!orderDetail.isCancel" style="textAlign: right; color: #eb2f06">待付：&yen;&nbsp;<span style="fontSize: 18px">{{orderDetail.pay}}</span></div>
        <div class="o-item" v-else style="textAlign: right; color: #eb2f06">支付超时：&yen;&nbsp;<span style="fontSize: 18px">{{orderDetail.pay}}</span></div>
      </div>
      <div class="order-info">
        <div class="title">订单信息</div>
        <div class="o-item">订单号<span class="item-r">{{String(orderDetail.orderId) | orderId}}</span></div>
        <div class="o-item">支付情况<span class="item-r">{{orderDetail.isPay | isPay}}</span></div>
        <div class="o-item">下单时间<span class="item-r">{{orderDetail.createTime | ctime}}</span></div>
        <div class="o-item">订单备注<span class="item-r">{{orderDetail.remark | remark}}</span></div>
      </div>
      <div class="block"></div>
    </scroll>
  </div>  
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import NavBar from 'components/common/navbar/NavBar'
import detailsItem from './childComps/DetailsItem'
export default {
  name: 'OrderDetails',
  components: {
    Scroll,
    NavBar,
    detailsItem
  },
  methods: {
    back() {
      this.$router.replace('/order')
    }
  },
  data() {
    return {
      orderDetail: null
    }
  },
  created() {
    this.orderDetail = JSON.parse(localStorage.getItem('orderDetail'))
  },
  filters: {
    orderId(id) {
      return id.substr(0,4) + ' ' + id.substr(4, 4) + '  ' + id.substr(8, 4) + '  ' + id.substr(12, 4)
    },
    isPay(flag) {
      if(flag) {
        return "已付款"
      }
      return "未付款"
    },
    ctime(timeStamp) {
      let time = new Date(timeStamp*1000)
      let y = time.getFullYear()
      let m = time.getMonth()+1
      let d = time.getDate()
      let h = time.getHours()<10?'0'+time.getHours():time.getHours()
      let min = time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes()
      return y + '-' + m + '-' + d + ' ' + h + ':' +min
    },
    remark(remark) {
      if(!remark.length) {
        return '无备注'
      }
      return remark
    }
  }
}
</script>

<style scoped>
.order-details {
  padding-top: 59px;
  height: 100vh;
  width: 100vw;
  position: relative;
}
.block {
  height: 88px;
}
.nav {
  background-color: #4fc08d;
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 999;
}
.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 0;
}
.back {
  font-family: 'icomoon';
  font-size: 30px;
}
.list,
.order-info {
  margin: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, .08);
}
.title {
  height: 49px;
  line-height: 49px;
  border-bottom: 1px solid #eee ;
  margin: 0 20px;
  font-size: 16px;
  font-weight: 500;
}
.o-item {
  height: 49px;
  line-height: 49px;
  font-size: 14px;
  margin: 0 20px;
  font-weight: 500;
  border-bottom: 1px solid #eee
}
.item-r {
  float: right;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>