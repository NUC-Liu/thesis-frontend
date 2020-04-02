import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login')
  },
  {
    path: '/stuindex',
    name: 'StuIndex',
    component: () => import(/* webpackChunkName: "about" */ '../views/StuIndex'),
    children: [
      {
        path: '/stuhome' ,
        name: 'StudentHome',
        component: () => import('../views/student/StuHome')
      },
      {
        path: '/announcement',
        name: 'Announcement',
        component: () => import('../views/announcement/Announcement')
      },
      {
        path: '/thesis/list',
        name: 'ThesisList',
        component: () => import('../views/student/ThesisList')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
