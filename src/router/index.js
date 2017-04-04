import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import playVideo from '@/components/PlayVideo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/playvideo',
      name: 'playVideo',
      component: playVideo
    }
  ]
})
