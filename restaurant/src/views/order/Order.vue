<template>
  <div id="order">
    <scroll class="content" top="1" bottom="50" ref="scroll" 
    :isPullDown="true" @pullingDown="pullingDown" :isPullUp="true" @pullingUp="pullingUp">
      <div class="ignore-pull-down1" ref="pull" v-show="pullFlag">下拉更新</div>
      <div class="ignore-pull-down2" ref="pull" v-show="!pullFlag">
        <span class="ball1"></span>
        <span class="ball2"></span>
        <span class="ball3"></span>
      </div>
      <order-item v-for="item in orderList" :key="item.orderId" :orderInfo="item"></order-item>
      <div class="block"></div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import OrderItem from './childComps/OrderItem'
import {getOrder} from 'network/order'
export default {
  name: 'Order',
  components: {
    Scroll,
    OrderItem
  },
  data() {
    return {
      orderList: [],
      pullFlag: true,
      page: 0
    }
  },
  created() {
    getOrder(0, 8).then(ret => {
      this.orderList = this.orderList.concat(ret.data)
    })
  },
  // activated() {
  //   this.$refs.scroll.refresh()
  // },
  methods: {
    pullingDown() {
      this.pullFlag = false
      getOrder(0, 8).then(ret => {
        this.page = 0
        this.orderList = []
        this.orderList = this.orderList.concat(ret.data)
        setTimeout(() => {
          this.$notify.success('刷新成功~')
          this.$refs.scroll.finishPullDown()
          this.$refs.scroll.refresh()
          this.pullFlag = true
        }, 2400);
      })
    },
    pullingUp() {
      console.log('????')
      this.$refs.scroll.finishPullUp()
      let page = this.page + 1
      getOrder(page, 8).then(res => {
        if(res.data.length < 8){
          return this.$notify.error('没有更多数据了~')
        }
        this.orderList.push(...res.data)
        this.$refs.scroll.refresh()
        this.page++
      })
    }
  }
}
</script>

<style scoped>
.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 49px;
}
#order {
  height: 100vh;
  width: 100vw;
  position: relative;
}
.block {
  height: 88px;
}
.ignore-pull-down1,
.ignore-pull-down2 {
  height: 80px;
  width: 100vw;
  text-align: center;
  position: absolute;
  top: -80px;
  line-height: 80px;
}
.ignore-pull-down2 {
  line-height: 120px;
}
.loading {
  width: 60px;
  height: 20px;
  background-color: pink;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  display: flex;
}
.ball1,
.ball2,
.ball3 {
  width: 10px;
  height: 10px;
  background-color: #4fc08d;
  border-radius: 50%;
  position: absolute;
  bottom: 10px;
}
.ball1 {
  right: calc(50% + 15px);
}
.ball2 {
  left: calc(50% - 5px);
}
.ball3 {
  left: calc(50% + 15px);
}
.ball1 {
  animation: loading 1.2s linear infinite;
}
.ball2 {
  animation: loading 1.2s 0.4s linear infinite;
}
.ball3 {
  animation: loading 1.2s 0.8s linear infinite;
}
@keyframes loading {
  16.667% {
    transform: scale(2);
  }
  33.333% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>