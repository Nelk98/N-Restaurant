<template>
  <div class="log-list">
    <scroll class="content" top="30">
      <timeline>
      <timeline-item class="timeline-item" v-for="(val, key) in logs" :key="key" :timestamp="key" placement="top">
        <div class="card" :class="{red: item.type == 'delete' || item.type == 'soldout', yellow: item.type == 'modify'}" 
        v-for="(item, index) in val" :key="index">
          <span class="time">{{item.time | time}}</span>
          <div class="text" v-if="item.type == 'create'">新增 <span class="target">{{item.target}}</span></div>
          <div class="text" v-else-if="item.type == 'modify'">修改 <span class="target">{{item.target}}</span></div>
          <div class="text" v-else-if="item.type == 'delete'">删除 <span class="target">{{item.target}}</span></div>
          <div class="text" v-else-if="item.type == 'onsale'">上架 <span class="target">{{item.target}}</span></div>
          <div class="text" v-else-if="item.type == 'soldout'">下架 <span class="target">{{item.target}}</span></div>
        </div>
      </timeline-item>
    </timeline>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import {Timeline, TimelineItem} from 'element-ui'
export default {
  name: 'LogList',
  components: {
    Scroll,
    Timeline,
    TimelineItem
  },
  props: {
    logs: Object
  },
  filters: {
    time(ts) {
      let time = new Date(ts * 1000)
      let h = time.getHours() > 9 ? time.getHours() : '0' + time.getHours()
      let m = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes()
      let s = time.getSeconds() > 9 ? time.getSeconds() : '0' + time.getSeconds()
      return `${h}:${m}:${s}`
    }
  }
}
</script>

<style scoped>
.log-list {
  width: 520px;
  position: absolute;
  top: 120px;
  right: 60px;
  bottom: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 6px rgba(51, 51, 51, .18);
}

.content {
  width: 100%;
  height: 100%;
  padding: 20px;
}
.card {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0px 6px 1px rgba(51, 51, 51, .14);
  margin-bottom: 16px;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  padding: 0 20px;
}
.time {
  font-size: 14px;
  display: block;
  /* height: 20px; */
  /* padding-top: 10px; */
  margin-top: 10px;
  /* line-height: 20px; */
  padding-left: 10px;
  color: #888;
}
.text {
  padding: 0 10px;
  font-size: 14px;
  margin: 10px 0;
  line-height: 30px;
}
span.target{
  color: #0a3d62;
  padding: 0 5px;;
  font-size: 14px;
}
.red::after,
.yellow::after,
.green::after {
  content: '';
  width: 8px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.red::after {
  background-color: #e55039;
}
.yellow::after {
  background-color: #fbc531;
}
</style>