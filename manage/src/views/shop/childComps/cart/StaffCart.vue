<template>
  <div class="staff-cart">
    <div class="info">
      <div class="table" v-show="isHere">取餐牌：<input type="number" min="100" max="150" v-model.number="table"></div>
      <div class="dishware" v-show="!isHere">一次性餐具：<input type="number" v-model.number="dishware"></div>
      <div class="is-here">
        <label for="here" :class="{'radio-choose': isHere}">
          <input type="radio" name="type" id="here" @change="radioChange(true)" checked>
          <span>堂食</span>
        </label>        
        <label for="takeaway" :class="{'radio-choose': !isHere}">
          <input type="radio" name="type" id="takeaway"  @change="radioChange(false)">
          <span>打包</span>
        </label>
      </div>
      <span class="total"><span style="fontSize: 12px">合计：&yen;&nbsp;</span>{{pay}}</span>
      <span class="commit" v-show="cartList.length>0" @click="commitOrder">提交订单</span>
    </div>
    <scroll class="content" top="10" bottom="10">
      <cart-item v-for="item in cartList" :key="item.iid" :reset="reset" :info="item"></cart-item>
      <div class="blankx" v-show="cartList.length<1"></div>
    </scroll>
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true">
      <span>确认下单吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartItem from './CartItem'

import {makeOrder} from 'network/order'

export default {
  name: 'StaffCart',
  components: {
    Scroll,
    CartItem
  },
  data() {
    return {
      reset: true,
      table: null,
      isHere: true,
      dishware: 0,
      pay: 0,
      dialogVisible: false
    }
  },
  props: {
    cartList: {
      type: Array,
       default() {
        return []
      }
    },
    shopId: {
      type: String,
      default: ''
    }
  },
  methods: {
    commitOrder() {
      let flag = false
      if(this.isHere) {
        if(100<this.table && this.table<150) {
          flag = true
        } else {
          // return this.$toast.show("取餐牌错误", 3000)
          return this.$notify.error({
            message: '取餐牌错误',
            duration: 1800
          })
        }
      }else {
          flag = true
      }
      if(flag) {
        this.dialogVisible = true
      }
    },
     radioChange(flag) {
       this.isHere = flag
     },
     handleClose() {
       this.dialogVisible = false
     },
     confirmOrder() {
       this.dialogVisible = false
       makeOrder(this.shopId, this.isHere, this.table, this.dishware, this.cartList, this.pay).then(res => {
          if(res.code == 1) {
            this.$parent.cartList = []
            this.table = null
            this.dishware = 0
            this.$bus.$emit('successOrder')
            this.$notify.success({
              message: '下单成功',
              duration: 1800
            })
          }else {
            this.$notify.error({
              message: '下单失败',
              duration: 1800
            })
          }
       })
     }
  },
  watch: {
    cartList() {
      this.reset = false;
      this.$nextTick().then(()=>{
        this.reset = true
      })
      this.pay = this.cartList.reduce((pre, el) => {
        return pre + el.price * el.count
      },0)
    }
  }
}
</script>

<style scoped>
.staff-cart {
  background-color: #fff;
  width: 500px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 36px 46px 46px 36px;
  box-shadow: -3px 0 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.content {
  position: absolute;
  top: 160px;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #d8d8d8;
}
.list {
  width: 100%;
  min-height: 500px;
}
.blankx {
  width: 500px;
  height: 500px;
  background: url(~assets/img/blankbg.png) no-repeat;
  background-size: contain;
}
.info {
  width: 100%;
  margin-top: 10px;
  height: 140px;
  position: relative;
}
.table,
.dishware {
  position: absolute;
  bottom: 20px;
  left: 50px;
}
.info input[type="number"] {
  width: 50px;
  height: 30px;
  text-align: center;
  border: 1px solid #409EFF;
  color: red;
  outline: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.total {
  position: absolute;
  top: 20px;
  right: 50px;
  font-size: 30px;
  color: #eb2f06;
}
span.commit {
  position: absolute;
  right: 50px;
  bottom: 20px;
  background-color: #46a0fc;
  font-size: 14px;
  color: #fff;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.is-here {
  position: absolute;
  top: 30px;
  left: 45px;
}
label {
  border: 1px solid #888;
  color: #888;
  padding: 8px 12px;
  margin: 5px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}
.radio-choose {
  color: #409EFF;
  border: 1px solid #409EFF;
}
label span {
  margin-left: 16px;
}
</style>