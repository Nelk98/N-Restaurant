<template>
  <div id="side-bar">
    <side-bar-list>
      <side-bar-item v-for="item in routes" :key="item.path" :icon="item.icon" :tip="item.tip"  @click.native="toggle(item.path)" :class="{choose: isChoose(item.path)}"></side-bar-item>
    </side-bar-list>
    <div class="log-out" @click="logout">
      <svg class="icon-font" aria-hidden="true">
        <use xlink:href="#icon-tuichu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import SideBarItem from './SideBarItem'
import SideBarList from './SideBarList'
export default {
  name: 'SideBar',
  components: {
    SideBarItem,
    SideBarList
  },
  data() {
    return {
      routes: [
        {path: '/shop',icon:'&#xe649;'},
        {path: '/order',icon:'&#xe65f;'},
        {path: '/report',icon:'&#xe6ac;'},
        {path: '/manage',icon:'&#xe677;'},
        {path: '/comment',icon:'&#xe662;'},
        {path: '/setting',icon:'&#xe68a;'}
      ]
    }
  },
  methods: {
    toggle(path) {
      let shopId = this.$route.params.shopId
      this.current = path
      this.$router.replace('/'+shopId + path)
    },
    isChoose(path) {
      return this.$route.path.indexOf(path) != -1
    },
    logout() {
      localStorage.removeItem('isLogin')
      this.$router.go(0)
    }
  },
  mounted() {
    this.$bus.$on('orderCount', count => {
      this.routes.forEach((item, index) => {
        if(item.path === '/order') {
          let obj = item
          obj.tip = count
          this.routes.splice(index, 1, obj)
        }
      })
    })
  }
}
</script>

<style scoped>
#side-bar {
 width: 108px;
 background-color: #2a2e31;
 height: 100%;
 position: relative;
}
#side-bar::after {
  content: '';
  height: 100%;
  width: 50px;
  background-color: #2a2e31;
  position: absolute;
  right: -50px;
}
.log-out {
  height: 60px;
  width: 60px;
  background-color: #35373d;
  margin-bottom: 24px;
  border-radius: 10px;
  font-size: 28px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  font-family: 'iconfont';
  position: absolute;
  bottom: 20px;
  left: 24px;
}
.icon-font {
  font-size: 24px;
}
</style>