<template>
  <div class="admin-coupon">
    <table>
        <thead>
          <tr>
            <th>编号</th>
            <th>面值</th>
            <th>门槛</th>
            <th>所需积分</th>
            <th>每日限量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupon" :key="item.iid">
            <td>{{item.iid}}</td>
            <td>{{item.value}}&nbsp;元</td>
            <td v-if="item.attain == 0">无门槛</td>
            <td v-else>满&nbsp;{{item.attain}}&nbsp;可用</td>
            <td>{{item.score}}&nbsp;积分</td>
            <td>{{item.rest}}&nbsp;/&nbsp;{{item.limit}}</td>
            <td>
              <span style="padding: 0 5px; cursor: pointer;" @click="modify(item.iid)">
                <svg class="icon-font" aria-hidden="true" style="font-size: 20px;">
                  <use xlink:href="#icon-jifen"></use>
                </svg>
              </span>
              <span style="padding: 0 5px; cursor: pointer;" @click="shanchu(item.iid)">
                <svg class="icon-font" aria-hidden="true" style="font-size: 16px; color: #888;">
                  <use xlink:href="#icon-shanchu"></use>
                </svg>
              </span>
            </td>
          </tr>
        </tbody>
         <tfoot>
            <tr>
              <td colspan="6" style="cursor: pointer;" @click="addClick">添加</td>
            </tr>
          </tfoot>
      </table>
  </div>
</template>

<script>
export default {
  name: 'AdminCoupon',
  props: {
    coupon: Array
  },
  methods: {
    modify(iid) {
      this.$notify.success({
        message: `${iid}修改成功，次日生效`
      })
    },
    shanchu(iid) {
      this.$notify.success({
        message: `${iid}删除成功，次日生效`
      })
    },
    addClick() {
      this.$notify.error('暂未开放优惠券添加入口')
    }
  }
}
</script>

<style scoped>
.admin-coupon {
  margin: 20px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(51, 51, 51, .18);
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  border: 1px solid #c3c3c3;
  padding: 10px 6px;
}
td {
  border: 1px solid #c3c3c3;
  padding: 10px 6px;
  color: #2a2e31;
  text-align: center;
}
</style>