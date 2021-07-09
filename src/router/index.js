import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import ChatRoom from '../views/ChatRoom.vue'
import Read from '@/components/board/Read.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, 
  {
    path: '/chatroom',
    name: 'ChatRoom',
    component: ChatRoom
  },
  {
    path: '/board',
    name: 'Read',
    component: Read
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
