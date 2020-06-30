<template>
  <div class="calendar">
    <div class="title">{{year}}&nbsp;年&nbsp;{{month}}&nbsp;月
      <span class="al" @click="lastMonth" v-show="!islast">&#xe679;</span>
      <span class="ar" @click="nextMonth" v-show="islast">&#xe6a3;</span>
    </div>
    <div class="weekday">
      <span>一</span>
      <span>二</span>
      <span>三</span>
      <span>四</span>
      <span>五</span>
      <span>六</span>
      <span style="color: red">日</span>
    </div>
    <div class="date-box">
        <span class="place" v-for="count in place" :key="'p'+count"></span>
        <date-item v-for="count in days" :key="month+'-'+count" 
        :date="count" @click.native="itemClick(count)" 
        :class="{choose: count==current.d && month==current.m, today: today.d==count&&month==today.m, future: month==today.m&&count>today.d}"></date-item>
    </div>
  </div>
</template>

<script>
import DateItem  from './DateItem'
export default {
  nname: 'Calendar',
  components: {
    DateItem
  },
  data() {
    return {
      days: null, //有多少天
      year: 1970,
      month: 1,
      place: 0,
      current: {m: 1, d: 1},
      top: 0,
      left: 0,
      today: 0,
      islast: false
    }
  },
  created() {
    this.getInitial()
  },
  methods: {
    itemClick(date) {
      if(this.month==this.today.m && date > this.today.d) {
        return; //未来的日期无法点击
      }
      this.current = {m: this.month, d: date}
      let cdate = this.year+'-'+this.current.m+'-'+this.current.d
      this.$emit('chooseDate', cdate)
      // console.log(this.year+'-'+this.current.m+'-'+this.current.d)
    },
    getInitial() {
      // let d = new Date("2021-1-21")
      let d = new Date()
      this.year = d.getFullYear()
      this.month = d.getMonth() +1
      this.today = {m: d.getMonth() +1, d: d.getDate()}
      this.current = {m: d.getMonth() +1, d: d.getDate()}
      d.setDate(1) //设置成本月1号
      let first = d.getDay() - 1 // 1 号是礼拜几
      this.place = first == -1 ? 6 : first //1号之前需要空多少个格子
      d.setMonth(d.getMonth()+1)
      let dayCount = new Date(d.getFullYear(),d.getMonth(),0).getDate() //获取当月天数
      this.days = dayCount 
    },
    lastMonth() {
      this.islast = true
      if(this.month == 1) { //1月 ~ 前一年 12月
        this.year--
        this.month = 12
      }else {
        this.month--
      }
      this.gatCalendar()
    },
    nextMonth() {
      this.islast = false
      if(this.month == 12) {
        this.year++
        this.month = 1
      }else {
        this.month++
      }
      this.gatCalendar()
    },
    gatCalendar() {
      console.log(this.month)
      let d = new Date(this.year+'-'+this.month+'-1')
      d.setDate(1) //设置成本月1号
      let first = d.getDay() - 1 // 1 号是礼拜几
      this.place = first == -1 ? 6 : first //1号之前需要空多少个格子
      d.setMonth(d.getMonth()+1)
      let dayCount = new Date(d.getFullYear(),d.getMonth(),0).getDate() //获取当月天数
      this.days = dayCount
    },
    refresh() {
      this.current = {m: this.today.m, d: this.today.d}
    }
  }
}
</script>

<style scoped>
.calendar {
  height: 500px;
  margin-left: 7px;
  margin-right: 7px;
  margin-top: 50px;
}
.title {
  font-size: 20px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  position: relative;
}
.weekday {
  height: 36px;
  display: flex;
  border-bottom: 1px solid #f3f3f3;
  margin-bottom: 10px;
}
.weekday span {
  width: 46px;
  text-align: center;
  line-height: 36px;
  font-size: 12px;
  font-weight: 600;
}
.date-box {
  display: flex;
  flex-wrap:wrap;
	align-content:flex-start;
  position: relative;
}
.place {
  width: 46px;
  height: 46px;
}
.al,
.ar {
  font-family: 'iconfont';
  font-size: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.al {
  left: 10px;
}
.ar {
  right: 10px;
}
</style>