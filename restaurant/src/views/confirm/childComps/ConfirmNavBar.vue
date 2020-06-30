<template>
  <nav-bar class="nav">
    <template v-slot:left>
      <div class="back" @click="back"></div>
    </template>
    <template v-slot:center>确认订单</template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'ConfirmNavBar',
  components: {
    NavBar
  },
  methods: {
    back() {
      let shopId = this.$route.params.shopId
      this.$router.replace('/shop/' + shopId)
    }
  }
}
</script>

<style scoped>
.nav {
  /* background-color:#409EFF; */
  color: #333;
  box-shadow: none;
  position: relative;
  z-index: 999;
}
.back {
  font-family: 'icomoon';
  font-size: 30px;
}
</style>