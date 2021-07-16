import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'css-doodle'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueCookies from "vue-cookies"
import axios from 'axios'
import {getUserInfo} from '@/service'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'



Vue.prototype.$baseURL = 'http://localhost:8083'
Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    async created() {
        console.log("created");
        if(VueCookies.get('access_token')) {
            const resp = await axios.get(`http://localhost:8083/account/valid`);
            console.log(resp.data.data);
            if(resp.data.data === "valid") {
                const user_info = await getUserInfo();
                console.log(user_info);
                this.$store.commit('account/setLoginState', true);
                console.log(this.$store.state.account.login_id);
            } else {
                alert('Wrong Authentication');
                VueCookies.remove('access_token');
            }
        }
    }
}).$mount('#app')