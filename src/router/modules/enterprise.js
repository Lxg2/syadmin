// 企业管理
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const compRouter = {
  path: "/enterprise",
  component: Layout,
  redirect: "/enterprise/enterpriseadmin",
  name: "enterprise",
  meta: {
    title: "企业服务管理",
    icon: "qiye",
  },
  children: [
    {
      path: "enterpriseadmin",
      component: () => import("@/views/enterprise"),
      name: "enterpriseadmin",
      meta: {
        title: "企业管理",
        channelname: "qiye",
      },
    },
    {
      path: "enterpriseadminadd",
      component: () => import("@/views/enterprise/add"),
      name: "enterpriseadminadd",
      meta: {
        title: "新建企业",
        noCache: true,
        activeMenu: "/enterprise/enterpriseadmin",
        channelname: "qiye",
      },
      hidden: true,
    },
    {
      path: "enterpriseadminedit",
      component: () => import("@/views/enterprise/edit"),
      name: "enterpriseadminedit",
      meta: {
        title: "编辑企业",
        noCache: true,
        activeMenu: "/enterprise/enterpriseadmin",
        channelname: "qiye",
      },
      hidden: true,
    },
    {
      path: "enterpriseclass",
      component: () => import("@/views/enterprise/policyClass/contact"),
      name: "enterpriseclass",
      meta: {
        title: "服务管理",
        channelname: "qiye",
      },
    },
    {
      path: "enterpriseclassadd",
      component: () => import("@/views/enterprise/policyClass/add"),
      name: "enterpriseclassadd",
      meta: {
        title: "新建服务",
        noCache: true,
        activeMenu: "/enterprise/enterpriseclass",
        channelname: "qiye",
      },
      hidden: true,
    },
    {
      path: "enterpriseclassedit",
      component: () => import("@/views/enterprise/policyClass/edit"),
      name: "enterpriseclassedit",
      meta: {
        title: "编辑服务",
        noCache: true,
        activeMenu: "/enterprise/enterpriseclass",
        channelname: "qiye",
      },
      hidden: true,
    },

    // 服务分类
    {
      path: "classification",
      component: () => import("@/views/enterprise/classification/contact"),
      name: "classification",
      meta: {
        title: "人才管理",
        channelname: "fuwu",
      },
    },
    {
      path: "classificationadd",
      component: () => import("@/views/enterprise/classification/add"),
      name: "classificationadd",
      meta: {
        title: "新建招聘",
        noCache: true,
        activeMenu: "/enterprise/classification",
        channelname: "fuwu",
      },
      hidden: true,
    },
    {
      path: "classificationedit",

      component: () => import("@/views/enterprise/classification/edit"),
      name: "classificationedit",
      meta: {
        title: "编辑招聘",
        noCache: true,
        activeMenu: "/enterprise/classification",
        channelname: "fuwu",
      },
      hidden: true,
    },
  ],
};
export default compRouter
