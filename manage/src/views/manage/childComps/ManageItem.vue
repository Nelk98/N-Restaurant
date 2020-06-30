<template>
  <div class="manage-item" :class="{'sold-out': !info.onsale}">
    <img :src="info.img" class="pic">
    <div class="info-box">
      <span class="name">{{info.name}}</span>
      <span class="desc">{{info.desc}}</span>
      <span class="category">分类：{{info.category}}</span>
      <span class="sold">销量：{{info.sold}}</span>
      <div class="tags">
        <span class="tag" v-if="info.tags.cold" :style="{backgroundColor: color[0]}">冰</span>
        <span class="tag" v-if="info.tags.hot" :style="{backgroundColor: color[1]}">辣</span>
        <span class="tag" v-if="info.tags.sour" :style="{backgroundColor: color[2]}">酸</span>
        <span class="tag" v-if="info.tags.sweet" :style="{backgroundColor: color[3]}">甜</span>
      </div>
    </div>
    <span class="price"><span style="fontSize: 12px">&yen;&nbsp;</span>{{info.price}}</span>
    <div class="silk" v-if="info.tags.tw"></div>
    <el-switch class="switch" v-model="info.onsale" active-color="#13ce66"
    inactive-color="#ff4949" @click.native="itemClick"></el-switch>
    <div class="modify-btn" @click="modifyClikc">修改</div>
    <div class="delete-btn" @click="deleteClick">删除</div>
  </div>
</template>

<script>
import { Notification } from 'element-ui';

import {changeOnsale} from 'network/food'
export default {
  name: 'ManageItem',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      color: ['#00a8ff', '#eb2f06', '#f6b93b', '#78e08f'],
      onsale: true
    }
  },
  methods: {
    itemClick() {
      changeOnsale(this.info.shopId, this.info.iid, this.info.onsale, this.info.name).then(res => {
        if(res.code == 1 && this.info.onsale) {
          Notification.success({
            message: `${this.info.name} 上架成功~`
          })
        }else if(res.code == 1 && !this.info.onsale ) {
          Notification.success({
            message: `${this.info.name} 下架成功~`
          })
        }else {
          Notification.error({
            message: '状态变更失败！'
          })
        }
        this.$bus.$emit('getLogs')
      })
    },
    modifyClikc() {
      this.$bus.$emit('modify', this.info.iid)
      
    },
    deleteClick() {
      this.$bus.$emit('deleteFood', {iid: this.info.iid, name: this.info.name})
    }
  }
}
</script>

<style scoped>
.manage-item {
  width: 480px;
  height: 200px;
  background-color: #fff;
  box-shadow: 1px 1px 6px rgba(51, 51, 51, .1), -1px -1px 6px rgba(51, 51, 51, .1);
  border-radius: 16px;
  margin: 10px;
  float: left;
  position: relative; 
}
.sold-out {
  background-color: #ffeaa7;
}
img.pic {
  width: 120px;
  height: 120px;
  position: absolute;
  top: 10px;
  left: 10px;
}
.info-box {
  position: absolute;
  top: 20px;
  left: 140px;
  right: 60px;
  bottom: 20px;
}
.name {
  font-size: 22px;
  font-weight: 600;
  width: 100%;
  display: block;
}
.category {
  display: block;
  font-size: 14px;
  width: 100%;
  margin: 12px 0;
  color: #2d3436;
}
.desc {
  display: block;
  margin: 12px 0;
  width: 100%;
  font-size: 14px;
  color: #2d3436;
}
.sold {
  display: block;
  font-size: 14px;
  color: #2d3436;
}
.price {
  font-size: 28px;
  position: absolute;
  top: 20px;
  right: 20px;
}
.tags {
  margin-top: 12px;
  width: 100%;
  height: 23px;
}
span.tag {
  float: left;
  width: 18px;
  height: 18px;
  margin: 2px;
  border-radius: 3px;
  line-height: 18px;
  text-align: center;
  font-size: 12px;
  color: #fff;
}
.silk {
  width: 50px;
  height: 50px;
  background: url(~assets/img/silk.png);
  background-size: 50px 50px;
  position: absolute;
  top: -2px;
  left: -3px;
}
.switch {
  position: absolute;
  bottom: 20px;
  left: 30px;
}
.modify-btn,
.delete-btn {
  padding: 8px 12px;
  color: #fff;
  position: absolute;
  bottom: 20px;
  border-radius: 6px;
  font-size: 14px;
  display: none;
  cursor: pointer;
}
.modify-btn {
  background-color: #28cd6b;
  right: 90px;
}
.delete-btn {
  background-color: #eb2f06;
  right: 20px;
}
.manage-item:hover .modify-btn,
.manage-item:hover .delete-btn {
  display: block;
}
</style>