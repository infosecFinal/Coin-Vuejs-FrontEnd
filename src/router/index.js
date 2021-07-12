import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import ChatRoom from '../views/ChatRoom.vue'
// import Read from '@/components/board/Read.vue'
import Create from '@/components/board/Create.vue'
import Detail from '@/components/board/Detail.vue'
import Modify from '@/components/board/Modify.vue'
import Board from '@/components/board/Board.vue'

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
  // {
  //   path: '/board',
  //   name: 'Read',
  //   component: Read,
  // },
  {
    path: '/board/free',
    name: 'Board',
    component: Board
  },
  {
    path: '/board/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/board/detail/:contentId',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/board/create/:contentId',
    name: 'Modify',
    component: Modify
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
