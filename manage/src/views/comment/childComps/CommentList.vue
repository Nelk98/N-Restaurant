<template>
  <div class="comment-list">
    <scroll class="water-fall" top="20" bottom="20">
      <div class="col1" ref="col1">
        <comment-item v-for="item in list1" :key="item.orderId" :info="item" :orderId="orderId"/>
      </div>
      <div class="col2" ref="col2">
        <comment-item v-for="item in list2" :key="item.orderId" :info="item" :orderId="orderId"/>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CommentItem from './CommentItem'
export default {
  name: 'CommentList',
  components: {
    Scroll,
    CommentItem
  },
  props: {
    list: Array
  },
  data() {
    return {
      list1: [],
      list2: [],
      orderId: null
    }
  },
  mounted() {
    this.$bus.$on('commentClick', orderId => {
      this.orderId = orderId
    })
  },
  destroyed() {
    this.$bus.$off('commentClick')
  },
  watch: {
    list() {
      let list = this.list
      let count = 1
      this.list1 = []
      this.list2 = []
      for(let i in list) {
        if(count % 2 == 1) {
          this.list1.push(list[i])
        }else {
          this.list2.push(list[i])
        }
        count++
      }
    }
  }
}
</script>

<style scoped>
.comment-list {
  width: 1000px;
  position: absolute;
  top: 0;
  left: 60px;
  bottom: 0;
  padding: 20px;
}
.water-fall {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px
}
.col1,
.col2 {
  width: 50%;
  float: left;
}
.col1 {
  padding-right: 10px;
}
.col2 {
  padding-left: 10px;
}

</style>