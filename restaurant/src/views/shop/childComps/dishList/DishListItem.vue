<template>
  <div class="dish-list-item" v-if="food.iid">
    <div class="left">
      <div class="image">
        <img v-lazy="food.img" alt="">
      </div>
      <div class="tags">
        <span class="cold" v-if="food.tags.cold">冰</span>
        <span class="hot" v-if="food.tags.hot">辣</span>
        <span class="sour" v-if="food.tags.sour">酸</span>
        <span class="sweet" v-if="food.tags.sweet">甜</span>
      </div>
    </div>
    <div class="right">
      <div class="info">
        <div class="name">{{food.name}}</div>
        <div class="desc">{{food.desc}}</div>
        <div class="sales">销量：{{food.sold}}</div>
      </div>
      <div class="purchase">
        <div class="price">￥{{food.price.toFixed(2)}}</div>
        <div class="choose" v-if="food.onsale">
          <span class="decreasement" v-show="count>0" @click="decreasement"></span>
          <span class="count" v-show="count>0">{{count}}</span>
          <span class="increasement" @click="increasement"></span>
        </div>
        <span class="soldout" v-else>售罄</span>
      </div>
    </div>
    <div class="tw" v-if="food.tags.tw"></div>
  </div>
</template>

<script>
export default {
  name: 'DishListItem',
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
      count: 0
    }
  },
  methods: {
    getNum() {
      return localStorage.getItem()
    },
    increasement() {
      this.count++
      this.$bus.$emit('addCart', this.food)

      // this.$store.dispatch('addCart', this.food).then(res=> {
      //   this.$toast.show(res)
      //   console.log(this.$store.state.cartList)
      // })

    },
    decreasement() {
      if(this.count>0) {
        this.count--
        this.$bus.$emit('reduceCart', this.food)
        // this.$store.dispatch('reduceCart', this.food).then(res => {
        //   this.$toast.show(res)
        //   console.log(this.$store.state.cartList)
        // })
      }

    }
  }
}
</script>

<style scoped>
.dish-list-item {
  width: 100%;
  height: 132px;
  padding: 8px;
  background-color: #fff;
  position: relative;
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  display: flex;
} 

.left {
  width: 88px;
  height: 100%;
  margin-right: 8px;
}
.image {
  width: 88px;
  height: 88px;
  /* background-color: #f3f3f3; */
  border-radius: 4px;
  overflow: hidden;
}
.image img {
  width: 100%;
  height: 100%;
}
.tags {
  width: 100%;
  height: 20px;
  /* background-color: #f0f0f0; */
  margin-top: 8px;
  position: relative;
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
.right {
  flex: 1;
  height: 100%;
  position: relative;
  z-index: 2;
}
.info {
  width: 100%;
  height: 80px;
  /* background-color: #f0f0f0; */
  margin-bottom: 8px;
}

.name {
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

}
.desc {
  max-width: 175px;
  font-size: 12px;
  color: #aaa;
  margin: 6px 0;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.sales {
  width: 100%;
  font-size: 12px;
  color: #aaa;
}

.purchase {
  width: 100%;
  height: 28px;
  position: relative;
  /* background-color: #f0f0f0; */
}
.price {
  position: absolute;
  left: 0;
  bottom: 0;
  color: #eb2f06;
  font-size: 16px;
}
.choose {
  font-family: 'icomoon';
  height: 100%;
  position: absolute;
  right: 0;
}
.count {
  line-height: 28px;
  vertical-align: top;
  display: inline-block;
  width: 28px;
  padding: 0 3px;
  text-align: center;
  font-size: 16px;
}
.decreasement,
.increasement {
  font-size: 26px;
}
.soldout {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 16px;
  color: #888;
}
.tw {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -2px;
  left: -2px;
  /* background-color: red; */
  background: url(~assets/images/silk.png);
  background-size: cover;
}
</style>