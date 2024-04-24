/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const roleRouter = {
  path: '/role',
  component: Layout,
  redirect: '/role/list',
  name: 'role',
  meta: {
    title: '角色管理',
    icon: 'role'
  },
  children: [{
      path: 'list',
      component: () => import('@/views/role/list'),
      name: 'List',
      meta: {
        title: '角色列表'
      }
    }, {
      path: 'role-add',
      component: () => import('@/views/role/role-add'),
      name: 'RoleAdd',
      meta: {
        title: '新增',
        noCache: true,
        activeMenu: '/role/list'
      },
      hidden: true
    }
  ]
}
export default roleRouter
