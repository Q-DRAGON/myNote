import Vue from 'vue'
import Router from 'vue-router'
import RouterConfig from './modules'
import Layout from '@/layout'

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    // hidden 判断在sliderbar中是否显示
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index/index'),
        meta: {title: '首页', icon: 'el-icon-menu', affix: true},
      }
    ]
  },
  {
    path: '/front',
    component: Layout,
    redirect: '/front/jsPage',
    children: [
      {
        path: 'jsPage',
        name: 'jsPage',
        component: () => import('@/views/front/jsPage'),
        meta: {title: '前端学习', icon: 'el-icon-service'}
      }
    ]
  },
  {
    path: '/backend',
    component: Layout,
    redirect: '/backend/pypage',
    meta: {title: '后端学习', icon: 'el-icon-lollipop'},
    children: [
      {
        path: 'pypage',
        name: 'pypage',
        component: () => import('@/views/backEnd/pyPage'),
        meta: {title: 'python学习'}
      },
      {
        path: 'nodepage',
        name: 'nodepage',
        component: () => import('@/views/backEnd/nodePage'),
        meta: {title: 'nodeJs学习'}
      },
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: '无限嵌套测试',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu 1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu 1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'Menu 1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu 1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu 1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu 1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'Menu 2' }
      }
    ]
  },
]

// 跟权限相关的路由
// 404 页面一定要最后加载
const lastRouter = [{
  path: '*',
  redirect: '/404',
  hidden: true
}]

export const asyncRoutes = RouterConfig.concat(lastRouter)

const createRouter = () => new Router({
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    // “滚动到锚点”
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    // 每次切换路由，让页面滚动到顶部。
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 100)
    })
  },
  routes: constantRoutes,
})

const router = createRouter()

// 重新定义router
export function resetRouter() {
  const newRouter = createRouter()
  // 替换routes
  router.matcher = newRouter.matcher
}

export default router
