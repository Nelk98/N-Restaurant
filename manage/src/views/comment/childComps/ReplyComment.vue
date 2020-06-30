<template>
  <div class="reply-comment">
    <textarea class="text-input" v-model.trim="replyText" placeholder="在此进行回复~"></textarea>
    <div class="reply-op">
      <div class="reply-btn" @click="commitReply">回复</div>
      <div class="clear-btn" @click="clear">清空</div>
    </div>
    <div class="quick-reply">
      <div class="qr-title">快速回复
        <em class="add-btn" @click="addShow = true">＋</em>
      </div>
      <div class="add-box" v-if="addShow">
        <textarea class="add-input" v-model="addText"></textarea>
        <div class="add-op">
          <div class="cancel-btn" @click="addShow = false">取消</div>
          <div class="confirm-btn" @click="addQR">确定添加</div>
        </div>
      </div>
      <div class="qr-item" v-for="(item,index) in quicks" :key="index" @click="replyText = item">{{item}}
        <em class="delete" @click.stop="deleteQuick(index)">&times;</em>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReplyComment',
  data() {
    return {
      replyText: '',
      addShow: false,
      addText: '',
      quicks: []
    }
  },
  methods: {
    clear() {
      this.replyText = ''
    },
    addQR() {
      let quickReply = localStorage.getItem('quick-reply')
      if(quickReply) {
        quickReply = JSON.parse(quickReply)
        quickReply.push(this.addText)
      }else {
        quickReply = []
        quickReply.push(this.addText)
      }
      localStorage.setItem('quick-reply', JSON.stringify(quickReply))
      this.addText = ''
      this.addShow = false
      this.$notify.success({
        message: '快速回复添加成功！'
      })
      this.getQuicks()
    },
    getQuicks() {
      this.quicks = JSON.parse(localStorage.getItem('quick-reply'))
    },
    deleteQuick(index) {
      let quickReply = JSON.parse(localStorage.getItem('quick-reply'))
      quickReply.splice(index, 1)
      localStorage.setItem('quick-reply', JSON.stringify(quickReply))
      this.getQuicks()
    },
    commitReply() {
      if(this.replyText == '') {
        return this.$notify.error({
          message: '回复不能为空~'
        })
      }
      this.$emit('commitReply', this.replyText)
      this.replyText = ''
    }
  },
  created() {
    this.getQuicks()
  }
}
</script>

<style scoped>
.reply-comment {
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(51, 51, 51, .18);
}
.text-input,
.add-input {
  width: 100%;
  height: 100px;
  resize: none;
  padding: 10px;
  border: none;
  background-color: #f3f3f3;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}
.add-input {
  background-color: #fff;
}
.reply-op {
  display: flex;
  justify-content: space-between;
}
.reply-btn,
.clear-btn {
  width: 49%;
  height: 49px;
  margin: 10px 0;
  background-color: #409EFF;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  line-height: 49px;
  cursor: pointer;
}
.clear-btn {
  background-color: #f1f1f1;
  color: #333;
}
.quick-reply {
  margin-top: 10px;
  width: 100%;
  min-height: 250px;
  background-color: #f3f3f3;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}
.qr-title {
  height: 44px;
  line-height: 44px;
  text-align: center;
  border-bottom: 1px dashed #aaa;
  position: relative;
}
.qr-item {
  margin: 20px;
  background-color: #fff;
  border-radius: 3px;
  font-size: 14px;
  color: #333;
  padding: 10px;
  cursor: pointer;
  position: relative;
}
em.delete {
  font-style: normal;
  display: inline-block;
  background-color: #eb2f06;
  font-size: 20px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  color: #fff;
  line-height: 26px;
  text-align: center;
  position: absolute;
  top: -13px;
  right: -13px;
}
em.add-btn {
  display: inline-block;
  font-style: normal;
  width: 30px;
  height: 30px;
  background-color: #333;
  color: #fff;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  right: 20px;
  top: 8px;
  cursor: pointer;
}
.add-op {
  width: 100%;
  height: 49px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.cancel-btn,
.confirm-btn {
  width: 48%;
  border-radius: 6px;
  line-height: 49px;
  text-align: center;
  cursor: pointer;
}
.cancel-btn {
  background-color: #f1f1f1;
  color: #333;
}
.confirm-btn {
  background-color: #30ad63;
  color: #fff;
}
.add-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left: 0;
  background: rgba(51, 51, 51, .6);
  padding: 60px 20px 0 20px;
  z-index: 99;
}

</style>