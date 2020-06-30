<template>

  <div class="way">
    <div class="tab-block1" @click="shop" :class="{unchoose: !isShop}">店内用餐</div>
    <div class="tab-block2" @click="take"  :class="{unchoose: isShop}">打包带走</div>
      <!-- 店内用餐 -->
    <div v-show="isShop">
      <div class="title">
        <div v-if="!current">请选择就座桌号</div>
        <div v-else>您选择了桌号：{{current}}</div>
      </div>
      <div class="table-list clear-fix">
        <div class="table-item" v-for="count in 21" :key="count" 
        :class="{choose: count == current}" @click="itemClick(count)">{{count}}</div>
      </div>
    </div>
      <!-- 打包带走 -->
    <div class="box" v-show="!isShop">
      <div class="tree"></div>
      <p class="green">倡导绿色低碳习惯，减少对一次性餐具的使用<br>感谢您为环保作出贡献</p>
      <div class="pack">
        <span>一次性餐具</span>
        <div class="op">
          <span class="decreasement" @click="decreasement"></span>
          <span class="count">{{packCount}}</span>
          <span class="increasement" @click="increasement"></span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'WayTab',
  data() {
    return {
      current: null,
      isShop: true,
      packCount: 0
    }
  },
  methods: {
    itemClick(index) {
      this.current = index
    },
    shop() {
      this.isShop = true
    },
    take() {
      this.isShop = false
    },
    decreasement() {
      if(this.packCount > 0) {
        this.packCount--
      }
    },
    increasement() {
      this.packCount++
    }
  },
  watch: {
    packCount() {
      this.$emit('packChange', this.packCount)
    },
    isShop() {
      this.$emit('shopTake', this.isShop)
    },
    current() {
      this.$emit('tableChoose', this.current)
    }
  }
}
</script>

<style scoped>

  .way{
    margin: 5px 10px;
    border-radius: 5px ;
    padding-top: 40px;
    overflow: hidden;
    position: relative;
    perspective: 1000px;
  }
  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    background-color: #fff;
    border-bottom: 1px solid #f3f3f3;
    font-weight: 700;
    position: relative;
    font-size: 16px;
    border-radius: 0 5px 0 0;
  }
  .table-list {
    background-color: #fff;
    padding-bottom: 10px;
  }
  .table-item {
    width: 30px;
    height: 30px;
    background-color: #f3f3f3;
    float: left;
    margin-top: 13px;
    margin-left: 13px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
  }
  .choose {
    background-color: #b8e994;
  }
  .tab-block1,
  .tab-block2 {
    width: 200px;
    height: 40px;
    background-color: #fff;
    position: absolute;
    top: 0px;
    border-radius: 5px 5px 0 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 40px;
    text-align: center;
    z-index: 2;
  }
  .tab-block1::after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 38px 0 0 20px;
    border-color: transparent transparent transparent #fff;
    position: absolute;
    right: -19px;
    bottom: 0;
  }
  .tab-block2 {
    right: 0;
  }
  .tab-block2::before {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width:  0 0 38px 20px;
    border-color: transparent transparent  #fff transparent;
    position: absolute;
    left: -19px;
    bottom: 0; 
  }
  .unchoose {
    background-color: #fff;
    z-index: -1;
    transform: translateZ(-50px);
    line-height: 34px;
    opacity: .5;
  }
  .box {
    background-color: #fff;
    border-radius: 5px 0 0 0 ;
  }
  .pack {
    height: 60px;
    position: relative;
    font-size: 16px;
  }
  .pack>span {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate3d(0, -50%, 0);
  }
  .op {
    width: 81px;
    height: 26px;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate3d(0, -50%, 0);
  }
  .decreasement,
  .increasement {
    display: block;
    width: 27px;
    font-family: 'icomoon';
    font-size: 26px;
  }
  .count {
    width: 27px;
    font-size: 16px;
    text-align: center;
    line-height: 28px;
    float: left;
  }
  .decreasement {
    float: left;
  }
  .increasement {
    float: right;
  }
  .green {
    font-size: 12px;
    line-height: 20px;
    color: green;
    padding-top: 10px;
    padding-left: 10px;
  }
  .tree {
    width: 110px;
    height: 50px;
    position: absolute;
    top: 50px;
    right: 0;
    background: url(~assets/images/tree.png);
    background-size: cover;
  }
</style>