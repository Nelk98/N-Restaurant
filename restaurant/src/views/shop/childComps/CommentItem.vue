<template>
  <div class="comment-item">
    <div class="top">
      <img class="avatar" :src="comment.avatar">
      <span class="name">{{comment.nickName}}</span>
      <div class="range">
        <span class="star" :class="{fill: comment.star>=1}"></span>
        <span class="star" :class="{fill: comment.star>=2}"></span>
        <span class="star" :class="{fill: comment.star>=3}"></span>
        <span class="star" :class="{fill: comment.star>=4}"></span>
        <span class="star" :class="{fill: comment.star>=5}"></span>
      </div>
      <span class="time">{{formTime()}}</span>
    </div>
    <div class="content">
      <p>{{comment.text}}</p>
      <div class="imgs clear-fix" v-if="comment.imgs.length>0">
        <img class="comment-img" v-for="src in comment.imgs" :key="src" :src="src"/>
      </div>
    </div>
    <div class="like clear-fix" v-if="comment.likes.length>0">
      <span class="like-icon"></span>
      <span class="like-item" v-for="(item, index) in comment.likes" :key="index">{{item}}</span>
    </div>
    <div class="reply" v-if="comment.isReply"><span style="font-weight: 500;">商家回复：</span>{{comment.reply}}</div>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    formTime() {
      let date = new Date(this.comment.created * 1000)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  }
}
</script>

<style scoped>
.comment-item {
  margin: 10px 15px 5px 15px;
  /* background-color: #fff; */
  border-bottom: 1px solid #f1f1f1;
  position: relative;
  padding-bottom: 10px;
}
.top {
  height: 60px;
}
.avatar {
  width: 38px;
  height: 38px;
  border-radius: 5px;
  position: absolute;
  top: 10px;
  left: 0;
}
.name {
  font-size: 14px;
  position: absolute;
  top: 10px;
  left: 50px;
}
.range {
  position: absolute;
  top: 30px;
  left: 50px;
  font-size: 12px;
  font-family: 'icomoon';
}
.star {
  font-size: 16px;
  vertical-align: middle;
  color: #dfe6e9;
}
.fill {
  color: #feca57;
}
.time {
  font-size: 13px;
  position: absolute;
  right: 0;
  top: 10px;
  color: #888;
}
.content {
  padding-left: 40px;
}
.content p {
  font-size: 14px;
  padding:  5px 10px 5px 0;
}
.like {
  padding: 5px 10px 5px 30px;
  position: relative;
}
.like-icon {
  font-family: 'icomoon';
  font-size: 14px;
  position: absolute;
  left: 10px;
}
.like-item {
  font-size: 12px;
  padding: 3px 5px;
  background-color: #f1f1f1;
  margin-left: 5px;
  margin-bottom: 5px;
  float: left;
}
.imgs {
  padding: 10px 0;
}
.comment-img {
  height: 92px;
  width: 92px;
  margin-left: 5px;
  margin-bottom: 5px;
  background-color: #f3f3f3;
  float: left;
}
.reply {
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 12px;
  line-height: 16px;
  color: #333;
  margin: 10px 0 ;
}
</style>