<template>
  <div class="dish-list-title">
    {{category}}
  </div>
</template>

<script>
export default {
  name: 'DishListTitle',
  props: {
    category: {
      type: String,
      default: '分类'
    }
  }
}
</script>

<style scoped>
  .dish-list-title {
    height: 60px;
    /* background-color: #fff; */
    margin-bottom: 10px;
    line-height: 60px;
    font-size: 22px;
    font-weight: 700;
    color: #eb2f06;
  }
</style>