<template>
  <div class="shop-food-item" :class="{green: count>0}">
    <div class="silk" v-if="food.tags.tw"></div>
    <img :src="food.img" class="img">
    <span class="name">{{food.name}}</span>
    <span class="price"><span style="fontSize: 12px">&yen;</span>{{food.price}}</span>
    <div class="op" v-if="food.onsale">
      <span class="decreasement"  :class="{hide: count<1}" @click="decreasement">&#xe768;</span>
      <span class="count" :class="{hide: count<1}">{{count}}</span>
      <span class="increasement" @click="increasement">&#xe767;</span>
    </div>
    <div class="sold-out" v-else></div>
    <div class="tags">
      <span class="tag" v-if="food.tags.cold" :style="{backgroundColor: color[0]}">冰</span>
      <span class="tag" v-if="food.tags.hot" :style="{backgroundColor: color[1]}">辣</span>
      <span class="tag" v-if="food.tags.sour" :style="{backgroundColor: color[2]}">酸</span>
      <span class="tag" v-if="food.tags.sweet" :style="{backgroundColor: color[3]}">甜</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopFoodItem',
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      count: 0,
      color: ['#00a8ff', '#eb2f06', '#f6b93b', '#78e08f']
    }
  },
  methods: {
    increasement() {
      this.count++
      this.$bus.$emit('increasement',this.food)
    },
    decreasement() {
      this.count--
      this.$bus.$emit('decreasement',this.food)
    }
  },
  mounted() {
    this.$bus.$on('successOrder', () => {
      this.count = 0
    })
  },
  destroyed() {
    this.$bus.$off('successOrder')
  }
}
</script>

<style scoped>
.shop-food-item {
  width: 268px;
  height: 120px;
  float: left;
  margin: 10px;
  box-sizing: content-box;
  background-color: #fff;
  box-shadow: 2px 2px 5px rgba(51, 51, 51, 0.1);
  position: relative;
  overflow: hidden;
}
div.green {
  background-color: #b8e994;
}
img.img {
  width: 90px;
  height: 90px;
  margin-left: 10px;
}
span.name {
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: 600;
  position: absolute;
  top: 20px;
  left: 110px;
}
.price {
  position: absolute;
  bottom: 13px;
  left: 110px;
  font-size: 20px;
  color: #0a3d62;
}
.increasement,
.decreasement {
  font-family: 'iconfont';
  background-color: #f3f3f3;
  border-radius: 4px;
  cursor: pointer;
}
.op {
  width: 90px;
  display: flex;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.increasement,
.count,
.decreasement {
  flex: 1;
  line-height: 30px;
  text-align: center;
}
.hide {
  visibility: hidden;
}
.tags {
  position: absolute;
  left: 10px;
  bottom: 10px;
  width: 89px;
  height: 23px;
}
span.tag {
  float: left;
  width: 18px;
  height: 18px;
  margin: 2px;
  border-radius: 3px;
  line-height: 18px;
  text-align: center;
  font-size: 12px;
  color: #fff;
}
.silk {
  width: 50px;
  height: 50px;
  background: url(~assets/img/silk.png);
  background-size: 50px 50px;
  position: absolute;
  top: -2px;
  left: -3px;
}
.sold-out {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(235, 48, 6, 0.659);
  color: #fff;
  z-index: 999;
}
.sold-out::after {
  content: '售 罄';
  font-size: 40px;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
</style>