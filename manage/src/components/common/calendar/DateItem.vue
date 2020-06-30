<template>
  <span class="date-item">{{date}}</span>
</template>

<script>
export default {
  name: 'DateItem',
  props: {
    date: {
      type: Number
    }
  }
}
</script>

<style scoped>
.date-item {
  width: 36px;
  height: 36px;
  margin: 5px;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  transition: color .6s;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  transition: all .6s;
}
.today {
  background-color: #888;
  color: #fff;
}
.choose {
  color: #fff;
  background-color: #eb2f06;
}
.future {
  color: #d8d8d8;
  cursor: not-allowed;
}

</style>