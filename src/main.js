import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'css-doodle'
import 'chart.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueCookies from "vue-cookies"
import axios from 'axios'
import { getUserInfo } from '@/service'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component("apexchart", VueApexCharts)


Vue.prototype.$baseURL = 'http://192.168.0.2:8084'
Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    async created() {
        console.log("created");
        if (VueCookies.get('access_token')) {
            const resp = await axios.get(`http://192.168.0.2:8084/account/valid`);
            console.log(resp.data.data);
            if (resp.data.code > 0) {
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