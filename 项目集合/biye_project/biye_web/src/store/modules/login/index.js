import actions from './actions';
import getters from './getters';
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'

import {
  SETTOKEN,
  LOGOUT,
} from './mutation-types';

const state = {
  token: getToken(),
}

const mutations = {
  [SETTOKEN](state, data) {
    state.token = data.token
    setToken(data.token)
  },
  [LOGOUT](state) {
    state.token = ''
    state.role = ''
    removeToken()
    resetRouter()
  },
}

export default {
  actions,
  mutations,
  state,
  getters,
};
