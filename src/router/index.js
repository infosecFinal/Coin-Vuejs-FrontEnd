import Vue from 'vue'
import VueRouter from 'vue-router'
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
import AddressPopup from '@/components/account/AddressPopup.vue'
import { getUserInfo } from '@/service'
import VueCookies from 'vue-cookies'
import BtcChart from '@/views/BtcChart'
import axios from 'axios'
import store from '../store'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'BtcChart',
        component: BtcChart
    },
    {
        path: '/chatroom',
        name: 'ChatRoom',
        component: ChatRoom
    },
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
        component: ContentDetail,
        props: true
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
        meta: { unauthorized: true }
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
    {
        path: '/findpw',
        name: 'FindPassword',
        component: FindPassword
    },
    {
        path: '/address',
        name: 'AddressPopup',
        component: AddressPopup
    }

]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async(to, from, next) => {
    if (VueCookies.get('access_token')) {
        const resp = await axios.get(`http://192.168.0.2:8083/account/valid`);
        console.log("validation : ", resp);
        if (resp.data.code > 0) {
            const user_info = await getUserInfo();
            console.log("user info: ", user_info);
            store.commit('account/setLoginState', true);
            store.commit('account/setId', user_info.data.data.user_id);
            store.commit('account/setAdmin', user_info.data.data.isAdmin);
        } else {
            VueCookies.remove('access_token');
        }
    }
    next();
})

export default router