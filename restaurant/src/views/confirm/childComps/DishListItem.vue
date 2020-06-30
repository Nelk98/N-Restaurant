<template>
  <div class="dish-list-item" v-if="info">
    <div class="img">
      <img :src="info.img">
    </div>
    <div class="name">{{info.name}}</div>
    <div class="count">&times;&nbsp;{{info.count}}</div>
    <div class="price"><span>&yen; </span>{{price}}</div>
    <div class="tags">
      <span class="cold" v-if="info.tags.cold">冰</span>
      <span class="hot"  v-if="info.tags.hot">辣</span>
      <span class="sour"  v-if="info.tags.sour">酸</span>
      <span class="sweet"  v-if="info.tags.sweet">甜</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DishListItem',
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  computed: {
    price() {
      return Math.round(this.info.count * this.info.price * 100) / 100
    }
  }
}
</script>

<style scoped>
  .dish-list-item {
    width: 100%;
    height: 80px;
    background-color: #fff;
    border-bottom: 2px dashed #eee;
    position: relative;
  }
  .dish-list-item:last-child {
    border-bottom: 0;
  }
  .img {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 9px;
    left: 10px;
  }
  .img img {
    width: 100%;
    height: 100%;
  }
  .name {
    width: 180px;
    position: absolute;
    left: 80px;
    top: 9px;
    font-size: 16px;
    font-weight: 600;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .count {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #999;
    font-size: 16px;
  }
  .price {
    position: absolute;
    top: 9px;
    right: 10px;
    font-size: 18px;
    white-space: nowrap;
  }
  .price>span {
    font-size: 12px;
  }
  .tags {
  width: 100%;
  height: 20px;
  /* background-color: #f0f0f0; */
  margin-top: 8px;
  position: absolute;
  bottom: 10px;
  left: 80px;
}

.hot,
.cold,
.sour,
.sweet {
  font-size: 10px;
  padding: 2px 3px;
  border-radius: 2px;
  opacity: 0.8;
  color: #fff;
  float: left;
  margin-top: 3px;
  margin-right: 4px;
}
.hot {
  background-color: #eb2f06;
}
.cold {
  background-color: #1989fa;
}
.sour {
  background-color: #fed330;
}
.sweet {
  background-color: #78e08f;
  margin-right: 0;
}
</style>