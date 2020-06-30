<template>
  <div class="order-item" v-if="orderInfo.orderId && !orderInfo.done && !isCancel">
    <div class="order-info">
      <doing-btn @checkOn="checkOn" :check="orderInfo.doing"></doing-btn>
      <span class="overBtn" v-if="isOver" @click="overClick">完成订单</span>
      <span class="order-id">订单编号：{{orderInfo.orderId}}</span>
      <span class="user">用户名：{{orderInfo.userName}}</span>
      <span class="tell">电话：{{orderInfo.userTell}}</span>
      <span class="create-time">下单时间：{{orderInfo.createTime | getTime}}</span>
      <span class="pay">实付：{{orderInfo.pay}}</span>
      <span class="remarks">{{orderInfo.remark}}</span>
      <!-- 桌号、打包 -->
      <span class="table" v-if="orderInfo.isHere">{{orderInfo.table}}</span>
      <span class="pack" v-else>&#xe600;</span>
      <span class="dishware" v-if="orderInfo.dishware>0">一次性餐具：{{orderInfo.dishware}}</span>
    </div>
    <div class="food-list clear-fix">
      <food-item v-for="item in orderInfo.items" :key="item.iid" 
      :isDoing="orderInfo.doing" :food="item" @checkDone="checkDone" :class="{demand: !item.done&&item.iid == demandId}"></food-item>
    </div>
  </div>
</template>

<script>
import DoingBtn from './DoingBtn'
import FoodItem from './FoodItem'

import {stateChange, completeOrder} from 'network/order'

export default {
  name: 'OrderItem',
  components: {
    DoingBtn,
    FoodItem
  },
  props: {
    orderInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    shopId: String,
    demandId: {
      type: String,
      default: null
    }
  },
  data() {
    return{
      isOver: false,
      isCancel: false
    }
  },
  methods: {
    checkOn(flag) {
      this.orderInfo.doing = !this.orderInfo.doing
      stateChange(this.orderInfo.orderId, flag).then(res => {
        if(res.code == 2) {
          this.$message.error({
            message: '该订单已取消',
            duration: 3000
          })
          this.isCancel = true
        }else if(res.code == 1) {
          this.$message.success({
            message: '订单状态变更成功',
            duration: 3000
          })
        }else if(res.code == -1) {
          this.orderInfo.doing = !this.orderInfo.doing
          this.$message.error({
            message: '订单状态变更失败',
            duration: 3000
          })
        }
      })
    },
    checkDone() {
      let items = this.orderInfo.items
      let flag = true
      for(let i in items) {
        if(!items[i].done) {
          flag = false
        }
      }
      if(flag) {
        this.isOver = true
      }else {
        this.isOver = false
      }
    },
    overClick() {
      completeOrder(this.orderInfo.orderId, this.shopId, this.orderInfo.pay).then(res => {
        if(res.code == 1) { //完成订单成功并响应
          this.orderInfo.done = true
          this.$bus.$emit('orderDone')
          this.$message.success({
            message: '订单完成~',
            duration: 3000
          })
        }
      })
    }
  },
  filters: {
    getTime(timeStamp) {
      let t = new Date(timeStamp*1000)
      let year = t.getFullYear()
      let month = t.getMonth() + 1
      month = month < 10 ? '0' + month : month
      let date = t.getDate()
      date = date < 10 ? '0' + date : date
      let h = t.getHours()
      h = h < 10 ? '0' + h : h
      let m = t.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = t.getSeconds()
      s = s < 10 ? '0' + s : s
      return year+'-'+month+'-'+date+' '+h+':'+ m+':'+s
    }
  },
  mounted() {
    this.checkDone()
  }
}
</script>

<style scoped>
.order-item {
  width: 680px;
  background-color: #fff;
  float: left;
  margin-bottom: 16px;
  margin-left: 16px;
  border-radius: 16px;
  position: relative;
  transition: all 1s;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
}
.content {
  height: 400px;
}
.order-info {
  height: 120px;
  border-bottom: 1px solid #f3f3f3;
  position: relative;
  z-index: 1;
}
.food-list {
  width: 660px;
  margin: 10px;
}
span.order-id,
span.user,
span.tell,
span.create-time,
span.pay{
  position: absolute;
  left: 20px;
  font-size: 14px;
}
span.order-id {
  top: 10px;
}
span.user {
  top: 30px;
}
span.tell {
  top: 50px;
}
span.create-time {
  top: 70px;
}

span.pay {
  top: 90px;
}
span.remarks {
  position: absolute;
  right: 20px;
  bottom: 10px;
  color: #eb2f06;
  font-size: 16px;
}
span.table,
span.pack {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3D(-50%, -50%, 0);
  font-size: 100px;
  color: #f3f3f3;
  z-index: -1;
}
.dishware {
  position: absolute;
  font-size: 14px;
  color: #eb2f06;
  bottom: 40px;
  right: 20px;
}
span.pack {
  font-family: 'iconfont';
}
span.overBtn {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 8px 10px;
  text-align: center;
  background-color: #eb2f06;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}
</style>