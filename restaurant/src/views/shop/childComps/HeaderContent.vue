<template>
  <div class="header-content" v-if="shopInfo">
    <div class="bgc" :style="{'background': 'url('+ shopInfo.img[0]+')','backgroundSize': '100% 100%'}"></div>
    <div class="card">
      <img class="avatar" :src="shopInfo.shopPic">
      <span class="name">永和大王&nbsp;<span style="fontSize: 14px">({{shopInfo.shopName}})</span></span>
      <div class="coupon">
        <span class="discount" v-for="(item,index) in shopInfo.discounts" :key="index">满&nbsp;{{item.attain}}&nbsp;减&nbsp;{{item.discount}}</span>
      </div>
      <span class="tip">公告：{{shopInfo.tip}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderContent',
  props: {
    shopInfo: Object
  }
}
</script>

<style scoped>
  .header-content {
    height: 240px;
    background-color: #fff;
    position: relative;
  }
  .bgc {
    height: 160px;
    width: 100vw;
    filter: brightness(0.7);
  }
  .card {
    height: 120px;
    background-color: #fff;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    box-shadow: 0 0px 10px 1px rgba(0, 0, 0, .08);
    border-radius: 5px;
  }
  .avatar {
    width: 66px;
    height: 66px;
    background-color: #f3f3f3;
    position: absolute;
    top: -24px;
    right: 20px;
    border-radius: 3px;
  }
  .card::before {
    content: '';
    width: 76px;
    height: 40px;
    background-color: #fff;
    position: absolute;
    right: 15px;
    top: -28px;
    border-radius: 5px 5px 0 0;
  }
  span.name {
    font-size: 20px;
    font-weight: 600;
    position: absolute;
    top: 15px;
    left: 20px;
  }
  .tip {
    font-size: 12px;
    color: #888;
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
  .coupon {
    font-size: 12px;
    position: absolute;
    top: 60px;
    left: 15px;
  }
  span.discount {
    padding: 3px 5px;
    background-color: #eb2f06;
    color: #fff;
    margin-right: 10px;
    font-size: 12px;
  }
</style>