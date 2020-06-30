<template>
  <div class="info-item" @click="notOpen">
    <div class="title">
      {{title}}
      <span class="title-r">
        <slot name="right"></slot>
      </span>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoItem',
  data() {
    return {
      isFold: false
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    notOpen() {
      this.$notify.error('暂未开放该功能')
    }
  }
}
</script>

<style scoped>
  .info-item {
    width: 100%;
    position: relative;
  }
  .title {
    width: 100%;
    height: 40px;
    background-color: #fff;
    font-size: 16px;
    line-height: 40px;
    padding: 0 10px;
  }
  .info-item .fold-icon {
    position: absolute;
    top: 0px;
    right: 10px;
    font-family: 'icomoon';
    font-size: 20px;
  }
  .content {
    width: 100%;
    background-color: #f3f3f3;
  }
  .title-r {
    float: right;
  }
</style>