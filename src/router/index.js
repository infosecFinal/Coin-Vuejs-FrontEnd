import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import ChatRoom from '../views/ChatRoom.vue'
import Board from '@/components/board/Board.vue'
import ContentDetail from '@/components/board/ContentDetail.vue'
import Create from '@/components/board/Create.vue'
import Login from '@/components/account/Login.vue'
import Register from '@/components/account/Register.vue'
import Mypage from '@/components/account/Mypage.vue'
import Delete from '@/components/account/Delete.vue'
import Update from '@/components/account/Update.vue'
import FindPassword from '@/components/account/FindPassword.vue'
import {getUserInfo} from '@/service'
import store from '../store'

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
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { unauthorized : true }
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: Mypage
  },
  {
    path: '/mypage/delete',
    name: 'Delete',
    component: Delete
  },
  {
    path: '/mypage/update',
    name: 'Update',
    component: Update
  },
  // {
  //   path: '/mypage/update',
  //   name: 'Update2',
  //   component: Update2
  // },
  {

    path: '/findpw',
    name: 'FindPassword',
    component: FindPassword
  }
  
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const resp = await getUserInfo();
  console.log(resp);
  if(resp.data.code > 0){
  store.commit('account/setId', resp.data.data.user_id);
  store.commit('account/setLoginState', true);
  }
  next();
})

export default router