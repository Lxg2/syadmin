/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const compRouter = {
  path: "/account",
  component: Layout,
  redirect: "/space/accountadmin",
  name: "account",
  meta: {
    title: "账号设置",
    icon: "account",
  },
  children: [
    {
      path: "accountadmin",
      component: () => import("@/views/userinfo"),
      name: "accountadmin",
      meta: {
        title: "账号设置",
        channelname: "zhanghao",
      },
    },
  ],
};
export default compRouter
