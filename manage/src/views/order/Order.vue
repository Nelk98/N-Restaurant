<template>
  <div id="order">
    <order-tab-bar @tab="tabToggle"></order-tab-bar>
    <div class="reload-btn" @click="reload" v-show="type==0">刷新</div>
    <!-- 进行中订单 -->
    <div v-if="orderList.length>0 && show()" v-show="type == 0">
      <scroll class="doing-content" bottom="50" top="2">
        <order-list>
          <order-item v-for="item in orderList" :shopId="shopId" :demandId="demandId" :key="item.orderId" :orderInfo="item" />
        </order-list>
      </scroll>
      <!-- 需求清单 -->
      <demand-list :list="demandList" @demand="demand"></demand-list>
    </div>
    <div v-if="type==0&&orderList.length==0" class="blank"></div>
    <!-- 已完成订单 -->
    <div v-show="type == 1">
      <scroll class="complete-content">
        <complete-list :list="completeList"/>
      </scroll>
    </div>

    <div v-show="type == 2">
      <scroll class="complete-content">
        <complete-list :list="cancelList"/>
      </scroll>
    </div>


    <div v-if="type==1&&completeList.length==0" class="blank"></div>
    <div v-if="type==2&&cancelList.length==0" class="blank"></div>

    <control-bar @chooseDate="chooseDate"></control-bar>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import ControlBar from 'components/content/controlbar/ControlBar'

import OrderTabBar from './childComps/OrderTabBar'
import OrderList from './childComps/order-list/OrderList'
import OrderItem from './childComps/order-list/OrderItem'
import DemandList from './childComps/demand-list/DemandList'
import CompleteList from './childComps/complete-list/CompleteList'

import {getOrder, getComplete, getCancel} from 'network/order'

export default {
  name: 'Order',
  components: {
    Scroll,
    ControlBar,
    OrderTabBar,
    OrderList,
    OrderItem,
    DemandList,
    CompleteList,
  },
  data() {
    return {
      orderList: [],
      demandList: {},
      type: 0,
      demandId: null,
      completeList: [],
      cancelList: [],
      start: null,
      end: null,
      shopId: null
    }
  },
  methods: {
    hide(index) {
      this.arr.splice(index,1)
    },
    getOrderList() {
      getOrder(this.shopId).then(res => {
        //获取订单
        this.orderList = res.data
        this.$bus.$emit('orderCount', this.orderList.length)
        this.getDemandList()
      })
    },
    getDemandList() {
      
      let list = {}
      //计算需求
      this.orderList.forEach(el => {
        el.items.forEach(item => {
          if(!item.done&&list[item.iid]){
            list[item.iid].count = list[item.iid].count + item.count
          }else if(!item.done){
            list[item.iid] = {name: item.name, count: item.count, img: item.img, iid: item.iid}
          }
        })
      })
      this.demandList = list
    },
    getCompleteList(){
      getComplete(this.shopId, this.start, this.end).then(res => {
        this.completeList = res.data
      })
    },
    getCancelList() {
      getCancel(this.shopId, this.start, this.end).then(res => {
        this.cancelList = res.data
      })
    },
    getDayTime () {
      let date = new Date()
      let times = date.getTime()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      let dayTime = times - hour * 3600 * 1000 - minute * 60 * 1000 - second * 1000
      return Math.floor(dayTime/1000)
    },
    show() {
      let flag = true
      for(let i in this.orderList) {
        if(this.orderList[i].done) {
          this.orderList.splice(i, 1)
        }
      }
      return flag
    },
    tabToggle(index) {
      this.type = index
      this.getList()
    },
    chooseDate(date) {
      this.start = Math.round(new Date(date) / 1000)
      this.end = this.start + 24*60*60
      this.getList()
    },
    getList() {
      if(this.type == 1) {
        this.getCompleteList()
      }else if(this.type == 2) {
        this.getCancelList()
      }
    },
    demand(iid) {
      this.demandId = iid
    },
    reload() {
      this.getOrderList()
      this.$notify.success({
        message: '刷新成功！'
      })
    }
  },
  created() {
    this.shopId = this.$route.params.shopId
    this.start = this.getDayTime()
    this.end = this.getDayTime()+24*60*60
    this.getOrderList()
    // console.log(this.getDayTime())
    // console.log(this.getDayTime()+24*60*60)
  },
  mounted() {
    this.$bus.$on('foodDone', ()=> {
      this.getDemandList()
    })
    this.$bus.$on('orderDone', this.getOrderList)
    this.$bus.$on('newOrder', this.getOrderList)
  },
  destroyed() {
    this.$bus.$off('foodDone')
  }
}
</script>

<style>
#order {
  width: 1256px;
  height: 100%;
}
.doing-content {
  position: absolute;
  width: 736px;
  top: 70px;
  left: 50px;
  bottom: 0;
  transition: all .6s;
}
.reload-btn {
  width: 100px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #e8e8e8;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);
  color: #333;
  position: absolute;
  top: 10px;
  left: 500px;
  z-index: 99999;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}
.blank {
  width: 500px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: calc(50% - 168px);
  transform: translate3d(-50%, -50%, 0);
  background: url(~assets/img/blankbg.png);
  background-size: cover;
}
.complete-content {
  position: absolute;
  top: 70px;
  left: 0;
  right: 336px;
  bottom: 0;
}
</style>