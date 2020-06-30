<template>
  <div id="app">
        <!-- display content -->
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
    <!-- tab-bar -->
    <main-tab-bar class="tab" v-show="this.show"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'
import { isLogin, getUserInfo } from 'network/login'

export default {
  name: 'App',
  components: {
    MainTabBar
  },
  data() {
    return {
      show: true,
      path: [ '/home', '/order', '/profile']
    }
  },
  methods: {
   

  },
  watch: {
    $route() {
      if(this.path.indexOf(this.$route.path) != -1) {
        this.show = true
      }else {
        this.show = false
      }
    }
  },
  mounted() {
    console.log('Vue App Start ...')
    isLogin().then(ret => {
      if(!ret.isLogin){
        if(this.$route.path != '/login') {
          this.$router.replace('/login')
        }
      }else {
        console.log(ret.data)
        this.$store.commit('setInfo', ret.data)
        if(this.$route.path == '/login') {
          this.$router.replace('/home')
        }
      }
    })
  }
}
</script>

<style>
@import 'assets/css/base.css';
@import 'assets/css/resetVant.css';
#app {
  width: 100vw;
}

.tab {
  position: fixed;
  bottom: 0;
}
</style>
