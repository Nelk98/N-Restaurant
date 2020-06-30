<template>
  <div class="side-bar">
      <side-bar-item v-for="(item,index) in cateList" :isActive="index==sideIndex" :cate="item" :key="item.title" @click.native="sideClick(index)"></side-bar-item> 
  </div>
</template>

<script>
import SideBarItem from './SideBarItem'
export default {
  name: 'SideBar',
  components: {
    SideBarItem
  },
  props: {
    cateList: {
      type: Array,
      default() {
        return []
      }
    },
    sideIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    sideClick(index) {
      this.$emit('sideToggle', index)
    }
  }
}
</script>

<style scoped>
.side-bar {
  height: calc(100vh - 44px - 36px);
  width: 68px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow: auto;
}
.content {
  height: 100%;
}
</style>