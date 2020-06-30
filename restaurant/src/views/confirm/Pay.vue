<template>
  <div id="pay">
    <nav-bar class="nav">
      <template v-slot:left>
        <div class="back" @click="back"></div>
      </template>
      <template v-slot:center>收银台</template>
    </nav-bar>
    <div class="order" v-if="orderInfo">
      <!-- <div class="id">订单号：{{String(orderInfo.orderId) | orderId}}</div> -->
      <div class="price">&yen;&nbsp;<span style="fontSize: 32px;">{{orderInfo.pay}}</span></div>
      <div class="time">支付剩余时间：{{min}}:{{s}}</div>
    </div>
    <div class="payfor" v-if="!isCancel">
      <div class="payfor-item" @click="itemClick(1)">
        <div class="wx"></div>微信支付
        <span class="check" v-show="current == 1"></span>
      </div>

      <div class="payfor-item"  @click="itemClick(2)">
        <div class="zfb"></div>支付宝支付
        <span class="check" v-show="current == 2"></span>
      </div>

      <div class="payfor-item"  @click="itemClick(3)">
        <div class="apple"></div>Apple Pay
        <span class="check" v-show="current == 3"></span>
      </div>

      <div class="payfor-item"  @click="itemClick(4)">
        <div class="cloud"></div>云闪付 
        <span class="check" v-show="current == 4"></span>
      </div>

      <div class="payfor-item"  @click="itemClick(5)">
        <div class="wxf"></div>微信好友代付 
        <span class="check" v-show="current == 5"></span>
      </div>
    </div>
    <div class="cancel" v-else>该订单超时未支付，已过期</div>
    <div class="pay-btn" v-if="orderInfo && !isCancel" @click="pay">{{payInfo()}}</div>
    <div class="tip">暂未申请真实支付接口<br/>点击付款默认为支付成功~<br/>点击返回按钮则为待支付状态~</div>
  </div>
</template>

<script>
import {getOrderPay, pay} from 'network/order'
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'Pay',
  components: {
    NavBar
  },
  data() {
    return{
      current: 1,
      orderInfo: null,
      rest: 0,
      min: '00',
      s: '00',
      timer: null,
      isCancel: false,
      method: ['微信付款','支付宝付款','Apple Pay 付款','云闪付付款','微信好友代付']
    }
  },
  methods: {
    itemClick(index) {
      this.current = index
    },
    back() {
      this.$router.replace('/order')
    },
    timeOut() {
      this.fn()
      this.timer = setInterval(this.fn, 1000);
    },
    fn() {
       this.rest--
        this.rest > 0? this.rest : 0
        if(this.rest <= 0) {
          this.s = '00'
          this.isCancel =  true
          this.$toast.show('支付超时')
         return clearInterval(this.timer)
        }
        this.s = this.rest%60 <10? '0'+this.rest%60:this.rest%60
        this.min= Math.floor(this.rest/60) <10? '0'+Math.floor(this.rest/60):Math.floor(this.rest/60)
    },
    payInfo() {
      return this.method[this.current-1] + ' ￥' + this.orderInfo.pay
    },
    pay() {
      this.$toast.loading()
      pay(this.orderInfo.orderId).then(res => {
        if(res.code == 1) {
          this.$router.replace('/order')
        }else {
          this.$toast.show('付款失败')
        }
        this.$toast.hide()
      })
    }
  },
  created() {

    getOrderPay(this.$route.params.orderId).then(ret => {
      this.orderInfo = ret.data
      let timeStamp = Math.round(new Date().getTime() / 1000)
      this.rest = ret.data.createTime + 900 - timeStamp
      this.timeOut()
    })
  },
  filters: {
    orderId(id) {
      return id.substr(0,4) + ' ' + id.substr(4, 4) + '  ' + id.substr(8, 4) + '  ' + id.substr(12, 4)
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
  #pay {
    width: 100vw;
    height: 100vh;
  }
  .nav {
    background-color: #4fc08d;
  }
  .back {
    font-family: 'icomoon';
    font-size: 30px;
  }
  .order {
    background-color: #fff;
    border-radius: 5px;
    margin: 10px;
  }
  .id,
  .price,
  .time {
    height: 36px;
    font-size: 16px;
    text-align: center;
    line-height: 36px;
  }
  .price {
    color: #eb2f06;
  }
  .cancel {
    margin: 10px;
    height: 100px;
    line-height: 100px;
    background-color: #fff;
    text-align: center;
    color: #eb2f06;
    font-size: 14px;
  }
  .payfor {
    background-color: #fff;
    margin: 10px;
    border-radius: 5px;
  }
  .payfor-item {
    height: 44px;
    border-bottom: 1px solid #f3f3f3;
    padding-left: 60px;
    line-height: 44px;
    font-size: 14px;
    position: relative;
  }
  .wx,
  .zfb,
  .apple,
  .cloud,
  .wxf {
    width: 30px;
    height: 30px;
    background-color: #f3f3f3;
    position: absolute;
    left: 20px;
    top: 7px;
  }
  input[type="radio"] {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
    top: 12px;
  }
  .wx {
    background: url(~assets/images/wx.png);
    background-size: contain;
  }
  .zfb {
    background: url(~assets/images/zfb.png);
    background-size: contain;
  }
  .apple {
    background: url(~assets/images/apple.png);
    background-size: contain;
  }
  .cloud {
    background: url(~assets/images/pay.png);
    background-size: contain;
  }
  .wxf {
    border-radius: 5px;
    background: url(~assets/images/wxf.png);
    background-size: contain;
  }
  .check {
    font-family: 'icomoon';
    position: absolute;
    right: 20px;
    font-size: 20px;
    color: #4fc08d;
  }
  .pay-btn {
    height: 44px;
    color: #fff;
    background-color: #2ecc71;
    line-height: 44px;
    text-align: center;
    margin: 0 10px;
    border-radius: 5px;
  }
  .tip {
    margin: 10px;
    text-align: center;
    font-size: 12px;
    color: #888;
    line-height: 20px;
    /* background-color: #fff; */
    /* border-radius: 5px; */
    padding: 10px;
  }
</style>