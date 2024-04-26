/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const compRouter = {
  path: '/colony',
  component: Layout,
  redirect: '/colony/colonyadmin',
  name: 'colonymain',
  meta: {
    title: '产业集群',
    icon: 'comp',
  },
  children: [{
    path: 'colonyadmin',
    component: () => import('@/views/colony/add'),
    name: 'colonyadmin',
    meta: {
      title: '产业集群',
      noCache: true,
      channelname:'chanye'
    },
    hidden: true
  },
  {
    path: 'colonyadminadd',
    component: () => import('@/views/colony/add.vue'),
    name: 'pAd',
    meta: {
      title: '新建产业',
      channelname:'chanye',
      activeMenu: '/colony/colonyadmin',
    }
  }, {
    path: 'colonyadminedit',
    component: () => import('@/views/colony/edit.vue'),
    name: 'policyedit',
    meta: {
      title: '编辑产业',
      noCache: true,
      activeMenu: '/colony/colonyadmin',
      channelname:'chanye'
    },
    hidden: true
  },
  {
    path: 'colonyclass',
    component: () => import('@/views/colony/policyClass/contact'),
    name: 'colonyclass',
    meta: {
      title: '集群分类',
      channelname:'chanye'
    },
  },
    {
      path: 'colonyclassadd',
      component: () => import('@/views/colony/policyClass/add'),
      name: 'colonyclassadd',
      meta: {
        title: '新建分类',
        noCache: true,
        activeMenu: '/colony/colonyclass',
        channelname:'chanye'
      },
      hidden: true
    }, {
      path: 'colonyclassedit',
      component: () => import('@/views/comp/policyClass/edit'),
      name: 'colonyclassedit',
      meta: {
        title: '编辑分类',
        noCache: true,
        activeMenu: '/colony/colonyclass',
        channelname:'chanye'
      },
      hidden: true
    },
  ]
}
export default compRouter
