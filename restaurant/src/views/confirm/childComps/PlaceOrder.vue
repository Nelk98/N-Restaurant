<template>
  <div class="place-order">
    <div class="circle1"></div>
    <div class="desc">
      <span class="price"><span style="fontSize: 16px">&yen;&nbsp;</span>{{price}}</span>
      <div class="discount">已优惠<span style="fontSize: 12px">&nbsp;&yen;&nbsp;</span>{{discount}}</div>
      <span class="text">已享线上点餐9.5折</span>
    </div>
    <div class="order" @click="orderClick">提交订单</div>
    <div class="circle2" @click="orderClick"></div>
  </div>
</template>

<script>
export default {
  name: 'PlaceOrder',
  props: {
    originalP: {
      type: Number,
      default: 0
    },
    coupon: {
      type: Number,
      default: 0
    },
    packP: {
      type: Number,
      default: 0
    },
    isShop: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    price() {
      let p = 0
      p = Math.round((this.originalP * 0.95 - this.coupon)*100)/100
      p = p < 0 ? 0 : p
      return p
    },
    discount() {
      let p = Math.round((this.originalP - Math.round((this.originalP * 0.95 - this.coupon)*100)/100)*100)/100  
      return p
    }
  },
  methods: {
    orderClick() {
      this.$emit('pay')
    }
  }
  
}
</script>

<style scoped>
  .place-order {
    height: 49px;
    width: 100%;
    position: fixed;
    bottom: 10px;
    display: flex;
  }
  .desc {
    flex: 1;
    background-color: #222f3e;
    z-index: 2;
    position: relative;
  }
  .order {
    width: 36px;
    background-color: #e55039;
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 49px;
    z-index: 2;
    white-space: nowrap;
    padding-left: 8px;
  }
  .circle1 {
  height: 49px;
  width: 49px;
  background-color:#222f3e;
  border-radius: 50% 0 0 50%;
  position: relative;
  transform: translate(20%, 0);
}
.circle2 {
  height: 49px;
  width: 49px;
  background-color: #e55039;
  border-radius: 0 50% 50% 0;
  position: relative;
  transform: translate(-20%, 0)
}
.price {
  font-size: 26px;
  color: #fff;
  line-height: 49px;
}
.discount {
  font-size: 16px;
  color: #fff;
  position: absolute;
  top: 10px;
  right: 10px;
}
.text {
  font-size: 12px;
  line-height: 12px;
  color: #aaa;
  position: absolute;
  bottom: 4px;
  right: 10px;
}
</style>