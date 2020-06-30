<template>
  <div class="order-item" @click="itemClick">
    <img v-lazy="orderInfo.shop[0].shopPic" class="avatar">
    <div class="top">
      <span class="name">{{orderInfo.shop[0].shopName}}</span>
      <span class="state" v-if="orderInfo.done">已完成</span>
      <span class="state" v-else-if="orderInfo.isCancel">已取消</span>
      <span class="state" style="color: #27ae60" v-else-if="!orderInfo.done&&orderInfo.isPay">进行中</span>
      <span class="state" style="color: #eb2f06" v-else-if="!orderInfo.isPay&&!orderInfo.isCancel">待支付</span>
      <span class="time">{{orderInfo.createTime | unixTime}}</span>
      <span class="cancel-msg" v-if="orderInfo.isCancel">{{orderInfo.msg}}</span>
    </div>
    <div class="bottom">
      <div class="info">
        <span class="food">
          <span class="food-name">{{orderInfo.items[0].name}}</span>
          <span class="more">{{count()}}</span>
        </span>
        <span class="price"><span style="fontSize: 12px">&yen;&nbsp;</span>{{orderInfo.pay}}</span>
      </div>
      <div class="op clear-fix">
        <div class="to-pay" v-if="!orderInfo.isPay&&!orderInfo.isCancel" @click.stop="gopay">去支付</div>
        <div class="to-comment" v-if="orderInfo.done&&!orderInfo.isComment" @click.stop="comment">去评价</div>
        <div class="to-cancel" v-if="!orderInfo.done&&!orderInfo.isCancel" @click.stop="cancel">取消订单</div>
      </div>
    </div>
  </div>
</template>

<script>
import {cancelOrder, cancelPay} from 'network/order'
export default {
  name: 'OrderItem',
  props: {
    orderInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    unixTime(timeStamp) {
      let ts = Math.round(+new Date()/1000)
      let space = ts - timeStamp
      if(space < 24 * 60 * 60) {
        let h = Math.floor(space/(60*60))
        let m = Math.floor(space/(60)%60)
        if(h>0){
          return h + '小时' + m + '分钟前'
        }else if(m<2) {
          return '刚刚'
        }
        return m + '分钟前'
      }
      let time = new Date(timeStamp*1000)
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      let h = time.getHours()<10?'0'+time.getHours():time.getHours()
      let min = time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes()
      return y + '-' + m + '-' + d + ' ' + h + ':' +min
    },
  },
  methods: {
    count() {
      let count = 0
      this.orderInfo.items.forEach(element => {
        count += element.count
      });
      return count>1? '等 '+ count + ' 件' : ''
    },
    itemClick() {
      localStorage.setItem('orderDetail', JSON.stringify(this.orderInfo))
      this.$router.replace('/orderDetails/' + this.orderInfo.orderId)
    },
    gopay() {
      this.$router.replace('/pay/'+this.orderInfo.orderId)
    },
    cancel() {
      this.$dialog.confirm({
        title: '取消订单',
        message: '确认取消订单吗？'
      }).then(() => {
        if(this.orderInfo.isPay) { //已付款取消
          cancelOrder(this.orderInfo.orderId).then(res => {
            if(res.code == 1) {
              this.orderInfo.msg = res.msg
              this.orderInfo.isCancel = true
              this.$notify.success('订单取消成功，已进行退款。')
            }else if(res.code == 2) {
              this.$notify.error('订单正在制作，请联系服务员取消。')
            }else {
              this.$$notify.error('系统繁忙，请重试')
            }
          })
        }else { //取消支付
          cancelPay(this.orderInfo.orderId).then(res => {
            if(res.code == 1) {
              this.orderInfo.msg = res.msg
              this.orderInfo.isCancel = true
              this.$notify.success('订单取消成功~')
            }else {
              this.$notify.error('系统繁忙，请重试')
            }
          })
        }
      }).catch(() => {})
    },
    comment() {
      localStorage.setItem('orderDetail', JSON.stringify(this.orderInfo))
      this.$router.replace('/comment?orderId=' + this.orderInfo.orderId)
    }
  }
}
</script>

<style scoped>
  .order-item {
    margin: 10px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
  }
  .top {
    height: 66px;
    margin-left: 70px;
    margin-right: 20px;
    border-bottom: 1px solid #f1f1f1;
    position: relative;
  }
  .info {
    height: 44px;
    /* background-color: pink; */
    position: relative;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 3px;
    position: absolute;
    top: 15px;
    left: 10px;
  }
  .name {
    position: absolute;
    top: 14px;
    left: 0;
    font-size: 16px;
  }
  .state {
    position: absolute;
    top: 16px;
    right: 0;
    font-size: 14px;
  }
  .time {
    position: absolute;
    top: 40px;
    font-size: 12px;
    color: #888;
  }
  .food {
    position: absolute;
    top: 14px;
    left: 70px;
    font-size: 14px;
  }
  .food-name {
    display: inline-block;
    vertical-align: top;
    max-width: 120px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .more {
    padding-left: 10px;
    font-size: 12px;
    line-height: 14px;
    color: #888;
  }
  .price {
    position: absolute;
    top: 12px;
    right: 20px;
    font-size: 16px;
    font-weight: 500;
  }
  .op {
    width: 100%;
    padding-right: 20px;
  }
  .to-pay,
  .to-comment,
  .to-cancel {
    float: right;
    font-size: 14px;
    margin-left: 10px;
    padding: 6px 10px;
    border-radius: 5px;
    margin-bottom: 16px;
  }
  .to-pay {
    color: #eb2f06;
    border: 1px solid #eb2f06;
  }
  .to-comment {
    color: #333;
    border: 1px solid #333;
  }
  .to-cancel {
    color: #ccc;
    border: 1px solid #ccc;
  }
  .cancel-msg {
    font-size: 10px;
    position: absolute;
    right: 0;
    top: 40px;
    color: #ccc;
  }
</style>