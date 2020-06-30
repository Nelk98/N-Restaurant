<template>
  <div class="control-bar-item">
    <span>{{control}}</span>
    <div class="active" v-show="isActive"></div>
  </div>
</template>

<script>
export default {
  name: 'ControlBarItem',
  props: {
    control: {
      type: String,
      default: 'xxx'
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.control-bar-item {
  flex: 1;
  height: 100%;
  text-align: center;
  line-height: 36px;
  position: relative;
}
.active {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 50px;
  transform: translateX(-50%);
  border: 2px solid #eb2f06;
}
</style>