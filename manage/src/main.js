import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//创建事件总线
Vue.prototype.$bus = new Vue()

import toast from 'components/common/toast'
Vue.use(toast)

import Notification from 'element-ui';
Vue.use(Notification)

import Switch from 'element-ui'
Vue.use(Switch)

import Message from 'element-ui'
Vue.use(Message)

import MessageBox from 'element-ui'
Vue.use(MessageBox)

import { Timeline, TimelineItem } from 'element-ui'
Vue.use(Timeline)
Vue.use(TimelineItem)

import Dialog from 'element-ui'
Vue.use(Dialog)

import VueSocketIo from 'vue-socket.io'
Vue.use(new VueSocketIo({
  debug: true,
  // connection: '/socket.io'
  connection: '/'
}))

new Vue({
  render: h => h(App),
  router
}).$mount('#app')