<template>
  <div class="food-item" :class="{done: food.done}">
    <img :src="food.img" class="img">
    <span class="name">{{food.name}}</span>
    <span class="num"><span style="fontSize: 14px">&times;&nbsp;</span>{{food.count}}</span>
    <span class="check-on" v-if="isDoing && !food.done" @click="checkToogle(true)">&#xe6d5;</span>
    <span class="check-off" v-if="isDoing && food.done" @click="checkToogle(false)">&#xe6d4;</span>
  </div>
</template>

<script>
import {foodDone} from 'network/order'
export default {
  name: 'FoodItem',
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    },
    isDoing: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    checkToogle(state){
      this.food.done = state
      this.$bus.$emit('foodDone')
      foodDone(this.food.orderId, this.food.iid, state).then(res => {
        if(res.code == -1) {
          this.food.done = !state //更新失败了
        }
        this.$emit('checkDone')
      })
    }
  }
}
</script>

<style scoped>
.food-item {
  width: 320px;
  height: 80px;
  margin: 5px;
  float: left;
  position: relative;
  background-color: #b8e994;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.08);
  box-sizing: content-box;
}
img.img {
  width: 80px;
  height: 80px;
  position: relative;
}
span.name {
  position: absolute;
  width: 180px;
  top: 10px;
  left: 90px;
  font-size: 16px;
  font-weight: 600;
}
span.num {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 22px;
}
.more {
  color: red;
}
.done {
  background-color: #fff;
  box-shadow: none;
}
.check-on,
.check-off {
  position: absolute;
  top: 5px;
  right: 5px;
  display: none;
  cursor: pointer;
  font-family: 'iconfont';
  font-size: 30px;
}
.check-on {
  color: #000;
}
.check-off {
  color: #aaa;
}
.food-item:hover .check-on,
.food-item:hover .check-off {
  display: block;
}
.demand {
  margin: 0;
  border: 5px solid red;
}
</style>