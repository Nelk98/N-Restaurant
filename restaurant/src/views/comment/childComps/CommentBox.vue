<template>
  <div class="comment-box">
    <div class="range">
      <div class="msg">{{msg}}</div>
      <div class="stars">
        <span class="star" :class="{fill: star>=1}" @click="starClick(1)"></span>
        <span class="star" :class="{fill: star>=2}" @click="starClick(2)"></span>
        <span class="star" :class="{fill: star>=3}" @click="starClick(3)"></span>
        <span class="star" :class="{fill: star>=4}" @click="starClick(4)"></span>
        <span class="star" :class="{fill: star>=5}" @click="starClick(5)"></span>
      </div>
    </div>
    <div class="text-box"  @click="textClick">
      <textarea class="text" ref="text" placeholder="口味如何？对服务态度等还满意吗？" v-model.trim="text" maxlength="140"></textarea>
      <span class="text-tip">{{textLength}}&nbsp;/&nbsp;140</span>
    </div>
    <!-- 图片上传 -->
    <img-upload></img-upload>
    <div class="like-box" v-if="foods.length>0">
      <div class="like-item" v-for="item in foods" :key="item.iid">
        <span class="name">{{item.name}}</span>
        <!-- <span class="like-btn" :class="{'like-choose': likeList.indexOf(item.name) != -1}" @click="likeClick(item.name)"></span> -->
        <span class="like-btn" v-if="likeList.indexOf(item.name) != -1" @click="likeClick(item.name)">
          <svg class="icon-font" aria-hidden="true">
            <use xlink:href="#icon-appreciate_fill"></use>
          </svg>
        </span>
        <span class="like-btn" v-else @click="likeClick(item.name)">
          <svg class="icon-font" aria-hidden="true">
            <use xlink:href="#icon-appreciate"></use>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ImgUpload from './ImgUpload'

import {comment} from 'network/comment'

export default {
  name: 'CommentBox',
  components: {
    ImgUpload
  },
  data() {
    return {
      msg: '给个评分吧~',
      star: 0,
      text: '',
      likeList: [],
      imgList: [],
      textLength: 0
    }
  },
  props: {
    foods: {
      type: Array,
      default() {
        return []
      }
    },
    orderId: Number,
    shopId: String
  },
  methods: {
    starClick(num) {
      this.star = num
      switch(num) {
        case 1:
          this.msg = '极差'
          break;
        case 2:
          this.msg = '较差'
          break;
        case 3:
          this.msg = '一般'
          break;
        case 4:
          this.msg = '基本满意'
          break;
        case 5:
          this.msg = '无可挑剔'
          break;
        default:
          break;
      }
    },
    likeClick(name) {
      if(this.likeList.indexOf(name) != -1) {
        this.likeList.splice(this.likeList.indexOf(name), 1)
      }else {
        this.likeList.push(name)
      }
    },
    textClick() {
      this.$refs.text.focus()
    },
    commit() {
      if(this.star==0) {
        return this.$notify.error(this.msg)
      }
      if(this.text == '') {
        return this.$notify.error('评论内容不能为空')
      }
      this.$parent.isbtn = false
      let commentInfo = {
        shopId: this.shopId,
        orderId: this.orderId,
        star: this.star,
        text: this.text,
        files: this.imgList,
        likes: this.likeList
      }
      comment(commentInfo).then(res => {
        if(res.code==-1) {
          this.$parent.isbtn = true
          this.$notify.error('评价失败，请重试')
        }else {
          this.$notify.success('评论成功')
          this.$router.replace('/order')
        }
      })
    }
  },
  watch: {
    text(text) {
      this.textLength = text.length
    }
  }
}
</script>

<style scoped>
.comment-box {
  margin: 0 10px;
  /* height: 800px; */
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0 5px 2px rgba(51, 51, 51, .1);
  overflow: hidden;
}
.range {
  width: 100%;
  height: 100px;
  /* background-color: pink; */
}
.stars {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.star {
  font-family: 'icomoon';
  font-size: 38px;
  color: #f1f1f1;
}
.msg {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.fill {
  color: #f1c40f;
}
.text-box {
  position: relative;
}
.text {
  min-height: 150px;
  width: calc(100% - 20px);
  margin-top: 10px;
  margin-bottom: 8px;
  border-radius: 6px;
  margin-left: 10px;
  border: none;
  outline: none;
  padding: 10px;
  resize: none;
  background-color: #f3f3f3;
}
.text-tip {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 12px;
  color: #888;
}

::-webkit-input-placeholder{
  font-size: 14px;
}


.like-box {
  width: 100%;
  padding: 10px;
}
.like-item {
  width: 100%;
  height: 46px;
  position: relative;
  border-bottom: 1px dashed #d8d8d8;
}
.like-item:last-child {
  border: none;
}
.name {
  font-size: 12px;
  line-height: 46px;
}
.like-btn {
  font-size: 24px;
  color: #333;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate3d(0, -50%, 0);
  padding: 10px;
}
</style>