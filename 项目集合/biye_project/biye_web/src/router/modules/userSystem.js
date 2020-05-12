import Layout from '@/layout'

export default [
  {
    path: '/userSystem',
    component: Layout,
    redirect: '/userSystem/userManagement',
    name: 'userSystem',
    meta: {roles: ['admin', 'user'], title: '用户管理', icon: 'el-icon-user-solid'},
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/userSystem/profile'),
        meta: {title: '个人信息', roles: ['user'], icon: 'el-icon-user-solid'},
      },
      {
        path: 'userManagement',
        name: 'userManagement',
        component: () => import('@/views/userSystem/userManagement'),
        // if do not set roles, means: this page does not require userSystem
        meta: {title: '用户管理页面', roles: ['admin']},
      },
    ]
  }
]
