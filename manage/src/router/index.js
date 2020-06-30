import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Order = () =>
  import ('views/order/Order')

const Shop = () =>
  import ('views/shop/Shop')

const Report = () => import('views/report/Report')

const Manage = () => import('views/manage/Manage')

const Comment = () => import('views/comment/Comment')

const Setting = () => import('views/setting/Setting')

const routes = [{
    path: '/:shopId',
    redirect: '/:shopId/order'
  },
  {
    path: '/:shopId/order',
    component: Order
  },
  {
    path: '/:shopId/shop',
    component: Shop
  },
  {
    path: '/:shopId/report',
    component: Report
  },
  {
    path: '/:shopId/manage',
    component: Manage
  },
  {
    path: '/:shopId/comment',
    component: Comment
  },
  {
    path: '/:shopId/setting',
    component: Setting
  }

]

const router = new Router({
  routes,
  mode: 'history'
})

export default router