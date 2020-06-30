<template>
    <div class="shopcart-list" :class="{up: show}">
      <div class="tip">购物车</div>
      <scroll ref="scroll" class="content">
          <div class="container">
            <div class="placeholder"></div>
            <shopcart-item v-for="item in cartList" :reset="reset" :food="item" :key="item.iid"></shopcart-item>
            <div class="placeholder"></div>
          </div>
      </scroll>
    </div>
</template>

<script>
import ShopcartItem from './ShopcartItem'
import Scroll from 'components/common/scroll/Scroll'
export default {
  name: 'ShopcartList',
  components: {
    Scroll,
    ShopcartItem
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    cartList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      reset: true
    }
  },
  watch: {
    cartList() {
      this.reset = false;
      this.$nextTick().then(()=>{
        this.reset = true
      })
      if(this.cartList.length == 0) {
        this.$emit('empty')
      }
    }
  }
}
</script>

<style scoped>
.shopcart-list {
  width: 100%;
  height: 360px;
  background-color: #fff;
  position: absolute;
  top: 59px;
  transition: transform .3s linear;
  margin-top: 10px;
  padding-bottom: 80px;
  border-radius: 20px 20px 0 0;
}
.up {
  transform:  translate(0, -100%)
}
.content {
  height: 250px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2) inset;
  padding: 10px;
}
.tip {
  width: 100%;
  height: 38px;
  border-radius: 10px 20px 0 0;
  padding:0 10px;
  line-height: 38px;
  text-align: center;
}
.placeholder {
  width: 100%;
  height: 20px;
}
</style>