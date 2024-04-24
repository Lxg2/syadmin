<template>
  <div class="dashboard-container">
      <el-row :gutter="30" class="dashboard-top row-between mb32" style="flex-wrap: wrap;">
        <el-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
          <div class="dashboard-top-left flex1">
            <panel :panelData="panelData1" />
            <common-fun />
            <overview :overviewObj="overviewObj1" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="7">
          <hot-news />
        </el-col>
      </el-row>
    <!-- <survey-chart /> -->
    <panel :panelData="panelData2" :customStyle="{ padding: '0 40px' }" />
    <div class="shop-overview">
      <overview :overviewObj="overviewObj2" />
    </div>
  </div>
</template>

<script>
import Panel from "./components/Panel";
import CommonFun from "./components/CommonFun";
import HotNews from "./components/HotNews";
import Overview from "./components/Overview";
import SurveyChart from "./components/SurveyChart";
export default {
  name: "Dashboard",
  components: { Panel, CommonFun, HotNews, Overview, SurveyChart },
  data() {
    return {
      panelData1: [
        {
          icon: "",
          color: "#ECEEFF",
          num: 890,
          text: "资讯",
        },
        {
          icon: "",
          color: "#FFF9E2",
          num: 1876,
          text: "视频",
        },
        {
          icon: "",
          color: "#E4FFFC",
          num: 617,
          text: "案例",
        },
        {
          icon: "",
          color: "#EAF3FF",
          num: 617,
          text: "资料",
        },
      ],
      panelData2: [
        {
          icon: "",
          color: "#EAF3FF",
          num: 890,
          text: "待付款",
        },
        {
          icon: "",
          color: "#EAF7FF",
          num: 1876,
          text: "待发货",
        },
        {
          icon: "",
          color: "#ECEEFF",
          num: 514,
          text: "待售后",
        },
        {
          icon: "",
          color: "#E4FFFC",
          num: 617,
          text: "待评价",
        },
        {
          icon: "",
          color: "#FFF9E2",
          num: 20,
          text: "预警处理",
        },
      ],
      overviewObj1: {
        title: "小程序实时流量",
        time: "2023-02-28 11:42:01",
        data: [
          {
            text: "小程序访问流量",
            num: 480000,
            yesterday: 189900,
          },
          {
            text: "总用户量",
            num: 2938,
            yesterday: 3897,
          },
          {
            text: "新增用户",
            num: 293,
            yesterday: 189,
          },
        ],
      },
      overviewObj2: {
        title: "商店实时概况",
        time: "2023-02-28 11:42:01",
        data: [
          {
            text: "支付金额",
            num: 480000,
            yesterday: 189900,
          },
          {
            text: "支付订单",
            num: 2938,
            yesterday: 3897,
          },
          {
            text: "支付买家数",
            num: 293,
            yesterday: 189,
          },
          {
            text: "支付转化率",
            num: 2938,
            yesterday: 3897,
          },
          {
            text: "客单价",
            num: 293,
            yesterday: 189,
          },
          {
            text: "商品浏览数",
            num: 293,
            yesterday: 189,
          },
        ],
      },
    };
  },
  computed: {},
  created() {},
};
</script>
<style lang="scss" scoped>
.dashboard-container {
  overflow-x: hidden;
  overflow-y: auto;
  .shop-overview {
    ::v-deep {
      .overview-box {
        padding-bottom: 30px;
      }
      .overview-items {
        flex-wrap: wrap;
        .overview-item {
          padding-left: 24px;
          width: 18.75%;
          flex: none;
          margin-bottom: 12px;
        }
      }
    }
  }
}
</style>
