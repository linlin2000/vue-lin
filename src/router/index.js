import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Tabbar/index'
import member from '@/components/Tabbar/member'
import Shopping from '@/components/Tabbar/Shopping'
import search from '@/components/Tabbar/search'
import grid from '@/components/Tabbar/grid'
import newslist from '@/components/news/newslist'
import photolist from '@/components/photos/photolist'
import goodslist from '@/components/goods/goodslist'
import newlist from '@/components/news/newlist'
import newsinfo from '@/components/news/newsinfo'
import photoinfo from '@/components/photos/photoinfo'
import goodsinfo from '@/components/goods/goodsinfo'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: 'index' },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: '/index', component: grid
        }
      ]
    },
    {
      path: '/member',
      component: member
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/Shopping',
      component: Shopping
    },
    {
      path: '/index/newslist',
      component: newslist
    },
    {
      path: '/index/photolist',
      component: photolist
    },
    {
      path: '/index/goodslist',
      component: goodslist
    },
    {
      path: '/index/newlist',
      component: newlist
    },
    {
      path: '/index/newsinfo/:id',
      component: newsinfo
    },
    {
      path: '/index/photoinfo/:id',
      component: photoinfo
    },
    {
      path:'/index/goodsinfo/:id',
      component:goodsinfo
    }
  ]
})
