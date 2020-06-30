<template>
  <div class="side-bar-item">
    <div class="icon" v-html="icon"></div>
    <span class="tip" v-if="tip">{{tip}}</span>
  </div>
</template>

<script>
export default {
  name: 'SideBarItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    tip: {
      type: Number,
      default: 0
    }
  },
  
}
</script>

<style scoped>
.side-bar-item {
  height: 60px;
  width: 60px;
  background-color: #35373d;
  margin-bottom: 24px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  font-family: 'iconfont';
  position: relative;
}
.icon {
  width: 100%;
  height: 100%;
  font-size: 28px;
  line-height: 60px;
}
.choose {
  background-color: #fff;
  box-shadow: 0 0 28px 3px rgba(255, 254, 215, 0.5);
  color: #000;
}
.tip {
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  line-height: 30px;
  transform: translate3d(15px, -10px, 0);
  background-color: #eb2f06;
  color: #fff;
  border-radius: 50%;
}
</style>