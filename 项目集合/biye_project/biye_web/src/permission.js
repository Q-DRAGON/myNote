import router from './router'
import store from './store'
import {Message} from "element-ui"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from '@/utils/auth'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 已登录用户不需要重新登录
      next({path: '/'})
      NProgress.done()
    } else {
      // 确定用户是否通过 getInfo 获得了其权限角色(name, role)
      const hasRoles = store.getters.role
      // log('hasroles', hasRoles)
      if (hasRoles) {
        next()
      } else {
        // 刷新以后store的信息重置，需要重新获取用户信息
        const r = await store.dispatch('getInfo')
        if (r.code == '0') {
          let data = r.data;
          store.commit('SETUSER', r.data)
          // // 生成可访问的路由表
          store.dispatch('generateRoutes', data).then(() => {
            router.addRoutes(store.getters.addRoutes)
            next({ ...to, replace: true })
            NProgress.done()
          })
        } else {
          Message.error(r.message)
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 可以免登陆的页面
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 返回登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
