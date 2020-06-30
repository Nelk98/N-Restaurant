<template>
  <div id="app">
    <div id="app-login" v-if="!isLogin">
      <div class="bg"></div>
      <div class="login-box">
        <input class="shop-id" type="text" placeholder="店铺id" v-model="shopId">
        <input class="pwd" type="password" placeholder="密码" v-model="pwd">
        <div class="login-btn" @click="login">登录</div>
      </div>
    </div>
    <div id="app-content" v-else>
      <side-bar></side-bar>
      <div id="content-box">
        <!-- <keep-alive> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
      <!-- <control-bar></control-bar> -->
    </div>
  </div>
</template>

<script>
import SideBar from 'components/content/sidebar/SideBar'
import ControlBar from 'components/content/controlbar/ControlBar'
export default {
  name: 'App',
  components: {
    SideBar,ControlBar
  },
  data() {
    return {
      isLogin: false,
      shopId: 'test',
      pwd: '123'
    }
  },
  sockets: {
    connect() {
      console.log('连接成功')
    },
    makeOrder(data) {
      this.$notify.success({
        message: '有新订单哦！'
      })
      this.$bus.$emit('newOrder')
    },
    rehello(data) {
      console.log(data)
    }
  },
  created() {
    let shopId = localStorage.getItem('isLogin')
    if(shopId){
      this.isLogin = true
      this.$socket.emit('shopId', shopId)
      this.$router.replace(`/${shopId}/shop`)
    }
  },
  methods: {
    //测试时代替登录功能
    login() {
      if(!this.shopId || !this.pwd) {
        this.$notify.error({
          message: '请正确填写'
        })
      }else if(this.pwd == '123') {
        this.isLogin = true
        this.$notify.success({
          message: '登录成功'
        })
        this.$socket.emit('shopId', this.shopId)
        localStorage.setItem('isLogin', this.shopId)
        this.$router.replace(`/${this.shopId}/shop`)
      }else {
        this.$notify.error({
          message: '密码错误'
        })
      }
    }
  }
}
</script>

<style>
@import url(assets/css/base.css);
@import url(assets/css/resetEl.css);
#app {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #57606f;
}
#app-login,
#app-content {
  height: calc(100% - 80px);
  margin: 40px 60px;
  border-radius: 46px;
  position: relative;
  box-shadow: -3px 0 36px 5px rgba(0, 0, 0, 0.18);
  overflow: hidden;
}
#app-login {
  background-color: #fff;
  background-size: cover;
}
.bg {
  width: 100%;
  height: 100%;
  background: url(~assets/img/login-bg.jpeg);
  background-size: cover;
  filter: blur(2  px);
}
.login-box {
  position: absolute;
  padding: 20px 30px;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.18);
  border-radius: 6px;
}
.shop-id,
.pwd {
  display: block;
  margin: 10px;
  width: 200px;
  height: 44px;
  padding: 0 10px;
}
.login-btn {
  margin: 10px;
  height: 44px;
  width: 200px;
  line-height: 44px;
  text-align: center;
  border-radius: 3px;
  background-color: #2ecc71;
  color: #fff;
  cursor: pointer;
}
#content-box {
  background-color: #f7f8fa;
  position: absolute;
  top: 0;
  left: 108px;
  right: 0;
  bottom: 0;
  border-radius: 46px 0 0 46px;
  /* padding: 0 50px; */
}
#content-box::after {
  content: '';
  height: 100%;
  width: 50px;
  position: absolute;
  right: -50px;
  top: 0;
  background-color: #f7f8fa;
}
</style>
