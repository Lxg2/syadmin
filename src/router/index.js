import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// 找政策
import policyRouter from './modules/policy'
// 找融资
import infoRouter from './modules/info'
// 广告
import coverRouter from './modules/cover'
// 找活动
import huodo from './modules/huodo'
//角色
import proRouter from './modules/promotion'
//走进石岩
import sy from './modules/sy'
// 党建
import videoRouter from './modules/partybuilding'
// 企业管理
import enterpriseRouter from './modules/enterprise'
import caseRouter from './modules/case'
import gogaoRouter from './modules/gogao'
// 找市场
import marketRouter from './modules/market'
// 空间
import spaceRouter from './modules/space'
// 产业集群
import IndustrialClusterRouter from './modules/IndustrialCluster'
// 找直播
import directSeedingRouter from './modules/directSeeding'
import userinfoRouter from './modules/useradmin'


/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
    redirect: '/case/list',
    // children: [{
    //   path: 'dashboard',
    //   component: () => import('@/views/dashboard/index'),
    //   name: 'Dashboard',
    //   meta: {
    //     title: '主页',
    //     icon: 'home',
    //     affix: true,
    //   }
    // }]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
/* ,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  } */
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  caseRouter,
  gogaoRouter,
  policyRouter,//找政策
  infoRouter,//找融资
  sy,
  coverRouter,//广告
  huodo,//找活动
  marketRouter,
  enterpriseRouter,
  videoRouter,//党建
  spaceRouter,// 找空间
  directSeedingRouter,//直播
  IndustrialClusterRouter,// 产业集群
  // proRouter,//角色用户
  // userinfoRouter
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
