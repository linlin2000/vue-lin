// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
Vue.prototype.$http=axios
axios.defaults.baseURL='http://127.0.0.1:5000/'

import moment from 'moment'
Vue.filter('datefmt', (data,pattern='YYYY-MM-DD HH:mm:ss') => {
  return moment(data).format(pattern)
})

import { Button, NavBar, Stepper ,Tab, Tabs, Tabbar, TabbarItem,Panel , Icon, Card ,Search, Row, Col ,Swipe, SwipeItem ,Lazyload } from 'vant'
Vue
  .use(Button)
  .use(NavBar)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Icon)
  .use(Search)
  .use(Row)
  .use(Col)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Card)
  .use(Panel)
  .use(Tab)
  .use(Tabs)
  .use(Stepper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
