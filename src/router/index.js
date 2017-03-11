import Vue from 'vue'
import Router from 'vue-router'
import Presenze from '@/components/Presenze'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'presenze',
      component: Presenze
    }
  ]
})
