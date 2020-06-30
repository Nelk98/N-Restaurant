<template>
  <div class="cart-item" v-if="info">
    <img :src="info.img" alt="" class="img">
    <span class="name">{{info.name}}</span>
    <span class="unit-price">{{info.price}}<span style="fontSize: 14px">&nbsp;/&nbsp;份</span></span>
    <span class="count" v-if="reset">&times;&nbsp;{{info.count}}</span>
    <span class="price"><span style="fontSize: 16px">&yen;&nbsp;</span>{{getPrice()}}</span>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    info: {
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
  data() {
    return {
   
    }
  },
  methods: {
    getPrice() {
      return this.info.price * this.info.count
    }
  }
}
</script>

<style scoped>
  .cart-item {
    height: 120px;
    margin: 10px;
    background-color: #fff;
    box-shadow: 0px 0px 6px rgba(51, 51, 51, 0.2);
    position: relative;
  }
  img.img {
    width: 120px;
    height: 120px;
    margin-left: 20px;
  }
  span.name {
    font-size: 20px;
    position: absolute;
    top: 20px;
    left: 140px;
    font-weight: 600;
  }
  span.unit-price {
    font-size: 20px;
    color: #888;
    position: absolute;
    left: 140px;
    bottom: 20px;
  }
  span.count {
    font-size: 20px;
    font-weight: 600;
    position: absolute;
    bottom: 20px;
    left: 250px;
    color: #eb2f06;
  }
  span.price {
    font-size: 24px;
    position: absolute;
    right: 20px;
    bottom: 20px;
    color: #eb2f06;
  }
</style>