<template>
  <div class="order-list clear-fix">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OrderList'
}
</script>

<style scoped>
.order-list {
  width: 716px;
  margin-left: 20px;
  /* background-color: pink; */
}
</style>