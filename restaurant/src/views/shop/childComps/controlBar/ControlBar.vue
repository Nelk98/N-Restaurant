<template>
  <div class="control-bar">
    <control-bar-item v-for="(item,index) in control"  :key="index" 
    :control="item" 
    @click.native="toggle(index)" 
    :isActive="isActive(index)">
    </control-bar-item>
  </div>
</template>

<script>
import ControlBarItem from './ControlBarItem'
export default {
  name: 'ControlBar',
  components: {
    ControlBarItem
  },
  props: {
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      control: ['菜单', '评价', '商家']
    }
  },
  methods: {
    isActive(index) {
      return index == this.currentIndex
    },
    toggle(index){
      this.$emit('toggle', index)
    }
  }
}
</script>

<style scoped>
.control-bar {
  height: 36px;
  background-color: #fff;
  font-size: 14px;
  display: flex;
  position: relative;
  z-index: 3;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .08);
}
</style>