<template>
  <div class="demand-list">
    <scroll class="content">
      <demand-item v-for="item in list" :key="item.iid" :info="item" :current="current" @click.native="itemClick(item.iid)"></demand-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import DemandItem from './DemandItem'
export default {
  name: 'DemandList',
  components: {
    Scroll,
    DemandItem
  },  
  props: {
    list: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      current: ''
    }
  },
  methods: {
    itemClick(iid) {
      this.$emit('demand', iid)
      this.current = iid
    }
  }
}
</script>

<style scoped>
.demand-list {
  width: 420px;
  height: 90%;
  background-color: #fff;
  position: absolute;
  top: 70px;
  left: 840px;
  border-radius: 20px;
  transition: all .6s;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
}
.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 420px;
  bottom: 0;
}
</style>