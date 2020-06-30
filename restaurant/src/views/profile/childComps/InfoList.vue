<template>
  <div class="info-list" v-if="profile">
    <info-item title="基本信息">
      <template v-slot:content>
        <div class="info-box">
        </div>
      </template>
    </info-item>
    <info-item title="数据统计">
      <template v-slot:content>
        <div class="info-box">
        </div>
      </template>
    </info-item>
    <info-item title="优惠券">
      <template v-slot:right>
        <span class="coupon-btn" @click.stop="couponClick">积分兑换</span>
      </template>
      <template v-slot:content>
        <div class="info-box">
        </div>
      </template>
    </info-item>
    <info-item title="备注信息">
      <template v-slot:content>
        <div class="info-box"></div>
      </template>
    </info-item>
  </div>
</template>

<script>
import InfoItem from './InfoItem'
export default {
  name: 'InfoList',
  components: {
    InfoItem
  },
  props: {
    profile: {
      type: Object,
      default: null
    }
  },
  methods: {
    couponClick() {
      this.$router.replace('/coupon')
    }
  }
}
</script>

<style scoped>
  .info-list {
    width: 360px;
    background-color: #fff;
    margin: 10px auto;
    border-radius: 4px;
    box-shadow: 0 0 6px 1px rgba(0, 0, 0, .1);
    overflow: hidden;
  }
  .info-box {
    background-color: #fff;
    border-bottom: 1px solid #f3f3f3;
  }
  .coupon-btn {
    padding: 8px;
    background-color: #0a3d62;
    font-size: 10px;
    border-radius: 5px;
    color: #fff;
    vertical-align: top;
  }
  .score {
    margin-right: 20px;
    font-size: 12px;
  }
</style>