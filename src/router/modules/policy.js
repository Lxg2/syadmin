/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const compRouter = {
  path: '/policy',
  component: Layout,
  redirect: '/policy/policyadmin',
  name: 'policyadmin',
  meta: {
    title: '政策管理',
    icon: 'zhengce',
  },
  children: [{
    path: 'policyadd',
    component: () => import('@/views/comp/add'),
    name: 'policyadd',
    meta: {
      title: '新增政策',
      noCache: true,
      activeMenu: '/policy/policyadmin',
      channelname:'zhengce'
    },
    hidden: true
  }, {
    path: 'policyedit',
    component: () => import('@/views/comp/edit'),
    name: 'policyedit',
    meta: {
      title: '编辑政策',
      noCache: true,
      activeMenu: '/policy/policyadmin',
      channelname:'zhengce'
    },
    hidden: true
  }, {
    path: 'policyadmin',
    component: () => import('@/views/comp'),
    name: 'pAd',
    meta: {
      title: '政策管理',
      channelname:'zhengce'
    }
  },
  {
    path: 'category',
    component: () => import('@/views/comp/policyClass/contact'),
    name: 'category',
    meta: {
      title: '政策分类',
      channelname:'zhengce'
    },
  },
    {
      path: 'classadd',
      component: () => import('@/views/comp/policyClass/add'),
      name: 'classadd',
      meta: {
        title: '新增分类',
        noCache: true,
        activeMenu: '/policy/category',
        channelname:'zhengce'
      },
      hidden: true
    }, {
      path: 'classedit',
      component: () => import('@/views/comp/policyClass/edit'),
      name: 'policyedit',
      meta: {
        title: '编辑分类',
        noCache: true,
        activeMenu: '/policy/category',
        channelname:'zhengce'
      },
      hidden: true
    },
  ]
}
export default compRouter
