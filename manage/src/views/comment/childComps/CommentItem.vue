<template>
  <div class="comment-item"  :style="{'cursor': clickAble ? 'pointer' : 'default'}" @click="itemClick">
    <div class="n-cloak" v-if="orderId == info.orderId">
      <svg class="icon-font cloak-icon" aria-hidden="true">
          <use xlink:href="#icon-zhuanyi"></use>
      </svg>
    </div>
    <div class="head" :class="{red: info.star <= 2, green: info.star >= 3}">
      <img :src="info.avatar" class="avatar">
      <span class="user-name">{{info.nickName}}</span>
      <span class="time">{{info.created | time}}</span>
    </div>
    <div class="info-box">
      <div class="star">
        <svg class="icon-font fill" aria-hidden="true" v-for="count in info.star" :key="'fill' + count">
          <use xlink:href="#icon-favorfill"></use>
        </svg>
        <svg class="icon-font unfill" aria-hidden="true" v-for="count in (5 - info.star)" :key="'unfill' + count">
          <use xlink:href="#icon-favorfill"></use>
        </svg>
      </div>
      <p class="text">{{info.text}}</p>
      <div class="imgs" v-if="info.imgs.length > 0">
        <img :src="item" v-for="item in info.imgs" :key="item" class="img-item">
      </div>
      <div class="likes" v-if="info.likes.length>0">
        <div class="like-icon">
          <svg class="icon-font" aria-hidden="true">
            <use xlink:href="#icon-laud"></use>
          </svg>
        </div>
        <span class="like-item" v-for="item in info.likes" :key="item">{{item}}</span>
      </div>
      <div class="reply" v-if="info.isReply"><span style="font-weight: 500;">商家回复：</span>{{info.reply}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    info: Object,
    orderId: Number,
    clickAble: {
      type: Boolean,
      default: true
    }
  },
  filters: {
    time(ts) {
      let date = new Date(ts * 1000)
      let month = date.getMonth() + 1
      month = month > 9 ? month : '0' + month
      let day = date.getDate()
      day = day > 9 ? day : '0' + day
      let hour = date.getHours()
      hour = hour > 9 ? hour : '0' + hour
      let mins = date.getMinutes()
      mins = mins > 9 ? mins : '0' + mins
      return `${month}-${day} ${hour}:${mins}`
    }
  },
  methods: {
    itemClick() {
      if(this.clickAble && this.orderId != this.info.orderId){
        this.$bus.$emit('commentClick', this.info.orderId)
      }
    }
  }
}
</script>

<style scoped>
.comment-item {
  margin-bottom: 20px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(51, 51, 51, .18);
  overflow: hidden;
  background-color: #fff;
}
.n-cloak {
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}
.cloak-icon {
  font-size: 80px!important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
img.avatar {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 4px;
  left: 16px;
  border-radius: 50%;
}
.head {
  height: 68px;
  position: relative;
}
span.user-name {
  position: absolute;
  top: 50%;
  left: 100px;
  transform: translate3d(0, -50%, 0);
}
.green {
  background-color: #b8e994;
}
.red {
  background-color: #f6b93b;
  color: #fff;
}
span.time {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate3d(0, -50%, 0);
}
.star{
  padding: 0 16px;
}
.fill {
  color: #fed46f!important;
}
.unfill {
  color: #e8e8e8!important;
}
.icon-font {
  font-size: 22px;
}
.info-box {
  padding: 10px;
}
p.text {
  margin: 16px 0 10px 0;
  padding: 0 16px;
}
.imgs {
  height: 128px;
  display: flex;
  margin-bottom: 10px;
}
.img-item {
  height: 128px;
  width: 128px;
  margin-left: 16px;
  border-radius: 6px;
}
.likes {
  padding: 10px;
}
.like-icon {
  display: inline-block;
  margin-right: 10px;
}
.like-item {
  font-size: 12px;
  color: #333;
  padding: 4px 6px;
  background-color: #f1f1f1;
  display: inline-block;
  margin: 0 5px;
  margin-bottom: 10px;
}
.reply {
  margin: 0 10px;
  background-color: #f3f3f3;
  padding: 10px;
  font-size: 14px;
  line-height: 20px;
  color: #333;
}
</style>