import Vue from 'vue'
import Vuex from 'vuex'
import {
  actions,
  mutations,
  state,
  getters,
} from './modules/global';

import modules from './modules';

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
})
