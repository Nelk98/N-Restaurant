<template>
  <div class="shop-info" v-if="shopInfo">
    <div class="header">
      <span class="title">商家简介</span>
      <p>本店将以更优质的服务，秉承不诈不骗，以原生态的精美菜品为前提，以食客吃得放心舒服为最终目标，把选择好食材作为关键，保证所有菜品都是经 过精挑细选，并通过多道程序清洗，确保送到餐桌上的每一份菜都是新鲜、符合卫生标准的，让到店的消费者无后顾之忧，放心食用。</p>
      <img :src="item" v-for="(item, index) in shopInfo.img" :key="index">
    </div>
    <div class="main-box">
      <div class="info-bar">
        <span class="title2">&nbsp;商家名称：</span>
        <span class="title3">{{shopInfo.shopName}}</span>
      </div>
       <div class="info-bar">
        <span class="title2">&nbsp;地址：</span>
        <span class="title3">{{shopInfo.fulladdress}}</span>
      </div>
      <div class="info-bar">
        <span class="title2">&nbsp;电话：</span>
        <span class="title3">0595&nbsp;-&nbsp;{{shopInfo.tell}}&nbsp;<span style="fontFamily: 'icomoon'; verticalAlign: top"></span></span>
      </div>
      <div class="info-bar">
        <span class="title2">&nbsp;营业时间：</span>
        <span class="title3">{{shopInfo.serTime}}</span>
      </div>
      <div class="info-bar">
        <span class="title2">&nbsp;满意度：</span>
        <span class="title3">{{shopInfo.like}}&emsp;/&emsp;{{shopInfo.comment}}</span>
      </div>
    </div>
    <div class="server">
      <span class="title2">商家服务</span>
      <p>已购买食品安全责任险，食品安全有保障</p>
      <p>可开发票，请备注</p>
    </div>
    <div class="complain">投诉申请</div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: {
    shopInfo: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
  .header {
    background-color: #fff;
    position: relative;
    padding: 0 15px;
    padding-bottom: 10px;
    overflow-x: scroll;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .08);
  }
  .main-box {
    background-color: #fff;
    margin: 10px 0;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .08);
  }
  .title {
    font-weight: 500;
    position: absolute;
    top: 20px;
    left: 15px;
  }
  .header img {
    height: 80px;
    width: 80px;
    margin-top: 10px;
    margin-right: 10px;
  }
  .header p{
    font-size: 12px;
    margin-top: 50px;
    color: #3c3c3c;
  }
  .info-bar {
    height: 46px;
    position: relative;
    border-bottom: 1px solid #f3f3f3;
    padding: 0 15px;
  }
  .title2 {
    font-size: 14px;
    line-height: 46px;
    font-weight: 600;
    font-family: 'icomoon';
  }
  .title3 {
    float: right;
    font-size: 12px;
    line-height: 46px;
    color: #3c3c3c;
  }
  .server {
    padding: 0 15px;
    background-color: #fff;
    height: 90px;
  }
  .server p {
    font-size: 12px;
    margin-bottom: 10px;
    color: #3c3c3c;
  }
  .complain {
    height: 49px;
    margin: 20px 10px 10px 10px;
    background-color: #333;
    color: #fff;
    line-height: 49px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 0  6px 1px rgba(0, 0, 0, 0.38);
  }
</style>