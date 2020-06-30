<template>
  <div class="store">
    <!-- 导航栏 -->
    <nav-bar class="nav">
      <template v-slot:left>
        <div class="back" @click="back"></div>
      </template>
      <template v-slot:center>小林餐厅</template>
    </nav-bar>
    <!-- 隐藏的control-bar -->  
    <control-bar class="control1" ref="control1"  :currentIndex="currentIndex" @toggle="toggle" v-show="isControl"></control-bar>
    <!-- 隐藏的side-bar -->
    <div  v-show="isActive(0)" @touchmove.stop="slide">
      <side-bar v-show="isControl" class="side1" :sideIndex="sideIndex"
       @scroll.native="sideScroll" :cateList="cateList" 
       @sideToggle="sideToggle"></side-bar>
    </div>
    <!-- 滚动内容 -->
    <scroll class="content" ref="scroll" :probe-type="3" @iscroll="contentScroll">
      <div class="header" ref="header">{{shopInfo}}</div>
      <control-bar ref="control2" :currentIndex="currentIndex" @toggle="toggle"></control-bar>
      <!-- 主菜单 -->
      <div class="main" v-show="isActive('0')">
        <side-bar class="side2"  :sideIndex="sideIndex" :cateList="cateList"  @sideToggle="sideToggle"></side-bar>
        <dish-list ref="food" :foodList="foodList" :cart="cartList"></dish-list>
      </div>
      <!-- 评价 -->
      <div class="comment" v-show="isActive('1')">评价页面</div>
      <!-- 商家 -->
      <div class="store-info" v-show="isActive('2')">商家页面</div>
    </scroll>
    <shopcart-bar ref="shopcart" :cartList="cartList"></shopcart-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import ShopcartBar from './childComps/shopcartBar/ShopcartBar' 
import ControlBar from './childComps/controlBar/ControlBar'
import SideBar from './childComps/sideBar/SideBar'
import DishList from './childComps/dishList/DishList'
import ShopcartList from './childComps/shopcartBar/ShopcartList'

import { getFood, getShopInfo} from 'network/shop'

import { debounce } from 'common/utils'

export default {
  name: 'Shop',
  components: {
    NavBar,
    Scroll,
    ShopcartBar,
    ControlBar,
    SideBar,
    DishList,
    ShopcartList
  },
  data() {
    return {
      controlTop: 0,
      isControl: false,
      currentIndex: 0, //controlbar 当前项
      foodList: null, //菜单数据
      cateList: [], //侧边栏类
      sideIndex: 0, //侧边栏当前项
      headerHeight: 0, //头部高度
      slideY: 0, //滑动的 y 轴距离
      allTop: [], //记录每个类标题距离顶部高度
      slideFlag: true,
      cartList: [], //购物车
      shopId: null,
      shopInfo: null
    }
  },
  created() {
    this.shopId = this.$route.params.shopId
    // 请求商店菜单数据
    getFood(this.shopId).then(res=> {
      this.foodList = res.data
      for(let i in res.data) {
        this.cateList.push({title: res.data[i].title})
      }
    })
    // 获取商店信息
    getShopInfo(this.shopId).then(res=> {
      this.shopInfo = res.data
    })


    if(localStorage.getItem(this.shopId)){
      this.cartList = JSON.parse(localStorage.getItem(this.shopId))
    }

  },
  methods: {
    back() {
      this.$router.replace('/home')
    },
    //滚动事件
    contentScroll(position) {
      this.isControl = position.y < -this.controlTop
        this.slide()
        this.slideY =  position.y
    },
    toggle(index) {
      this.currentIndex = index
    },
     isActive(index) {
      return index == this.currentIndex
    },
    //电梯导航--点击侧边栏--滚动到对应位置
    sideToggle(index) {
      this.sideIndex = index
      let y = this.allTop[index]
      this.$refs.scroll.scrollTo(0,-y-this.headerHeight-6)
      //节流阀
      this.slideFlag = false
      setTimeout(() => {
        this.slideFlag = true
      },300)
    },
    //电梯导航--滑动菜品--响应侧边栏当前项
    slide() {
      if(this.slideFlag){
        const len = this.cateList.length
        const first = -this.allTop[0] - this.headerHeight
        for(let i = 0; i < len; i++) {
          if(-this.allTop[i]-this.headerHeight > this.slideY && -this.allTop[i+1]-this.headerHeight < this.slideY){
            this.sideIndex = i
          }
        }
      }
    },
    // 加入购物车、加数量
    addCart(payload) {
      let flag = true
      this.cartList.forEach((el, index) => {
        if(el.iid == payload.iid) { //存在同样商品数量+1
          el.count++
          this.cartList.splice(index, 1, el)
          flag = false
          // break
        }
      })
      if(flag) { //没有同样商品，加入购物车
        payload.count = 1
        this.cartList.push(payload)
      }
    },
    // 减少数量、移除
    reduceCart(payload) {
      this.cartList.forEach((el, index) => {
        if(el.iid == payload.iid) {
          if(el.count > 1) {
            el.count--
          this.cartList.splice(index, 1, el)
          }else {
            this.cartList.splice(index, 1)
          }
        }
      })
    },
    updateCart() { //购物车发生变化，更新到本地
      let cart = JSON.stringify(this.cartList)
      localStorage.setItem(this.shopId, cart)
    }
  },
  mounted() {
    this.controlTop = this.$refs.control2.$el.offsetTop 
    this.headerHeight = this.$refs.header.offsetHeight

    this.$refs.scroll.refresh()
    //监听点菜 添加减少
    this.$bus.$on('addCart', payload => {
      this.addCart(payload) //添加到当前页面变量
      this.updateCart() //更新到LocalStorage
    })
    this.$bus.$on('reduceCart', payload => {
      this.reduceCart(payload)
      this.updateCart()
    })
  },
  updated() {
    this.allTop = []
    for(let i = 0; i < this.cateList.length; i++) {
      this.allTop.push(this.$refs.food.$refs['cate'+i][0].$el.offsetTop)
    }
    this.allTop.push(Number.POSITIVE_INFINITY)
  },
  destroyed() {
    this.$bus.$off('addCart')
  }
}
</script>

<style scoped>

.nav {
  background-color: #333;
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 99;
}
.back {
  font-family: 'icomoon';
  font-size: 30px;
}
.store {
  background-color: #f0f0f0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 0; 
  /* background-color: skyblue; */
}
.header {
  width: 100%;
  height: 320px;
  background-color: #b8e994;
  position: relative;
}
.control-hidden {
  display: none;
}
.control1 {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
}
.side1 {
  /* background-color: #f0f0f0; */
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 2;
}
.main {
  position: relative;
}
.comment {
  /* height: 1000px; */
  background-color: pink;
}
.store-info {
  /* height: 1000px; */
  background-color: #b8e994;
}
</style>