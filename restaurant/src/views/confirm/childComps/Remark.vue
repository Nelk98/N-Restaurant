<template>
  <div class="remark clear-fix">
    <div class="title">备注</div>
    <!-- <div class="block"> -->
      <textarea class="block" ref="text" v-model.trim.lazy="remark" @click="focusOn"></textarea>
      <!-- <img class="angry" v-show="remark.length>2" src="~assets/images/angry.png"> -->
    <!-- </div> -->
    <span class="mark" v-for="item in marks" :key="item" @click="itemClick(item)">{{item}}</span>
  </div>
</template>

<script>
export default {
  name: 'Remark',
  data() {
    return {
      marks: ['不要葱', '不要姜', '不要蒜', '不要香菜', '不要辣', '微辣', '少放辣', '多放辣', '少油', '少糖', '饮料常温', '饮料加冰', '多加米饭', '多加面条', '需要儿童餐具'],
      remark: ''
    }
  },
  methods: {
    itemClick(mark) {
      if(this.remark == '') {
        this.remark = mark
      }else {
        this.remark = this.remark + '、' + mark
      }
    },
    focusOn() {
      this.$refs.text.focus()
    } 
  },
  watch: {
    remark(text) {
      this.$emit('remarkUse', text)
    }
  }
}
</script>

<style scoped>
  .remark {
    margin: 5px 10px;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    padding: 0 5px 20px 5px;
  }
  .title {
    height: 50px;
    padding: 0 10px;
    font-size: 16px;
    font-weight: 600;
    line-height: 50px;
    border-bottom: 1px solid #f3f3f3;
  }
  .block {
    width: 345px;
    margin: 5px 0;
    min-height: 100px;
    border: 1px solid #333;
    border-radius: 5px;
    resize: none;
    padding: 10px;
    position: relative;
  }
  .mark {
    float: left;
    padding: 4px 6px;
    font-size: 14px;
    line-height: 14px;
    border: .8px solid #ccc;
    border-radius: 4px;
    margin: 6px;
  }
  .angry {
    width: 100px;
    position: absolute;
    right: 0;
    bottom: 0;
  }
</style>