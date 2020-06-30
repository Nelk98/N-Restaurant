<template>
  <scroll class="comment-order">
    <div class="n-cloak" v-if="!orderData">
      <svg class="icon-font cloak-icon" aria-hidden="true">
          <use xlink:href="#icon-zhuanyi"></use>
      </svg>
    </div>
    <div class="comment-container" v-if="orderData">
      <comment-item :info="orderData.comment" :clickAble="false"/>
    </div>
    <div class="order-container" v-if="orderData">
      <order-info :info="orderData"/>
    </div>
    <div class="reply-container" v-if="orderData && !isReply">
      <reply-comment @commitReply="commitReply"/>
    </div>
  </scroll>
</template>

<script>
import {getCommentOrder, reply} from 'network/comment'
import Scroll from 'components/common/scroll/Scroll'
import CommentItem from './CommentItem'
import ReplyComment from './ReplyComment'
import OrderInfo from './OrderInfo'
export default {
  name: 'CommentOrder',
  components: {
    Scroll,
    CommentItem,
    ReplyComment,
    OrderInfo
  },
  data() {
    return {
      orderId: null,
      orderData: null,
      isReply: false
    }
  },
  mounted() {
    this.$bus.$on('commentClick', orderId => {
      this.orderId = orderId
      getCommentOrder(orderId).then(res => {
        this.orderData = res.data
        this.isReply = res.data.comment.isReply
      })
    })
  },
  destroyed() {
    this.$bus.$off('commentClick')
  },
  methods: {
    commitReply(text) {
      reply(this.orderId, text).then(res => {
        console.log(res)
        if(res.errcode =='') {
          this.$notify.success({
            title: `订单编号${this.orderId}`,
            message: '该评论回复成功!'
          })
          this.isReply = true
        }
      })
    }
  }
}
</script>

<style scoped>
.comment-order {
  position: absolute;
  top: 30px;
  right: 60px;
  width: 520px;
  bottom: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(51, 51, 51, .18);
}
.n-cloak {
  position: absolute;
  top: 68px;
  left: 0;
  right: 0;
  bottom: 0;
}
.cloak-icon {
  font-size: 80px!important;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.comment-container {
  padding: 20px 20px 0 20px;
}
.order-container {
  padding:  0 20px 20px 20px;
}
.reply-container {
  padding: 0 20px 20px 20px;
}
</style>