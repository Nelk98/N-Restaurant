<template>
  <div class="details-item">
    <img class="img" v-lazy="food.img">
    <span class="name">{{food.name}}</span>
    <span class="price"><span style="fontSize: 12px">&yen;&nbsp;</span>{{food.price}}</span>
    <span class="count">&times;&nbsp;{{food.count}}</span>
  </div>
</template>

<script>
export default {
  name: 'DetailsItem',
  props: {
    food: {
      type: Object,
      default() {
        return {
          img: '',
          name: '',
          price: '',
          count: ''
        }
      }
    }
  }
}
</script>

<style scoped>
  .details-item {
    height: 70px;
    position: relative;
    margin: 0 20px;
    border-bottom: 1px dashed #ddd
  }
  .img {
    width: 50px;
    height: 50px;
    background-color: #f3f3f3;
    position: absolute;
    top: 5px;
    left: 0;
  }
  .name {
    position: absolute;
    top: 10px;
    left: 60px;
    width: 150px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
    font-weight: 500;
  }
  .price {
    position: absolute;
    top: 10px;
    right: 0;
  }
  .count {
    position: absolute;
    bottom: 10px;
    right: 0;
    color: #888;
  }
</style>