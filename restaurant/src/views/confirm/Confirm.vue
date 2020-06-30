<template>
  <div id="confirm">
    <div class="bgc"></div>
    <confirm-nav-bar></confirm-nav-bar>
    <scroll class="content" ref="scroll" top="20" bottom="80">
      <!-- 切换 -->
      <way-tab @packChange="packChange" @shopTake="shopTake" @tableChoose="tableChoose"></way-tab>
      <!-- 清单 -->
      <dish-list :cartList="cartList"></dish-list>
      <!-- 备注 -->
      <remark @remarkUse="remarkUse"></remark>
      <!-- 优惠券 -->
      <coupon @couponUse="couponUse" :originalP="originalP"></coupon>
    </scroll>
    <place-order :originalP="originalP" 
    :coupon="coupon" :packP="packCount*0.8"
    :isShop="isShop" @pay="pay"></place-order>
  </div>
</template>

<script>
import ConfirmNavBar from './childComps/ConfirmNavBar'
import Scroll from 'components/common/scroll/Scroll'
import WayTab from './childComps/WayTab'
import DishList from './childComps/DishList'
import Coupon from './childComps/Coupon'
import PlaceOrder from './childComps/PlaceOrder'
import Remark from './childComps/Remark'

import {placeOrder} from 'network/confirm'

export default {
  name: 'Confirm',
  components: {
    ConfirmNavBar,
    Scroll,
    WayTab,
    DishList,
    Coupon,
    PlaceOrder,
    Remark
  },
  data() {
    return {
      shopId: null,
      cartList: null,
      originalP: 0,
      coupon: 0,
      couponIID: null,
      packCount: 0,
      isShop: true,
      table: null,
      remark: '',
      flag: true
    }
  },
  methods: { 
    couponUse(payload) {
      console.log(payload)
      this.coupon = payload.value
      this.couponIID = payload.iid
    },
    packChange(count) {
      this.packCount = count
    },
    shopTake(flag) {
      this.isShop = flag
    },
    tableChoose(table) {
      this.table = table
    },
    remarkUse(remark) {
      this.remark = remark
    },
    pay(){
      // 有桌号 || 打包带走
      if(this.table || !this.isShop) {
        this.$dialog.confirm({
          message: '您确认下单吗？'
        }).then(() => {
          if(this.flag){ //节流阀
            let list = {idList:[]}
              this.cartList.forEach(el => {
                list.idList.push (el.iid)
                list[el.iid] = el.count
              })
              this.$toast.loading()
              let options = {
                shopId: this.shopId,
                list: list,
                table: this.table,
                dishware: this.packCount,
                isHere: this.isShop,
                coupon: this.coupon,
                couponIID: this.couponIID,
                remark: this.remark
              }
              //下单
              placeOrder(options).then(ret => {
                if(ret.errcode == '') {
                  localStorage.removeItem(this.shopId)
                  this.$toast.hide()
                  this.$router.replace('/pay/'+ret.orderId)
                }else {
                  this.$notify.error('系统繁忙，下单失败')
                  this.flag = true
                }
              })
              this.flag = false
          }
        }).catch(() => {})
      }else {
        this.$notify.error('店内用餐，请选择桌号。')
        this.$refs.scroll.scrollTo(0,0)
      }
    }
  },
  created() {
    this.shopId = this.$route.params.shopId
    this.cartList = JSON.parse(localStorage.getItem(this.shopId))
    this.cartList.map(el => {
      this.originalP += el.count * el.price
    })
  }
}
</script>

<style scoped>
#confirm {
  width: 100vw;
  height: 100vh;
  background-color: #f3f3f3;
  overflow: hidden;
}
.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 0;
}
.bgc {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
background-image: linear-gradient(120deg, #bb9e7e 0%, hsl(13, 67%, 90%) 100%);
  /* background-color: #f3f3f3; */
}

</style>