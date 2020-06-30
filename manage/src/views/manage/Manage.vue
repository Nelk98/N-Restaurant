<template>
  <div id="manage">
    <manage-list :foodList="foodList"></manage-list>
    <modify-box  v-if="show" :content="modifyContent" @commitModify="commitModify"></modify-box>
    <create-box v-if="cshow" @commitCreate="commitCreate"/>
    <div class="op-bar">
      <div class="search-bar">
        <svg class="icon-font search-icon" aria-hidden="true" @click="searchClick">
          <use xlink:href="#icon-chazhao"></use>
        </svg>
        <input type="text" class="search-input" ref="input" v-model="searchWord">
      </div>
      <div class="search-btn" @click="searchClick" v-if="searchShow">搜索</div>
      <div class="clear-btn" @click="clearClick" v-else>清除</div>
      <div class="create-btn" @click="createClick">新增</div>
    </div>
    <log-list :logs="logs"></log-list>
  </div>
</template>

<script>
import ManageList from './childComps/ManageList'
import ModifyBox from './childComps/ModifyBox'
import LogList from './childComps/LogList'
import CreateBox from './childComps/CreateBox'
import {getFood,
        getFoodDetail,
        modifyFood,
        createFood,
        deleteFood,
        getManageLogs,
        searchFoods} from 'network/food'

import { Notification } from 'element-ui';


export default {
  name: 'Manage',
  components: {
    ManageList,
    ModifyBox,
    LogList,
    CreateBox
  },
  data() {
    return {
      shopId: null,
      foodList: [],
      show: false,
      cshow: false,
      modifyContent: null,
      logs: null,
      searchWord: '',
      searchShow: true
    }
  },
  created() {
    this.shopId = this.$route.params.shopId
    this.getFoods()
    this.getLogs()
  },
  mounted() {

    this.$bus.$on('getLogs', () => {
      this.getLogs()
    })

    this.$bus.$on('modify', (iid) => {
      this.show = true
      getFoodDetail(this.shopId, iid).then(res => {
        if(res.code == 1) {
          this.modifyContent = res.data
        }
      })
    })

    this.$bus.$on('deleteFood', payload => {
      let key = Math.round(Math.random() *89999 + 10000)
      this.$prompt(`请输入数字"${key}"`, '确认删除？').then(ret => {
        if(ret.value == key) {
          deleteFood(this.shopId, payload.iid, payload.name).then(res => {
            if(res.errcode == 1001) {
              Notification.error({
                title: '删除菜品',
                message: '删除失败请重试'
              })
            }else if(res.errcode == '') {
              Notification.success({
                title: '删除菜品',
                message: '删除成功'
              })
              this.getFoods()
              this.getLogs()
            }
          })
        }else {
          Notification.error({
            message: '验证码错误，删除失败。'
          })
        }
      }).catch(err => {
        //取消
      })
    })
  },
  destroyed() {
    this.$bus.$off('modify')
    this.$bus.$off('deleteFood')
    this.$bus.$off('getLogs')
  },
  methods: {
    commitModify(modify) {
      modifyFood(this.shopId, this.modifyContent.iid, modify).then(res => {
          console.log('mod')
        if(res.errcode == '') {
          this.show = false
          Notification.success({
            title: '修改信息',
            message: '操作成功'
          })
          this.getFoods()
          this.getLogs()
        }
      })
    },
    getFoods() {
      getFood(this.shopId).then(res => {
        if(res.code == 1) {
          this.foodList = res.data
        }
      })
    },
    searchClick() {
      this.$refs.input.focus()
    },
    createClick() {
      this.cshow = true
    },
    commitCreate(options) {
      createFood(this.shopId, options).then(res => {
        if(res.errcode == '') {
          Notification.success({
            title: '新增菜品',
            message: '操作成功！'
          })
          this.cshow = false
          this.getFoods()
          this.getLogs()
        }
      })
    },
    getLogs() {
      // 格式化日志时间线
      getManageLogs(this.shopId).then(res => {
        let data = res.data
        let list = {}
        for(let i in data) {
          let time = new Date(data[i].time * 1000)
          let timeline = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
          if(list[timeline]) {
            list[timeline].push(data[i])
          }else {
            list[timeline] = [data[i]]
          }
        }
        this.logs = list
      })

    },
    searchClick() { //点击搜索
      if(this.searchWord.length == 0) {
        return this.$notify.error({
          message: '请输入搜索关键字'
        })
      }
      searchFoods(this.shopId, this.searchWord).then(res => {
        this.foodList = res.data
      })
      this.searchShow = false
    },
    clearClick() {
      this.searchWord = ''
      this.searchShow = true
      this.getFoods()
    }
  }
}
</script>

<style scoped>
#manage {
  width: 100%;
  height: 100%;
  position: relative;
}
.op-bar {
  width: 520px;
  background-color: #fff;
  height: 60px;
  position: absolute;
  top: 30px;
  right: 60px;
  border-radius: 12px;
  box-shadow: 0 0 6px rgba(51, 51, 51, .18);
  display: flex;
  justify-content: flex-start;
}
.search-bar {
  flex: 1;
  height: 46px;
  background-color: #f1f1f1;
  margin-top: 7px;
  margin-left: 10px;
  margin-right: 7px;
  border-radius: 6px;
  position: relative;
  box-shadow: 0 0 6px  rgba(51, 51, 51, .08) inset;
}
.search-icon {
  font-size: 28px;
  color: #000;
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translate3d(0, -50%, 0);
  cursor: pointer;
}
input[type="text"].search-input {
  height: 100%;
  width: 100%;
  padding: 0 20px 0 50px;
  border: none;
  background: none;
  outline: none;
}
.search-btn,
.create-btn,
.clear-btn {
  width: 100px;
  height: 46px;
  border-radius: 6px;
  line-height: 46px;
  margin: 7px 7px 0 0;
  text-align: center;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(51, 51, 51, .38);
  font-size: 14px;
}
.search-btn {
  background-color: #409EFF;
}
.create-btn {
  background-color: #2ecc71;
}
.clear-btn {
  background-color: #eb2f06;
}
</style>