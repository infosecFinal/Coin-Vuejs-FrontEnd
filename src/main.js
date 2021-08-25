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


Vue.prototype.$baseURL = 'http://weakapi.5nlytoday.com'
Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    async created() {
        console.log("created");
        

            const resp = await axios.get(`http://weakapi.5nlytoday.com/account/valid`);

            console.log(resp.data.data);
            if (resp.data.msg !== 'fail') {
                const user_info = await getUserInfo();
                console.log("uinfo: ", user_info);
                this.$store.commit('account/setLoginState', true);
                console.log(this.$store.state.account.login_id);
            }
        }
    }
).$mount('#app')