<template>
  <div class="dish-list" v-if="foodList">
    <div class="dish-content" v-for="(item,index) in foodList" :key="item.title">
      <dish-list-title :ref="'cate'+index" :category="item.title"></dish-list-title>
      <dish-list-item v-for="food in item.list" :food="food" :key="food.iid" :ref="food.iid"></dish-list-item>
    </div>
  </div>
</template>

<script>
import DishListItem from './DishListItem'
import DishListTitle from './DishListTitle'
export default {
  name: 'DishList',
  components: {
    DishListItem,
    DishListTitle
  },
  props: {
    foodList: {
      type: Array,
      default() {
        return []
      }
    },
    cart: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    // 监听购物车的加减，本质是调用商品列表的加减函数
    this.$bus.$on('cartIn', iid => {
      this.$refs[iid][0].increasement()
    })

    this.$bus.$on('cartDe', iid => {
      this.$refs[iid][0].decreasement()
    })
  },
  updated() {
    //将本地存储关于本店的购物车商品数量同步
    this.$nextTick(() => {
      this.cart.forEach(el => {
        this.$refs[el.iid][0].count = el.count
      })
    })
  },
  destroyed() {
    this.$bus.$off('cartIn')
    this.$bus.$off('cartDe')
  }
}
</script>

<style scoped>
.dish-list {
  padding-left: 68px;
  padding-bottom: 100px;
  background-color: #f0f0f0;
}
.dish-content {
  padding: 10px;
}
</style>