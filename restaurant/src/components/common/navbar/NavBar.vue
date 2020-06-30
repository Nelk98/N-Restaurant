<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
  .nav-bar {
    width: 100%;
    height: 44px;
    display: flex;
    line-height: 44px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    /* box-shadow: 0 2px 2px rgba(0, 0, 0, .3); */
    /* position: fixed;
    top: 0;
    left: 0;
    z-index: 999; */
  }
  .left,
  .right{
    flex: 1;

  }
  .center {
    flex: 5
  }
</style>