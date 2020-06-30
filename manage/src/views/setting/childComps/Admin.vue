<template>
  <scroll id="admin">
    <div class="block"></div>
    <span class="module-title">优惠券管理</span>
    <admin-coupon :coupon="coupon"/>
    <span class="module-title">轮播图管理</span>
    <admin-swiper/>
    <span class="module-title">门店管理</span>
    <admin-swiper/>
  </scroll>
</template>

<script>
import {getCouponMaster} from 'network/common'
import Scroll from 'components/common/scroll/Scroll'
import AdminCoupon from './AdminCoupon'
import AdminSwiper from './AdminSwiper'
export default {
  name: 'Admin',
  components: {
    Scroll,
    AdminCoupon,
    AdminSwiper
  },
  data() {
    return {
      coupon: null
    }
  },
  methods: {
    getCoupon() {
      getCouponMaster().then(res => {
        this.coupon = res.data
      })
    }
  },
  created() {
    //获取优惠券设置
    this.getCoupon()
  }
}
</script>

<style scoped>
#admin {
  width: 100%;
  height: 100%;
}
.block {
  height: 1px;
}
span.module-title {
  display: block;
  padding: 0 20px;
  margin-top: 30px;
  font-size: 24px;
  color: #eb2f06;
  font-weight: 600;
}
</style>