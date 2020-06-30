<template>
  <nav-bar class="nav">
    <template v-slot:left>
      <div class="back" @click="back"></div>
    </template>
    <template v-slot:center>
      订单评论
    </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'CommentNavBar',
  components: {
    NavBar
  },
  methods: {
    back() {
      this.$router.replace('/order')
    }
  }
}
</script>

<style>
.nav {
  background-color: #4fc08d;
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 999;
}
.back {
  font-family: 'icomoon';
  font-size: 30px;
}
</style>