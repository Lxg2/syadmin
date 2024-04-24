<template>
  <div class="dashboard-container">
    <div class="dashboard-top row-between mb32">
      <div class="dashboard-top-left flex1">
        <overview :overviewObj="overviewObj" />
      </div>
    </div>
    <survey-chart />
    <Transaction />
    <HotVis class="mb32" />
    <HotPay />
  </div>
</template>

<script>
import Transaction from "./components/Transaction";
import Overview from "./components/Overview";
import SurveyChart from "./components/SurveyChart";
import HotVis from "./components/HotVis";
import HotPay from "./components/HotPay.vue";

export default {
  name: "Dashboard",
  components: { Overview, SurveyChart, Transaction, HotVis, HotPay },
  data() {
    return {
      overviewObj: {
        title: "商店实时概况",
        time: "2023-03-28 11:42:01",
        data: [
          {
            text: "支付金额",
            num: 4800.0,
            yesterday: 1899.0,
          },
          {
            text: "支付订单数",
            num: 2638,
            yesterday: 3897,
          },
          {
            text: "支付买家数",
            num: 2938,
            yesterday: 3897,
          },
          {
            text: "访问量",
            num: 10000,
            yesterday: 10909,
          },
          {
            text: "访客数",
            num: 9080,
            yesterday: 9000,
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
  overflow-y: auto;

  /* .shop-overview {
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
  } */
}
</style>
