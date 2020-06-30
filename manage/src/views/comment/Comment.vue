<template>
  <div id="comment">
    <comment-list :list="commentsList"/>
    <comment-order/>
  </div>
</template>

<script>
import CommentList from './childComps/CommentList'
import CommentOrder from './childComps/CommentOrder'
import {getComments} from 'network/comment'
export default {
  name: 'Comment',
  components: {
    CommentList,
    CommentOrder
  },
  data() {
    return {
      commentsList: null
    }
  },
  created() {
    let shopId = this.$route.params.shopId
    //获取评论
    getComments(shopId).then(res => {
      this.commentsList = res.data
    })
  }
}
</script>

<style scoped>
#comment {
  width: 100%;
  height: 100%;
  border-radius: 46px;
}
</style>