/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const caseRouter = {
  path: "/goshiyan",
  component: Layout,
  redirect: "/goshiyan/syinfo",
  name: "goshiyan",
  meta: {
    title: "走进石岩",
    icon: "sy",
    channelname: "goshiyan",
  },
  children: [
    {
      path: "syinfo",
      component: () => import("@/views/gosy"),
      name: "syinfo",
      meta: {
        title: "走进石岩",
        channelname: "shiyan",
      },
    },
    // 视频宣传
    {
      path: "videosadmin",
      component: () => import("@/views/gosy/video"),
      name: "videosadmin",
      meta: {
        title: "视频宣传",
        channelname: "syvideo",
      },
    },
    {
      path: "videosadminadd",
      component: () => import("@/views/gosy/video/add"),
      name: "videosadminadd",
      meta: {
        title: "新建视频宣传",
        noCache: true,
        activeMenu: "/goshiyan/videosadmin",
        channelname: "syvideo",
      },
      hidden: true,
    },
    {
      path: "videosadminedit",
      component: () => import("@/views/gosy/video/edit"),
      name: "videosadminedit",
      meta: {
        title: "编辑视频宣传",
        noCache: true,
        activeMenu: "/goshiyan/videosadmin",
        channelname: "syvideo",
      },
      hidden: true,
    },
    // 历史文化
    {
      path: "historyadmin",
      component: () => import("@/views/gosy/historyindex.vue"),
      name: "historyadmin",
      meta: {
        title: "历史文化",
      },
      children: [
        {
          path: "history",
          component: () => import("@/views/gosy/history"),
          name: "history",
          meta: {
            title: "人文底蕴",
            channelname: "lishi",
          },
        },
        {
          path: "historyadd",
          component: () => import("@/views/gosy/history/add.vue"),
          name: "historyadd",
          meta: {
            title: "新建",
            channelname: "lishi",
            noCache: true,
            activeMenu: "/goshiyan/historyadmin/history",
          },
          hidden: true,
        },
        {
          path: "historyedit",
          component: () => import("@/views/gosy/history/edit.vue"),
          name: "historyedit",
          meta: {
            title: "编辑",
            channelname: "lishi",
            noCache: true,
            activeMenu: "/goshiyan/historyadmin/history",
          },
          hidden: true,
        },
        {
          path: "historyflow",
          component: () => import("@/views/gosy/history/flow/index.vue"),
          name: "historyflow",
          meta: {
            title: "建制沿革",
            channelname: "historyflow",
          },
        },
        {
          path: "historyflowadd",
          component: () => import("@/views/gosy/history/flow/add.vue"),
          name: "historyflowadd",
          meta: {
            title: "新建",
            channelname: "historyflow",
            noCache: true,
            activeMenu: "/goshiyan/historyadmin/historyflow",
          },
          hidden: true,
        },
        {
          path: "historyflowedit",
          component: () => import("@/views/gosy/history/flow/edit.vue"),
          name: "historyflowedit",
          meta: {
            title: "编辑",
            channelname: "historyflow",
            noCache: true,
            activeMenu: "/goshiyan/historyadmin/historyflow",
          },
          hidden: true,
        },
        // {
        //   path: "historyflow",
        //   component: () => import("@/views/gosy/history/flow.vue"),
        //   name: "historyflow",
        //   meta: {
        //     title: "建制沿革",
        //     channelname: "historyflow",
        //   },
        // },
      ],
    },
    // 投资环境
    {
      path: "investor",
      component: () => import("@/views/gosy/tzhj.vue"),
      name: "investor",
      meta: {
        title: "投资环境",
        channelname: "touzihuanjing",
      },
      children: [
        // 产业高地
        {
          path: "highland",
          component: () => import("@/views/gosy/touzihuanjin/cygd/index.vue"),
          name: "highland",
          meta: {
            title: "产业高地",
            serverid:'362764234623472131237238127312',
            channelname: "chanyegaodi",
          },
        },
        {
          path: "policy",
          component: () => import("@/views/gosy/touzihuanjin/zczc/index.vue"),
          name: "policy",
          meta: {
            title: "政策支持",
            serverid:'9873786761863726482716274819287',
            channelname: "policy",
          },
        },
        // 活力商圈
        {
          path: "business",
          component: () => import("@/views/gosy/touzihuanjin/hlsq/index.vue"),
          name: "business",
          meta: {
            title: "活力商圈",
            channelname: "huoliushangquan",
          },
        },
        {
          path: "businessadd",
          component: () => import("@/views/gosy/touzihuanjin/hlsq/add.vue"),
          name: "historyadd",
          meta: {
            title: "新建商圈",
            channelname: "huoliushangquan",
            noCache: true,
            activeMenu: "/goshiyan/investor/business",
          },
          hidden: true,
        },
        {
          path: "businessedit",
          component: () => import("@/views/gosy/touzihuanjin/hlsq/edit.vue"),
          name: "historyedit",
          meta: {
            title: "编辑商圈",
            channelname: "huoliushangquan",
            noCache: true,
            activeMenu: "/goshiyan/investor/business",
          },
          hidden: true,
        },
        // 文体配套
        {
          path: "literary",
          component: () => import("@/views/gosy/touzihuanjin/wtpt/index.vue"),
          name: "literary",
          meta: {
            title: "文体配套",
            channelname: "wenti",
          },
        },
        {
          path: "literaryadd",
          component: () => import("@/views/gosy/touzihuanjin/wtpt/add.vue"),
          name: "literaryadd",
          meta: {
            title: "新建文体",
            channelname: "wenti",
            noCache: true,
            activeMenu: "/goshiyan/investor/literary",
          },
          hidden: true,
        },
        {
          path: "literaryedit",
          component: () => import("@/views/gosy/touzihuanjin/wtpt/edit.vue"),
          name: "literaryedit",
          meta: {
            title: "编辑文体",
            channelname: "wenti",
            noCache: true,
            activeMenu: "/goshiyan/investor/literary",
          },
          hidden: true,
        },
        // 区位交通
        {
          path: "regionaltransportation",
          component: () => import("@/views/gosy/touzihuanjin/qwjt/index.vue"),
          name: "regionaltransportation",
          meta: {
            title: "区位交通",
            serverid:'986217384827467773216712368721',
            channelname: "quweijiaotong",
          },
        },
        // 公共服务
        {
          path: "publicservices",
          component: () => import("@/views/gosy/touzihuanjin/ggfw/index.vue"),
          name: "publicservices",
          meta: {
            title: "公共服务",
            serverid:'887766625715263748987362518721',
            channelname: "gonggongfuwu",
          },
        },
        // 街道商会
        {
          path: "chamber",
          component: () => import("@/views/gosy/touzihuanjin/jdsh/index.vue"),
          name: "chamber",
          meta: {
            title: "街道商会",
            channelname: "jiedaoshanghui",
          },
        },
        {
          path: "chamberadd",
          component: () => import("@/views/gosy/touzihuanjin/jdsh/add.vue"),
          name: "chamberadd",
          meta: {
            title: "新建商会",
            channelname: "jiedaoshanghui",
            noCache: true,
            activeMenu: "/goshiyan/investor/chamber",
          },
          hidden: true,
        },
        {
          path: "chamberedit",
          component: () => import("@/views/gosy/touzihuanjin/jdsh/edit.vue"),
          name: "chamberedit",
          meta: {
            title: "编辑商会",
            channelname: "jiedaoshanghui",
            noCache: true,
            activeMenu: "/goshiyan/investor/chamber",
          },
          hidden: true,
        },
      ],
    },
    {
      path: "future",
      component: () => import("@/views/gosy/weilai"),
      name: "future",
      meta: {
        title: "未来规划",
        channelname: "weilai",
      },
    },
    {
      path: "travel",
      component: () => import("@/views/gosy/travel"),
      name: "travel",
      meta: {
        title: "旅游景点",
        channelname: "lvyou",
      },
    },
    {
      path: "traveladd",
      component: () => import("@/views/gosy/travel/add.vue"),
      name: "traveladd",
      meta: {
        title: "添加景点",
        channelname: "lvyou",
        noCache: true,
        activeMenu: "/goshiyan/travel",
      },
      hidden: true,
    },
    {
      path: "traveledit",
      component: () => import("@/views/gosy/travel/edit.vue"),
      name: "traveledit",
      meta: {
        title: "编辑景点",
        channelname: "lvyou",
        noCache: true,
        activeMenu: "/goshiyan/travel",
      },
      hidden: true,
    },
  ],
};
export default caseRouter;
