import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  base: '/income-tax-calculation-view/',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
