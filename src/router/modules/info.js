/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const infoRouter = {
  path: "/financing",
  component: Layout,
  redirect: "/financing/financingadmin",
  name: "financing",
  meta: {
    title: "融资管理",
    icon: "info",
  },
  children: [
    {
      path: "financingadmin",
      component: () => import("@/views/info"),
      name: "financingadmin",
      meta: {
        title: "融资管理",
        channelname: "rouzi",
      },
    },
    {
      path: "add",
      component: () => import("@/views/info/add"),
      name: "rzadd",
      meta: {
        title: "新建",
        noCache: true,
        activeMenu: "/financing/financingadmin",
        channelname: "rouzi",
      },
      hidden: true,
    },
    {
      path: "edit",
      component: () => import("@/views/info/edit"),
      name: "rzedit",
      meta: {
        title: "编辑",
        noCache: true,
        activeMenu: "/financing/financingadmin",
        channelname: "rouzi",
      },
      hidden: true,
    },
    {
      path: "enterprise",
      component: () => import("@/views/info/enterprise"),
      name: "enterprise",
      meta: {
        title: "企业管理",
        channelname: "rouzi",
      },
    },
    {
      path: "enterpriseadd",
      component: () => import("@/views/info/enterprise/add"),
      name: "rzadd",
      meta: {
        title: "新建企业",
        noCache: true,
        activeMenu: "/financing/enterprise",
        channelname: "rouzi",
      },
      hidden: true,
    },
    {
      path: "enterpriseedit",
      component: () => import("@/views/info/enterprise/edit"),
      name: "rzedit",
      meta: {
        title: "编辑企业",
        noCache: true,
        activeMenu: "/financing/enterprise",
        channelname: "rouzi",
      },
      hidden: true,
    },
    {
      path: "financingclassify",
      component: () => import("@/views/info/classify"),
      name: "financingclassify",
      meta: {
        title: "分类管理",
        channelname: "rouzi",
      },
    },
    {
      path: "financingclassifyadd",
      component: () => import("@/views/info/classify/add.vue"),
      name: "financingclassifyadd",
      meta: {
        title: "新建分类",
        noCache: true,
        activeMenu: "/financing/financingclassify",
        channelname: "rouzi",
      },
      hidden: true,
    },
    {
      path: "financingclassifyedit",
      component: () => import("@/views/info/classify/edit.vue"),
      name: "financingclassifyedit",
      meta: {
        title: "编辑分类",
        noCache: true,
        activeMenu: "/financing/financingclassify",
        channelname: "rouzi",
      },
      hidden: true,
    },
    {
      path: "stockadd",
      component: () => import("@/views/info/stock/stockadd"),
      name: "stockadd",
      meta: {
        title: "新增股权融资",
        noCache: true,
        activeMenu: "/financing/stock",
        channelname: "rouzi",
      },
      hidden: true,
    },
    {
      path: "stockedit",
      component: () => import("@/views/info/stock/stockedit"),
      name: "stockedit",
      meta: {
        title: "编辑股权融资",
        noCache: true,
        activeMenu: "/financing/stock",
        channelname: "rouzi",
      },
      hidden: true,
    },
    {
      path: "stock",
      component: () => import("@/views/info/stock"),
      name: "stock",
      meta: {
        title: "股权融资",
        channelname: "rouzi",
      },
    },
    {
      path: "creditor",
      component: () => import("@/views/info/creditor"),
      name: "creditor",
      meta: {
        title: "债权融资",
        channelname: "rouzi",
      },
    },
    {
      path: "creditoradd",
      component: () => import("@/views/info/creditor/creditoradd"),
      name: "creditoradd",
      meta: {
        title: "新增债权融资",
        noCache: true,
        activeMenu: "/financing/creditor",
        channelname: "rouzi",
      },
      hidden: true,
    },
    {
      path: "creditoredit",
      component: () => import("@/views/info/creditor/creditoredit"),
      name: "creditoredit",
      meta: {
        title: "编辑债权融资",
        noCache: true,
        activeMenu: "/financing/creditor",
        channelname: "rouzi",
      },
      hidden: true,
    },
  ],
};
export default infoRouter
