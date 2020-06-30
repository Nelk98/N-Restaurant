<template>
  <scroll class="common-setting">
    <template v-if="shopInfo">
      <div class="shop-setting">
        <div class="setting-item">
          <span class="title">门店 ID</span>
          <input type="text" :value="shopInfo.shopId" disabled>
        </div>
        <div class="setting-item">
          <span class="title">门店名</span>
          <input type="text" v-model="shopInfo.shopName">
        </div>
        <div class="setting-item">
          <span class="title">地址</span>
          <input type="text" v-model="shopInfo.address">
        </div>
        <div class="setting-item">
          <span class="title">完整地址</span>
          <input type="text" v-model="shopInfo.fulladdress">
        </div>
        <div class="setting-item">
          <span class="title">经纬度</span>
          <input type="text" :value="'( lng：' + shopInfo.lng + '，lat：' + shopInfo.lat +' )'" disabled>
        </div>
        <div class="setting-item">
          <span class="title">服务时间</span>
          <input type="text" v-model="shopInfo.serTime">
        </div>
        <div class="setting-item">
          <span class="title">公告</span>
          <textarea v-model="shopInfo.tip"></textarea>
        </div>
        <img  class="shop-avatar" :src="shopInfo.shopPic">
        <div class="img-box">
          <img class="img" v-for="(item,index) in shopInfo.img" :key="index" :src="item"/>
          <div class="img-add-btn" @click="addClick"></div>
          <!-- <a v-for="(item,index) in shopInfo.img" :key="index" :href="item" target="_blank">门店图片{{index+1}}：{{item}}</a> -->
        </div>
        <div class="commit-btn" @click="commit">确认修改</div>
      </div>
    </template>
    
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import { getShopInfo } from "network/common";
export default {
  name: 'CommonSetting',
  components: {
    Scroll
  },
  data() {
    return {
      shopId: null,
      shopInfo: null
    }
  },
  methods: {
    getShopInfo() {
      getShopInfo(this.shopId).then(res => {
        this.shopInfo = res.data
      })
    },
    addClick() {
      this.$notify.error({
        message: '暂不支持修改'
      })
    },
    commit() {
      this.$notify.error({
        message: '暂不支持修改'
      })
    }
  },
  created() {
    this.shopId = this.$route.params.shopId
    this.getShopInfo()
  }
}
</script>

<style scoped>
.common-setting {
  width: 100%;
  height: 100%;
  padding-left: 20px;
}
.shop-setting {
  margin: 20px;
  /* box-shadow: 0 0 6px rgba(51, 51, 51, .18); */
  padding: 10px;
  position: relative;
}
.setting-item {
  margin: 20px auto;
}
span.title {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 14px;
}
input[type=text] {
  width: 300px;
  height: 38px;
  padding-left: 10px;
  color: #333;
  border: 1px solid #c3c3c3;
  outline: none;
  background-color: #f3f3f3;
  font-size: 14px;
}
input:disabled {
  cursor: not-allowed;
}
textarea {
  width: 300px;
  height: 80px;
  resize: none;
  padding: 10px;
  color: #333;
  border: 1px solid #c3c3c3;
  outline: none;
  background-color: #f3f3f3;  
  font-size: 14px;
}
img.shop-avatar {
  position: absolute;
  right: 136px;
  top: 20px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.img-box {
  position: absolute;
  width: 380px;
  top: 200px;
  right: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.img-box .img,
.img-add-btn {
  width: 48%;
  margin-bottom: 16px;
  display: block;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
}
.img-add-btn {
  background-color: #f1f1f1;
}
.img-add-btn::after {
  font-size: 50px;
  color: #888;
  content: '＋';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.img-box a {
  display: block;
  margin: 10px;
}
.commit-btn {
  position: absolute;
  bottom: 36px;
  right: 100px;
  width: 200px;
  height: 49px;
  line-height: 49px;
  text-align: center;
  color: #fff;
  border-radius: 6px;
  background-color: #2ecc71;
  cursor: pointer;
}
</style>