<template>
  <scroll class="manage-list" v-if="foodList.length > 0">
    <div class="category" v-for="item in foodList" :key="item.title">
      <div class="title">{{item.title}}</div>
      <manage-item v-for="info in item.list" :key="info.iid" :info="info"></manage-item>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import ManageItem from './ManageItem'

export default {
  name: 'ManageList',
  components: {
    Scroll,
    ManageItem
  },
  props: {
    foodList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.manage-list {
  position: absolute;
  top: 0;
  left: 60px;
  bottom: 0;
  width: 1000px;
  /* background-color: pink; */
}
.title {
  width: 100%;
  height: 49px;
  float: left;
  line-height: 49px;
  font-size: 30px;
  text-indent: 20px;
  margin-top: 20px;
  color: #eb2f06;
  font-weight: 600;
}
</style>