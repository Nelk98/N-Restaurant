<template>
  <div class="demand-item">
    <img :src="info.img" class="img">
    <span class="name">{{info.name}}</span>
    <span class="count">&times;&nbsp;{{info.count}}</span>
    <span class="demand-choose" v-if="info.iid==current">&#xe645;</span>
  </div>
</template>

<script>
export default {
  name: "DemandItem",
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    },
    current: String
  }
}
</script>

<style scoped>
.demand-item {
  padding: 20px;
  position: relative;
  border-bottom: 3px dashed #f3f3f3;
}
.demand-item:last-child {
  border: none;
}
img.img {
  width: 80px;
  height: 80px;
}
span.name {
  position: absolute;
  top: 20px;
  left: 120px;
  font-size: 16px;
}
span.count {
  position: absolute;
  bottom: 20px;
  left: 120px;
  font-size: 18px;
}
.demand-choose {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  font-family: 'iconfont';
  font-size: 24px;
}
</style>