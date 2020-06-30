<template>
  <div class="shop-food-list clear-fix" v-if="foodList">
    <div class="title">{{foodList.title}}</div>
    <shop-food-item v-for="item in foodList.list" :key="item.iid" :food="item"></shop-food-item>
  </div>
</template>

<script>
import ShopFoodItem from './ShopFoodItem'
export default {
  name: 'ShopFoodList',
  components: {
    ShopFoodItem
  },
  props: {
    foodList: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.shop-food-list {
  width: 1192px;
  padding: 20px;
}
.title {
  width: 100%;
  height: 88px;
  color: #eb2f06;
  line-height: 88px;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
}
</style>