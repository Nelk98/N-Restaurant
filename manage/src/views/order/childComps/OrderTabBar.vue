<template>
  <div class="order-tab-bar">
    <div class="tab-block">
      <div class="tab-item" :class="{choose: current==0}" @click="itemClick(0)">进行中</div>
      <div class="tab-item" :class="{choose: current==1}" @click="itemClick(1)">已完成</div>
      <div class="tab-item" :class="{choose: current==2}" @click="itemClick(2)">取消单</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderTabBar',
  data() {
    return {
      current: 0
    }
  },
  methods: {
    itemClick(index) {
      this.current = index
      this.$emit('tab', index)
    }
  }
}
</script>

<style scoped>
.order-tab-bar {
  height: 60px;
  width: 100%;
  background-color: #f7f8fa;
  position: relative;
  margin-left: 80px;
  z-index: 99;
  overflow: hidden;
}
.tab-block {
  width: 380px;
  height: 50px;
  margin: 5px 10px;
  background-color: #e8e8e8;
  display: flex;
  border-radius: 10px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);
}
.tab-item {
  flex: 1;
  height: 40px;
  margin: 5px 10px;
  transition: flex .6s;
  border-radius: 10px;
  line-height: 46px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
} 
.choose {
  flex: 2;
  background-color: #222f3e;
  color: #fff;
}
</style>