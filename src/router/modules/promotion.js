/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const proRouter = {
  path: '/role',
  component: Layout,
  redirect: '/role/tic',
  name: 'role',
  meta: {
    title: '权限管理',
    icon: 'set'
  },
  children: [{
    path: 'users',
    component: () => import('@/views/role/useradmin'),
    name: 'users',
    meta: {
      title: '用户管理'
    }
  },{
    path: 'usersrole',
    component: () => import('@/views/role/roleadmin'),
    name: 'usersrole',
    meta: {
      title: '角色管理'
    }
  },
  {
    path: 'roleadd',
    component: () => import('@/views/role/roleadmin/add.vue'),
    name: 'Roleadd',
    meta: {
      title: '新建角色',
      noCache: true,
      activeMenu: '/role/usersrole'
    },
    hidden: true
  },
  {
    path: 'roleedit',
    component: () => import('@/views/role/roleadmin/edit.vue'),
    name: 'Roleedit',
    meta: {
      title: '编辑角色',
      noCache: true,
      activeMenu: '/role/usersrole'
    },
    hidden: true
  },
 {
    path: 'ticadd',
    component: () => import('@/views/role/useradmin/add.vue'),
    name: 'TicAdd',
    meta: {
      title: '新建管理员',
      noCache: true,
      activeMenu: '/role/users'
    },
    hidden: true
  },
  {
    path: 'ticedit',
    component: () => import('@/views/role/useradmin/edit.vue'),
    name: 'Ticedit',
    meta: {
      title: '编辑管理员',
      noCache: true,
      activeMenu: '/role/users'
    },
    hidden: true
  }
  // {
  //   path: 'jurisdiction',
  //   component: () => import('@/views/role/authority'),
  //   name: 'jurisdiction',
  //   meta: {
  //     title: '权限管理',
  //   },
  // }
]
}
export default proRouter
