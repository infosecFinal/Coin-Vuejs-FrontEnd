import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import ChatRoom from '../views/ChatRoom.vue'
import Board from '@/components/board/Board.vue'
import ContentDetail from '@/components/board/ContentDetail.vue'
import Create from '@/components/board/Create.vue'

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
    path: '/board/free/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/board/free/detail/:contentId',
    name: 'ContentDetail',
    component: ContentDetail
  },
  {
    path: '/board/free/create/:contentId?',
    name: 'Create',
    component: Create
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
