import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home';
import HoneycombGrid from '@/components/HoneycombGrid';
import Fight from '@/components/Fight/Fight.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
      path: '/honeycomb',
      name: 'HoneycombGrid',
      component: HoneycombGrid
    },
    {
        path: '/fight',
        name: 'Fight',
        component: Fight
    }
  ]
})
