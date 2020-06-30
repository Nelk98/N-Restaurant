<template>
  <div class="shopcart-bar">
    <overlay :isShow="show" @touchstart.native="close"></overlay>
    <div class="container"  @touchmove.prevent>
      <div class="blur"></div>
      <div class="circle1"></div>
      <div class="shopcart" @click="cartClick">
        <div class="shopcart-icon" :class="{gray: cartList.length==0}">
          <img ref="gif" :src="gif">
        </div>
        <div class="total">{{totalPrice()}}</div>
        <div class="tip">结算时可享9.5折优惠</div>
      </div>
      <div class="buy" @click="orderClick">去结算</div>
      <div class="circle2"></div>
    </div>
    <shopcart-list :cartList="cartList" :show="show" @empty="empty"></shopcart-list>
  </div>
</template>

<script>
import ShopcartList from './ShopcartList'
import Overlay from 'components/common/overlay/Overlay'

export default {
  name: 'ShopcartBar',
  components: {
    ShopcartList,
    Overlay
  },
  data() {
    return {
      isToggle: true,
      isGray: true,
      gif: '/public/images/static/shopcart.gif',
      show: false
    }
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return {}
      }
    }
  },
  methods: {
    orderClick() {
      if(this.cartList.length){
        console.log(this.cartList)
        this.$router.replace('/confirm/' + this.$route.params.shopId)
      }else {
        this.$toast.show('尚未选择任何物品', 1000)
      }
    },
    play(){       
      this.isGray = false
      this.$refs.gif.setAttribute('src','/public/images/static/shopcart.gif')
    },
    cartClick() {
      if(this.cartList.length) {
        this.show = !this.show
      }else {
        this.$toast.show('购物车为空')
      }
    },
    close() {
      this.show = false
    },
    totalPrice() { //计算总价
      let sum = 0 
      this.cartList.forEach((el)=> {
        sum += el.count * el.price
      })
      return sum == 0? '尚未选择商品':'￥' + sum.toFixed(2)
    },
    empty() {
      this.show = false
    }
  },
  mounted() {
    this.$bus.$on('addCart', () => {
      this.play()
    })
  },
  destroyed() {
    this.$bus.$off('addCart')
  }
}
</script>

<style scoped>
.shopcart-bar {
  height: 49px;
  position: fixed;
  bottom: 10px;
  left: 0;
  right: 0;
  z-index: 99999;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  z-index: 9999;
}
.shopcart {
  flex: 1;
  z-index: 2;
  background-color: #222f3e;
  border-left: 2px solid #eee;
}
.shopcart-icon {
  width:140px;
  height: 100px;
  position: absolute;
  bottom: -10px;
  left: 26px;
  /* z-index: 999; */
  /* background-color: pink; */
  pointer-events: none;
  overflow: hidden;
}
.shopcart-icon img {
  width: 200px;
  transform: translate(-40px, -30px);
  /* 使得点击穿透，防止挡住 */
  pointer-events: none;
}
.gray {
  filter: grayscale(100%);
}
.buy {
  width: 36px;
  background-color: #e55039;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 49px;
  z-index: 2;
  white-space: nowrap;
  padding-left: 10px;
}
.circle1 {
  height: 49px;
  width: 49px;
  background-color:#222f3e;
  border-radius: 50% 0 0 50%;
  position: relative;
  transform: translate(20%, 0);
  /* border-right: 12px solid #fff; */
}
.circle2 {
  height: 49px;
  width: 49px;
  background-color: #e55039;
  border-radius: 0 50% 50% 0;
  position: relative;
  transform: translate(-20%, 0)
}
.blur {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 10px;
  background: linear-gradient(to top,rgba(255,255,255,0.6),rgba(255,255,255,0));
}
.total {
  margin: 6px 0 6px 66px;
  font-size: 16px;
  color: #fff;
}
.tip {
  margin-left: 66px;
  font-size: 12px;
  color: #ddd;
}
</style>