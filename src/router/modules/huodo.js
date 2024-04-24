/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'

const compRouter = {
  path: '/activity',
  component: Layout,
  redirect: '/activity/activityadmin',
  name: 'activity',
  meta: {
    title: '活动管理',
    icon: 'comp',
    channelname:'huodong'
  },
  children: [{
    path: 'activityadd',
    component: () => import('@/views/huodo/activityadd.vue'),
    name: 'activityadd',
    meta: {
      title: '新建活动',
      noCache: true,
      activeMenu: '/activity/activityadmin',
      channelname:'huodong'
    },
    hidden: true
  }, {
    path: 'activityedit',
    component: () => import('@/views/huodo/activityedit.vue'),
    name: 'activityedit',
    meta: {
      title: '编辑活动',
      noCache: true,
      activeMenu: '/activity/activityadmin',
      channelname:'huodong'
    },
    hidden: true
  },
  {
    path: 'activityadmin',
    component: () => import('@/views/huodo/index.vue'),
    name: 'activityadmin',
    meta: {
      title: '活动管理',
      channelname:'huodong'
    }
  },
  {
    path: 'applyadmin',
    component: () => import('@/views/huodo/about.vue'),
    name: 'applyadmin',
    meta: {
      title: '报名管理',
      channelname:'huodong'
    }
  },
  {
    path: 'hdclass',
    component: () => import('@/views/huodo/contact.vue'),
    name: 'hdclass',
    meta: {
      title: '活动分类',
      channelname:'huodong'
    }
  },
  {
    path: 'hdclassadd',
    component: () => import('@/views/huodo/classify/add.vue'),
    name: 'hdclassadd',
    meta: {
      title: '新建分类',
      noCache: true,
      activeMenu: '/activity/hdclass',
      channelname:'huodong'
    },
    hidden: true
  },
  {
    path: 'hdclassedit',
    component: () => import('@/views/comp/policyClass/edit'),
    name: 'hdclassedit',
    meta: {
      title: '编辑分类',
      noCache: true,
      activeMenu: '/activity/hdclass',
      channelname:'huodong'
    },
    hidden: true
  },
]
}
export default compRouter
