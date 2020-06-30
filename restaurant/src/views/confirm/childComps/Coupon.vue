<template>
  <div class="coupon">
    <div class="title">优惠券
      <span style="float: right; color: #eb2f06; fontSize: 12px" v-if="value">已选择 {{value}} 元优惠券 </span>
      <span style="float: right; fontSize: 12px" v-else>尚未选择优惠券</span>
      </div>
    <div class="content clear-fix" v-if="coupon">

      <!-- coupon-item 开始 -->
      <div :class="item.attain==0?'coupon1':'coupon2'" v-for="item in coupon" :key="item.iid" @click="itemClick(item.iid, item.attain, item.value)">
        <span class="value"><span>&yen;&nbsp;</span>{{item.value}}</span>
        <!-- 无门槛 -->
        <div class="msg" v-if="item.attain == 0">
          <span class="icon2" v-if="couponIID != item.iid"><span class="text">无门槛</span></span>
          <span class="icon"  v-else></span>
        </div>
        <!-- 满减 -->
        <div class="msg" v-else>
          <!-- 已满可选 （ 未选择 && 达到满减金额 ）-->
          <span class="icon2" v-if="!cantUse(item.attain) && couponIID != item.iid"><span class="text">已满{{item.attain}}</span></span>
          <!-- 未满不可选 （ 未达满减金额 ）-->
          <span class="icon2" v-else-if="cantUse(item.attain)"><span class="text">满{{item.attain}}可用</span></span>
          <!-- 选中状态0 （ 选中 && 达到满减金额 ） -->
          <span class="icon" v-if="!cantUse(item.attain) && couponIID == item.iid"></span>
        </div>
      </div>
      <!-- coupon-item 结束 -->

      <!-- 没有优惠券 -->
      <div class="coupon0" v-if="coupon.length <= 0">
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
      couponIID: null,
      value: 0
    }
  },
  props: {
    originalP: {
      type: Number,
      default: 0
    }
  },
  methods: {
    itemClick(iid, attain, value) {
      if(this.originalP >= attain) {
        this.couponIID = iid
        this.value = value
        this.$emit('couponUse', {
          iid: iid,
          value: value
        })
      }else {
        this.$toast.show(`满${attain}元可使用`)
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
    getCoupon().then(res => {
      this.coupon = res.data
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