<template>
  <div class="doing-btn" :class="{check: check}" @click.stop="toggle">
    <div class="btn"></div>
  </div>
</template>

<script>
export default {
  name: 'DoingBtn',
  props: {
    check: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle() {
      this.$emit('checkOn', !this.check)
    }
  }
}
</script>

<style scoped>
.doing-btn {
  width: 60px;
  height: 28px;
  border-radius: 20px;
  background-color: #f3f3f3;
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 2px;
  transition: padding-left .3s, background-color .3s;
  cursor: pointer;
}
.btn {
  height: 24px;
  width: 24px;
  background-color: #fff;
  border-radius: 50%;
}
.check {
  background-color: #4fc08d;
  padding-left: 34px;
}
</style>