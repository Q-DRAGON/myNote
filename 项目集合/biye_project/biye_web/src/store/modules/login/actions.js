import { createAction } from '@/utils/help';
import {apiLogin, SETTOKEN, apiLogout, LOGOUT} from "./mutation-types";

const actions = {
  login: createAction('post', apiLogin, SETTOKEN),
  logout: createAction('get', apiLogout, LOGOUT)
}

export default actions
