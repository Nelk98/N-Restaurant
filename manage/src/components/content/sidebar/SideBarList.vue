<template>
  <div class="side-bar-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SideBarList'
}
</script>

<style>
.side-bar-list {
  width: 60px;
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%)
}
</style>