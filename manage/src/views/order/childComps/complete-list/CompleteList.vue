<template>
  <div class="complete-list">
    <div class="list1">
      <complete-item v-for="item in list1" :key="item.orderId" :info="item"/>
    </div>
    <div class="list2">
      <complete-item v-for="item in list2" :key="item.orderId" :info="item"/>
    </div>
    <div class="list3">
      <complete-item v-for="item in list3" :key="item.orderId" :info="item"/>
    </div>
  </div>
</template>

<script>
import CompleteItem from './CompleteItem'
export default {
  name: 'CompleteList',
  components: {
    CompleteItem
  },
  props: {
    list: Array
  },
  data() {
    return {
      list1: [],
      list2: [],
      list3: []
    }
  },
  watch: {
    list() {
      this.list1 = []
      this.list2 = []
      this.list3 = []
      for(let i in this.list) {
        if(i % 3 == 0) {
          this.list1.push(this.list[i])
        }else if(i % 3 == 1) {
          this.list2.push(this.list[i])
        }else {
          this.list3.push(this.list[i])
        }
      }
    }
  }
}
</script>

<style>
.complete-list {
  width:100%;
  display: flex;
  justify-content: space-evenly;
  padding: 10px 0;
}
.list1,
.list2,
.list3{
  width: 31%;
}
</style>