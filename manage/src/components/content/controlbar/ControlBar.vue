<template>
  <div id="control-bar">
    <calendar @chooseDate="chooseDate"></calendar>
  </div>
</template>

<script>
import Calendar from 'components/common/calendar/Calendar'
export default {
  name: 'ControlBar',
  components: {
    Calendar
  },
  methods: {
    chooseDate(date) {
      this.$emit('chooseDate', date)
    }
  }
}
</script>

<style scoped>
#control-bar {
  background-color: #fff;
  width: 336px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 36px 46px 46px 36px;
  box-shadow: -3px 0 20px rgba(0, 0, 0, 0.08);
}
</style>