import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/**
 * 重写路由的push方法
 */
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return routerPush.call(this, location).catch(error => error)
// }  

const Home = () =>
  import ('views/home/Home')
const Order = () =>
  import ('views/order/Order')
const Profile = () =>
  import ('views/profile/Profile')
const Shop = () =>
  import ('views/shop/Shop')
const Login = () =>
  import ('views/login/Login')
const CreateAccount = () =>
  import ('views/login/CreateAccount')
const Confirm = () =>
  import ('views/confirm/Confirm')
const Pay = () =>
  import ('views/confirm/Pay')
const OrderDetails = () =>
  import ('views/order/OrderDetails')
const Comment = () =>
  import ('views/comment/Comment')
const Coupon = () =>
  import ('views/profile/CouponExchange')

const routes = [{
    path: '',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/shop/:shopId',
    component: Shop
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/Profile',
    component: Profile,
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: CreateAccount
  },
  {
    path: '/confirm/:shopId',
    component: Confirm
  },
  {
    path: '/Pay/:orderId',
    component: Pay
  },
  {
    path: '/orderDetails/:orderId',
    component: OrderDetails
  },
  {
    path: '/comment',
    component: Comment
  }, {
    path: '/coupon',
    component: Coupon
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router