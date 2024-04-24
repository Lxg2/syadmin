/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const setRouter = {
  path: '/set',
  component: Layout,
  redirect: '/set/dat',
  name: 'set',
  meta: {
    title: '设置管理',
    icon: 'set'
  },
  children: [{
    path: 'dat',
    component: () => import('@/views/set/dat'),
    name: 'Dat',
    meta: {
      title: '设置资料'
    }
  }, {
    path: 'password',
    component: () => import('@/views/set/psw'),
    name: 'Password',
    meta: {
      title: '设置密码'
    }
  }]
}
export default setRouter
