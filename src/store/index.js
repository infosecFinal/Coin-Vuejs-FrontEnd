import Vue from 'vue'
import Vuex from 'vuex'
import stomp from './modules/stomp'
import account from './modules/account'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stomp,
    account
  }
})
