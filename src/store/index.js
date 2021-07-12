import Vue from 'vue'
import Vuex from 'vuex'
import stomp from './modules/stomp'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stomp
  }
})
