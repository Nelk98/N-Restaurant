<template>
  <div class="dish-list" v-if="cartList">
    <div class="title">清单</div>
    <dish-list-item v-for="item in cartList" :key="item.iid" :info="item"></dish-list-item>
  </div>
</template>

<script>
import DishListItem from './DishListItem'
export default {
  name: 'DishList',
  components: {
    DishListItem
  },
  props: {
    cartList: {
      type: Array,
      default: null
    }
  }
}
</script>

<style scoped>
.dish-list {
  margin: 10px;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;
}
.title {
  height: 50px;
  border-bottom: 1px solid #eee;
  line-height: 50px;
  font-weight: 700;
  padding: 0 10px;
  font-size: 16px;
}
</style>