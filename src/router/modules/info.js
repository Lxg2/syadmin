/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const infoRouter = {
  path: "/financing",
  component: Layout,
  redirect: "/financing/financingadmin",
  name: "financing",
  meta: {
    title: "融资管理",
    icon: "fina",
  },
  children: [
    {
      path: "add",
      component: () => import("@/views/info/add"),
      name: "rzadd",
      meta: {
        title: "新建",
        noCache: true,
        activeMenu: "/financing/financingadmin",
        channelname: "jingrong",
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
        channelname: "jingrong",
      },
      hidden: true,
    },
    // {
    //   path: "enterprise",
    //   component: () => import("@/views/info/enterprise"),
    //   name: "enterprise",
    //   meta: {
    //     title: "企业管理",
    //     channelname: "qiye",
    //   },
    // },
    {
      path: "financingadmin",
      component: () => import("@/views/info"),
      name: "financingadmin",
      meta: {
        title: "金融产品",
        channelname: "jingrong",
      },
    },
    {
      path: "creditor",
      component: () => import("@/views/info/creditor"),
      name: "creditor",
      meta: {
        title: "债权融资",
        channelname: "zhaiquan",
      },
    },
    {
      path: "stock",
      component: () => import("@/views/info/stock"),
      name: "stock",
      meta: {
        title: "股权融资",
        channelname: "guquan",
      },
    },
    // {
    //   path: "enterpriseadd",
    //   component: () => import("@/views/info/enterprise/add"),
    //   name: "rzadd",
    //   meta: {
    //     title: "新建企业",
    //     noCache: true,
    //     activeMenu: "/financing/enterprise",
    //     channelname: "qiye",
    //   },
    //   hidden: true,
    // },
    // {
    //   path: "enterpriseedit",
    //   component: () => import("@/views/info/enterprise/edit"),
    //   name: "rzedit",
    //   meta: {
    //     title: "编辑企业",
    //     noCache: true,
    //     activeMenu: "/financing/enterprise",
    //     channelname: "qiye",
    //   },
    //   hidden: true,
    // },
    {
      path: "financingclassify",
      component: () => import("@/views/info/classify"),
      name: "financingclassify",
      meta: {
        title: "金融分类管理",
        channelname: "jingrong",
      },
    },
   
    
    {
      path: "financingclassifyadd",
      component: () => import("@/views/info/classify/add.vue"),
      name: "financingclassifyadd",
      meta: {
        title: "新建金融分类",
        noCache: true,
        activeMenu: "/financing/financingclassify",
        channelname: "jingrong",
      },
      hidden: true,
    },
    {
      path: "financingclassifyedit",
      component: () => import("@/views/info/classify/edit.vue"),
      name: "financingclassifyedit",
      meta: {
        title: "编辑金融分类",
        noCache: true,
        activeMenu: "/financing/financingclassify",
        channelname: "jingrong",
      },
      hidden: true,
    },
    // {
    //   path: "financingclassifytow",
    //   component: () => import("@/views/info/classify2"),
    //   name: "financingclassifytow",
    //   meta: {
    //     title: "债权分类管理",
    //     channelname: "zhaiquan",
    //   },
    // },
    // {
    //   path: "financingclassifyaddtow",
    //   component: () => import("@/views/info/classify2/add.vue"),
    //   name: "financingclassifyaddtow",
    //   meta: {
    //     title: "新建债权分类",
    //     noCache: true,
    //     activeMenu: "/financing/financingclassifytow",
    //     channelname: "zhaiquan",
    //   },
    //   hidden: true,
    // },
    // {
    //   path: "financingclassifyedittow",
    //   component: () => import("@/views/info/classify2/edit.vue"),
    //   name: "financingclassifyedittow",
    //   meta: {
    //     title: "编辑债权分类",
    //     noCache: true,
    //     activeMenu: "/financing/financingclassifytow",
    //     channelname: "zhaiquan",
    //   },
    //   hidden: true,
    // },
    // {
    //   path: "financingclassifythren",
    //   component: () => import("@/views/info/classify3"),
    //   name: "financingclassifythren",
    //   meta: {
    //     title: "股权分类管理",
    //     channelname: "guquan",
    //   },
    // },
    // {
    //   path: "financingclassifyaddthren",
    //   component: () => import("@/views/info/classify3/add.vue"),
    //   name: "financingclassifyaddthren",
    //   meta: {
    //     title: "新建股权分类",
    //     noCache: true,
    //     activeMenu: "/financing/financingclassifythren",
    //     channelname: "guquan",
    //   },
    //   hidden: true,
    // },
    // {
    //   path: "financingclassifyeditthren",
    //   component: () => import("@/views/info/classify3/edit.vue"),
    //   name: "financingclassifyeditthren",
    //   meta: {
    //     title: "编辑股权分类",
    //     noCache: true,
    //     activeMenu: "/financing/financingclassifythren",
    //     channelname: "guquan",
    //   },
    //   hidden: true,
    // },


    {
      path: "stockadd",
      component: () => import("@/views/info/stock/stockadd"),
      name: "stockadd",
      meta: {
        title: "新增股权融资",
        noCache: true,
        activeMenu: "/financing/stock",
        channelname: "guquan",
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
        channelname: "guquan",
      },
      hidden: true,
    },
    
    {
      path: "creditoradd",
      component: () => import("@/views/info/creditor/creditoradd"),
      name: "creditoradd",
      meta: {
        title: "新增债权融资",
        noCache: true,
        activeMenu: "/financing/creditor",
        channelname: "zhaiquan",
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
        channelname: "zhaiquan",
      },
      hidden: true,
    },
  ],
};
export default infoRouter
