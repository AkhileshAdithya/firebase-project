import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import NewNote from '@/components/NewNote.vue'
import NewList from '@/components/NewList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new-note',
    name: 'NewNote',
    component: NewNote
  },
  {
    path: '/new-list',
    name: 'NewList',
    component: NewList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
