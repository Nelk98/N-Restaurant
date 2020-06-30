<template>
  <div id="comment">
    <comment-nav-bar></comment-nav-bar>
    <scroll class="content">
      <div class="pt"></div>
      <comment-box ref="commentbox" :orderId="orderInfo.orderId" :shopId="orderInfo.shopId" :foods="orderInfo.items"></comment-box>
      <div class="pb"></div>
    </scroll>
    <div class="commit-btn" @click="commit" v-show="isbtn">提交评论</div>
  </div>
</template>

<script>
import CommentNavBar from './childComps/CommentNavBar'
import Scroll from 'components/common/scroll/Scroll'

import CommentBox from './childComps/CommentBox'

export default {
  name: 'Comment',
  components: {
    CommentNavBar,
    Scroll,
    CommentBox
  },
  data() {
    return {
      orderInfo: null,
      isbtn: true
    }
  },
  created() {
    this.orderInfo = JSON.parse(localStorage.getItem('orderDetail'))
  },
  methods: {
    commit() {
      this.$refs.commentbox.commit()
    }
  }
}
</script>

<style scoped>
#comment {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.commit-btn {
  height: 44px;
  background-color: #2ecc71;
  position: absolute;
  bottom: 10px;
  width: calc(100% - 40px);
  left: 20px;
  border-radius: 6px;
  line-height: 44px;
  text-align: center;
  color: #fff;
  letter-spacing: 2px;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}

.pt {
  height: 10px;
}
.pb {
  height: 64px;
}
</style>