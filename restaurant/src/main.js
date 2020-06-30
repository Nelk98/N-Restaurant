import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

Vue.config.productionTip = false

// 使用toast
import toast from 'components/common/toast'
Vue.use(toast)

import notify from 'components/common/notify'
Vue.use(notify)

// // 使用overlay
// import overlay from 'components/common/overlay'
// Vue.use(overlay)

//取消移动端300ms延时
import FastClick from 'fastclick'
FastClick.attach(document.body)

//懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1,
  error: '/public/images/static/angry.png',
  loading: '/public/images/static/kani.png',
  attempt: 3
})


import 'vant/lib/index.css'
import Dialog from 'vant';
Vue.use(Dialog);

// 文件上传
// import { Uploader } from 'vant';
// Vue.use(Uploader);

//创建事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')