<template>
  <div class="shopcart-item">
    <div class="left">
      <div class="img">
        <img :src="food.img">
      </div>
    </div>
    <div class="right">
      <div class="name">{{food.name}}</div>  
      <div class="desc">{{food.desc}}</div>
      <div class="price">￥{{food.price.toFixed(2)}}</div>
      <div class="choose">
        <div class="decreasement" @click="decreasement"></div>
        <div class="count" v-if="reset">{{food.count}}</div>
        <div class="increasement" @click="increasement"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopcartItem',
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    },
    reset: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    increasement() {
      this.$bus.$emit('cartIn', this.food.iid)
    },
    decreasement() {
      this.$bus.$emit('cartDe', this.food.iid)
    }
  }
}
</script>

<style scoped>
.shopcart-item {
  width: 100%;
  height: 108px;
  background-color: #fff;
  display: flex;
  padding-bottom: 20px;
  padding-right: 10px;
  position: relative;
}
.right:after {
  content: '';
  width: 100%;
  height: 0;
  border-bottom: 1px solid #eee;
  position: absolute;
  bottom: -10px;
  left: 0;
}
.left {
  height: 88px;
  width: 88px;
  padding: 10px;
}
.img {
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
  border-radius: 3px;
  overflow: hidden;
}
.img img {
  width: 100%;
  height: 100%;
}
.right {
  flex: 1;
  height: 100%;
  margin-left: 10px;
  position: relative;
  width: 0;
}
.name {
  font-size: 18px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.desc {
  width: 100%;
  font-size: 12px;
  color: #aaa;
  margin: 6px 0;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.price {
  font-size: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #eb2f06;
}
.choose {
  height: 28px;
  position: absolute;
  bottom: 0;
  right: 0;
}
.decreasement,
.increasement {
  font-family: 'icomoon';
  display: inline-block;
  font-size: 26px;
}
.count {
  width: 28px;
  height: 28px;
  padding: 0 3px;
  text-align: center;
  line-height: 28px;
  font-size: 16px;
  vertical-align: bottom;
  display: inline-block;
}
 
</style>