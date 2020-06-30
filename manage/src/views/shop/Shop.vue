<template>
  <div id="shop">
    <scroll class="content">
      <shop-food-list v-for="item in foods" :key="item.tittle" :foodList="item"></shop-food-list>
    </scroll>
    <staff-cart :cartList="cartList" :shopId="shopId"></staff-cart>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import StaffCart from './childComps/cart/StaffCart'
import ShopFoodList from './childComps/food/ShopFoodList'

import {getFood} from 'network/food'

export default {
  name: 'Shop',
  components: {
    Scroll,
    StaffCart,
    ShopFoodList
  },
  data() {
    return {
      shopId: null,
      foods: [],
      cartList: []
    }
  },
  methods: {
     // 加入购物车、加数量
    addCart(payload) {
      let flag = true
      this.cartList.forEach((el, index) => {
        if(el.iid == payload.iid) { //存在同样商品数量+1
          el.count++
          this.cartList.splice(index, 1, el)
          flag = false
          // break
        }
      })
      if(flag) { //没有同样商品，加入购物车
        payload.count = 1
        this.cartList.push(payload)
      }
    },
    // 减少数量、移除
    reduceCart(payload) {
      this.cartList.forEach((el, index) => {
        if(el.iid == payload.iid) {
          if(el.count > 1) {
            el.count--
          this.cartList.splice(index, 1, el)
          }else {
            this.cartList.splice(index, 1)
          }
        }
      })
    },
    updateCart() { //购物车发生变化，更新到本地
      let cart = JSON.stringify(this.cartList)
      localStorage.setItem("staffCart", cart)
    }
  },
  created() {
    this.shopId = this.$route.params.shopId
    getFood(this.shopId).then(res => {
      this.foods = res.data
    })
  },
  mounted() {
    this.$bus.$on('increasement', food => {
      this.addCart(food)
      // this.updateCart()
    })
    this.$bus.$on('decreasement', food => {
      this.reduceCart(food)
      // this.updateCart()
    })
  },
  destroyed() {
    this.$bus.$off('increasement')
    this.$bus.$off('decreasement')
  }
}
</script>

<style scoped>
#shop {
  height: 100%;
  width: 100%;
  /* background-color: pink; */
  position: relative;
  border-radius: 46px;
  overflow: hidden;
}
.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 500px;
  bottom: 0;
}
</style>