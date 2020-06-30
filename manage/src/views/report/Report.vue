<template>
  <div id="report">
    <div class="date-bar">
      <span v-for="count in 7" :key="count" :class="{choose: count == choose}" @click="dateChoose(count)">{{count | time}}</span>
    </div>
    <div class="title">
      <div class="title-block1">
        <svg class="icon-font" aria-hidden="true">
          <use xlink:href="#icon-huabanfuben"></use>
        </svg>
        <span class="block-desc">订单数</span>
        <span class="block-text">{{count}}</span>
      </div>
      <div class="title-block2">
        <svg class="icon-font" aria-hidden="true">
          <use xlink:href="#icon-huaban"></use>
        </svg>
        <span class="block-desc">营收</span>
        <span class="block-text">{{income.toFixed(2)}}</span>
      </div>
    </div>
    <div class="week-chart">
      <ve-line :data="weekData" height="430px" :settings="chartSettings"></ve-line>
    </div>
    <div class="day-chart">
      <ve-histogram :data="dayData" height="728px"></ve-histogram>
    </div>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import {getReport} from 'network/report'

let that
export default {
  name: 'Report',
  components: {
    VeLine,
    VeHistogram
  },
  data () {
    return {
      chartSettings: {
        area: true,
      },
      weekData: {},
      dayData: {},
      chartExtend: {
        color:['#b8e994','#27ae60']
      },
      shopId: null,
      today: 0,
      current: 0,
      choose: 7,
      income: 0,
      count: 0,
      originData: null,
      originList: null
    }
  },
  filters: {
    time(count) {
      let time = new Date((that.today + (count - 7) * 24 * 60 * 60)*1000)
      return time.getMonth() + 1 + '-' + time.getDate()
    }
  },
  methods: {
    getToday () {
      let date = new Date()
      let times = date.getTime()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      let dayTime = times - hour * 3600 * 1000 - minute * 60 * 1000 - second * 1000
      return Math.floor(dayTime/1000)
    },
    /*************周报**************/
    getWeek() {
      let list = this.originList
      let obj = {}
      obj.columns = ['data', '营收', '订单数']
      obj.rows = []
      let newList = {}
      let today = this.today
      for(let i = 0; i < 7 ; i++,today-= 24 * 60 * 60 ) {
        let time = new Date(today*1000)
        newList[today] = {
          'data': time.getMonth() + 1 + '-' + time.getDate(),
          '营收': 0,
          '订单数': 0
        }
      }
      //js 对象根据数字型键值 自动排序 ？？？？
      for(let i in list) {
        newList[list[i].today]['营收'] = list[i].income
        newList[list[i].today]['订单数'] = list[i].count
      }
      for(let i in newList) {
        obj.rows.push(newList[i])
      }
      this.weekData = obj
    },
    /*************日报**************/
    getDay() {
      let list = this.originData
      let dayList = [] //获取当日数据
      for(let i in list) {
        if(list[i].today == this.current) {
          dayList.push(list[i])
        }
      }

      // dayList.sort(this.upSort("hour"))
      //js 对象根据数字型键值 自动排序 ？？？？
      // console.log(dayList)

      //设置必须显示的时间段 8 - 21 点
      let newList = {}
      for(let i = 8; i<22; i++) {
        newList[i]={
          'data': i + ':00',
          '营收': 0,
          '订单数': 0
        }
      }

      // 数据表 需要的数据对象 
      let obj = {}
      obj.columns = ['data', '营收', '订单数']
      obj.rows = []
      
      //根据时间 替换数据
      for(let i in dayList) {
        newList[dayList[i].hour] = {
          'data': dayList[i].hour + ':00',
          '营收': dayList[i].income,
          '订单数': dayList[i].count
        }
      }
      for(let i in newList) {
        obj.rows.push(newList[i])
      }

      // console.log(newList)
      this.dayData = obj
    },
    upSort(hour) {
      return function (a,b) {
        return a.hour - b.hour;
      }
    },
    dateChoose(count) {
      this.current = this.today + (count - 7) * 24 * 60 * 60
      this.choose = count
      this.getDay()
      this.getCount()
    },
    getCount() {
      let list = this.originList
      // this.count = list[this.current].count
      // this.income = list[this.current].income
      // if(!list[this.current]) {
      //   this.income = 0
      //   this.count = 0
      //   return false
      // }
      let income = list[this.current] && list[this.current].income || 0
      let count = list[this.current] && list[this.current].count || 0
      let now = 1
      let timer = setInterval(() => {
        this.income = income * (now/20)
        this.count = Math.floor(count * (now/20))
        now++
        if(now == 21) {
          clearInterval(timer)
        }
      }, 25);
    }
  },
  created() {
    that = this
    this.shopId = this.$route.params.shopId
    this.today = this.getToday() //系统当天
    // this.today = 1586361600 - ( 0 * 24 * 60 * 60) //2002.02.09 - 偏移天数
    this.current = this.today
    getReport(this.today, this.shopId).then(res => {
      let data = res.data
      this.originData = res.data //原始数据
      let list = {}
      for(let i in data) {
        if(list[data[i].today]) {
          list[data[i].today].income += data[i].income
          list[data[i].today].count += data[i].count
        }else {
          list[data[i].today] = {
            today: data[i].today,
            income: data[i].income,
            count: data[i].count
          }
        }
      }
      this.originList = list //按日期分类好的列表
      this.getCount()
      this.getWeek()
      this.getDay()
    })
  }
}
</script>

<style scoped>
#report {
  height: 100%;
  width: 100%;
  /* background-color: pink; */
  position: relative;
  border-radius: 46px;
  overflow: hidden;
}
.date-bar {
  width: calc(50% - 90px);
  height: 100px;
  background-color: #fff;
  position: absolute;
  top: 30px;
  left: 60px;
  border-radius: 16px;
  box-shadow: 1px 1px 5px rgba(51, 51, 51, .18),-1px -1px 5px rgba(51, 51, 51, .18);
  display: flex;
  overflow: hidden;
}
.date-bar span{
  flex: 1;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  position: relative;
}
.title {
  width: calc(50% - 90px);
  height: 200px;
  position: absolute;
  top: 150px;
  left: 60px;
  display: flex;
}
.title-block1,
.title-block2 {
  flex: 1;
  margin: 0 10px;
  border-radius: 16px;
  box-shadow: 1px 1px 5px rgba(51, 51, 51, .18),-1px -1px 5px rgba(51, 51, 51, .18);
  position: relative;
  color: #273c75;
  background-color: #fff;
}
.title-block1 {
  margin-left: 0;
}
.title-block2 {
  margin-right: 0;
}
.block-desc {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.block-text {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  font-size: 40px;
}
.week-chart {
  width: calc(50% - 90px);
  position: absolute;
  top: 370px;
  left: 60px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 1px 1px 5px rgba(51, 51, 51, .18),-1px -1px 5px rgba(51, 51, 51, .18);
}
.icon-font {
  font-size: 70px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.day-chart {
  width: calc(50% - 90px);
  position: absolute;
  top: 30px;
  right: 60px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 1px 1px 5px rgba(51, 51, 51, .18),-1px -1px 5px rgba(51, 51, 51, .18);
}
.choose::after {
  content: '';
  width: 50%;
  height: 6px;
  background-color: #2e86de;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
</style>