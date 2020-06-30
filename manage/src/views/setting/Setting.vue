<template>
  <div id="setting">
    <div class="common">
      <common-setting/>
    </div>
    <div class="admin">
      <div class="admin-cloak" v-if="cloakShow">
        <strong class="admin-tip">访问前需验证管理员身份</strong>
        <input type="password" v-model="pwd" placeholder="密码">
        <span class="check-btn" @click="checkIn">点击验证</span>
      </div>
      <Admin v-if="!cloakShow"/>
    </div>
  </div>
</template>

<script>
import Admin from './childComps/Admin'
import CommonSetting from './childComps/CommonSetting'
export default {
  name: 'Setting',
  components: {
    Admin,
    CommonSetting
  },
  data() {
    return {
      pwd: '123',
      cloakShow: true
    }
  },
  methods: {
    checkIn() {
      if(this.pwd == '123') {
        this.cloakShow = false
        this.$notify.success({
          message: '验证成功'
        })
      }else {
        this.$notify.error({
          message: '验证失败'
        })
      }
    }
  }
}
</script>

<style scoped>
#setting {
  width: 100%;
  height: 100%;
  border-radius: 46px;
  position: relative;
  display: flex;
  justify-content: space-evenly;
}
.common,
.admin {
  margin: 40px 0;
  width: calc(50% - 60px);
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 6px rgba(51, 51, 51, .28);
  overflow: hidden;
  position: relative;
}
.admin-cloak {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
}
.cloak-hide {
  transform: translate3d(100%, 0, 0);
  transition: transform .3s linear;
}
.admin-tip {
  font-size: 20px;
  color: #2a2e31;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
input[type=password] {
  width: 200px;
  height: 44px;
  position: absolute;
  top: 260px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  padding: 0 10px;
}
.check-btn {
  width: 200px;
  height: 49px;
  background-color: #2a2e31;
  color: #fff;
  line-height: 49px;
  text-align: center;
  border-radius: 6px;
  position: absolute;
  top: 350px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  cursor: pointer;
}
</style>