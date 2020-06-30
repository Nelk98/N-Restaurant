<template>
  <div class="side-bar-item" :class="{active: isActive}">{{cate.title}}</div>
</template>

<script>
export default {
  name: 'SideBarItem',
  props: {
    cate: {
      type: Object,
      default() {
        return {}
      }
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.side-bar-item {
  width: 100%;
  height: 40px;
  text-align: left;
  text-indent: 0.6em;
  line-height: 40px;
  font-size: 12px;
}

.active {
  background-color: #f0f0f0;
  color: #3c6382;
}
</style>