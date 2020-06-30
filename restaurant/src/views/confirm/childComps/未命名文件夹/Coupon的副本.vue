<template>
  <div class="coupon">
    <div class="title">优惠券
      <span style="float: right; color: #eb2f06; fontSize: 12px" v-if="value">已选择 {{value}} 元优惠券 </span>
      <span style="float: right; fontSize: 12px" v-else>尚未选择优惠券</span>
      </div>
    <div class="content clear-fix" v-if="coupon">
      <!-- 1元无门槛 -->
      <div class="coupon1" @click="itemClick(1)" v-if="coupon.c1.number>0">
        <span class="value"><span>&yen;&nbsp;</span>1</span>
        <div class="msg">
          <span class="icon2" v-show="value!=1"><span class="text">无门槛</span></span>
          <span class="icon"  v-show="value==1"></span>
        </div>
      </div>
      <!-- 2元无门槛 -->
      <div class="coupon1" @click="itemClick(2)" v-if="coupon.c2.number>0">
        <span class="value"><span>&yen;&nbsp;</span>2</span>
        <div class="msg">
          <span class="icon2" v-show="value!=2"><span class="text">无门槛</span></span>
          <span class="icon"  v-show="value==2"></span>
        </div>
      </div>
      <!-- 5元无门槛 -->
      <div class="coupon1" @click="itemClick(5)" v-if="coupon.c5.number>0">
        <span class="value"><span>&yen;&nbsp;</span>5</span>
        <div class="msg">
          <span class="icon2" v-show="value!=5"><span class="text">无门槛</span></span>
          <span class="icon"  v-show="value==5"></span>
        </div>
      </div>
      <!-- 满35-10 -->
      <div class="coupon2" :class="{cantuse: cantUse(35)}" @click="itemClick(10)" v-if="coupon.c10.number>0">
        <span class="value"><span>&yen;&nbsp;</span>10</span>
        <div class="msg">
          <span class="icon2" v-if="!cantUse(35)" v-show="value!=10"><span class="text">已满{{coupon.c10.attain}}</span></span>
          <span class="icon2" v-else><span class="text">满{{coupon.c10.attain}}可用</span></span>
          <span class="icon"  v-show="value==10"></span>
        </div>
      </div>
      <!-- 满98-20 -->
      <div class="coupon2" :class="{cantuse: cantUse(98)}" @click="itemClick(20)" v-if="coupon.c20.number>0">
        <span class="value"><span>&yen;&nbsp;</span>20</span>
        <div class="msg">
          <!-- 已满可选 -->
          <span class="icon2" v-if="!cantUse(98)" v-show="value!=20"><span class="text">已满{{coupon.c20.attain}}</span></span>
          <!-- 未满不可选 -->
          <span class="icon2" v-else><span class="text">满{{coupon.c20.attain}}可用</span></span>
          <!-- 选中状态0 -->
          <span class="icon"  v-show="value==20"></span>
        </div>
      </div>
      <!-- 没有优惠券 -->
      <div class="coupon0" v-if="coupon.c1.number<1&&coupon.c2.number<1&&coupon.c5.number<1&&coupon.c10.number<1&&coupon.c20.number<1">
        <span class="alert">暂无可用优惠券</span>
      </div>
    </div>
  </div>
</template>

<script>
// import {getCoupon} from 'network/confirm'
import { getCoupon } from 'network/common'
export default {
  name: 'Coupon',
  data() {
    return {
      coupon: null,
      value: null
    }
  },
  props: {
    originalP: {
      type: Number,
      default: 0
    }
  },
  methods: {
    itemClick(index) {
      if(this.originalP >= this.coupon['c'+index].attain) {
        this.value = index
        this.$emit('couponUse', index)
      }else {
        this.$toast.show('满'+this.coupon['c'+index].attain+'元可用')
      }
    },
    cantUse(attain) {
      if(this.originalP < attain) {
        return true
      }else {
        return false
      }
    }
  },
  created(){
    getCoupon().then(ret => {
      this.coupon = ret.data
    })
  }
}
</script>

<style scoped>
  .coupon {
    margin: 10px;
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
  }
  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    border-bottom: 1px solid #f3f3f3;
    font-weight: 600;
    font-size: 16px;
  }
  .content {
    margin: 10px;
  }

  .coupon1,
  .coupon2,
  .coupon0{
    width: 100%;
    height: 90px;
    float: left;
    position: relative;
  }
  .coupon1 {
    background: url(~assets/images/coupon1.png);
    background-size: cover;
  }
  .coupon2 {
    background: url(~assets/images/coupon2.png);
    background-size: cover;
  }
  .coupon0 {
    background: url(~assets/images/coupon0.png);
    background-size: cover;
  }
  .cantuse {
    filter: grayscale(1);
  }
  .msg {
    width: 92px;
    height: 88px;
    position: absolute;
    right: 0;
    top: 0;
  }
  .text {
    position: absolute;
    bottom: -30px;
    left: 50%;
    white-space: nowrap;
    font-size: 12px;
    line-height: 20px;
    transform: translate3d(-50%, -50%, 0);
    color: #333;
  }
  .icon,
  .icon2 {
    font-family: 'icomoon';
    font-size: 26px;
    color: #333;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .icon {
    color: #27ae60;
  }
  .icon2 {
    top: 40%;
  }
  .value {
    font-size: 28px;
    color: #eb2f06;
    position: absolute;
    top: 28px;
    right: 100px;
  }
  .value>span {
    font-size: 20px;
  }
  .alert {
    font-size: 16px;
    color: #333;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>