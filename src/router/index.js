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
// 找活动
import huodo from './modules/huodo'
//角色
import proRouter from './modules/promotion'
import videoRouter from './modules/partybuilding'


import mdmRouter from './modules/mdm'
import datumRouter from './modules/datum'
import caseRouter from './modules/case'
import gogaoRouter from './modules/gogao'
import goodsRouter from './modules/goods'
import orderRouter from './modules/order'
import courierRouter from './modules/courier'
import roleRouter from './modules/role'
import userRouter from './modules/user'
import finaRouter from './modules/finance'
import setRouter from './modules/set'

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
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: '主页',
        icon: 'home',
        affix: true,
      }
    }]
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
  }/* ,
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
  policyRouter,//找政策
  infoRouter,//找融资
  huodo,//找活动
  videoRouter,//党建
  // proRouter,//角色用户
  // mdmRouter,
  // datumRouter,
  caseRouter,
  gogaoRouter,
  // goodsRouter,
  // orderRouter,
  // courierRouter,
  // roleRouter,
  // userRouter,
  // finaRouter,
  // setRouter,
]

const createRouter = () => new Router({
  mode: 'history', // require service support
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
