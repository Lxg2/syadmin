<template>
  <div class="Transaction-box card-box mb32">
    <div class="top row-between mb24">
      <div class="row">
        <div class="title">转化率</div>
        <div class="time">数据更新时间: 2023-03-28 11:42:01</div>
      </div>
      <el-button type="text">
        <router-link :to="'/mdm/deal'">查看更多</router-link>
      </el-button>
    </div>
    <div class="chart-box">
      <div class="per-box row-between">
        <div id="transact"></div>
        <div id="ordernum"></div>
        <div id="paynum"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "Transaction",

  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart(), this.orderChart(), this.payChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("transact"));
      const chartOptions = {
        color: ["#2B71FF", "#16D2A2"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["商品访问数", "商品访客数"],
          left: 4,
          right: 51,
          itemGap: 40,
          itemWidth: 12,
          itemHeight: 12,
          icon: "circle",
          textStyle: {
            fontSize: 14,
            padding: [0, 0, 0, 5],
            width: 55,
          },
        },
        grid: {
          left: 12,
          right: 81,
          bottom: 47,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["商品访问数", "商品访问数"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#E2E2E2",
              type: "solid",
            },
          },
          axisLabel: {
            fontSize: 14,
            color: "#999999",
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#E2E2E2",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#E2E2E2",
              type: "solid",
            },
          },
          axisLabel: {
            show: true,
            interval: 0,
            color: "#999999",
            fontSize: 14,
            formatter: "{value}%",
          },
        },
        toolbox: {
          show: false,
        },
        series: [
          {
            name: "商品访问数",
            type: "line",
            smooth: true,
            data: [90, 1200],
          },
          {
            name: "商品访客数",
            type: "line",
            smooth: true,
            data: [2890, 3300],
          },
        ],
      };

      this.chart.setOption(chartOptions);
    },
    orderChart() {
      this.chart = echarts.init(document.getElementById("ordernum"));
      const chartOptions = {
        color: ["#2B71FF", "#16D2A2"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["商品访问数", "下单人数"],
          left: 4,
          right: 51,
          itemGap: 40,
          itemWidth: 12,
          itemHeight: 12,
          icon: "circle",
          textStyle: {
            fontSize: 14,
            padding: [0, 0, 0, 5],
            width: 55,
          },
        },
        grid: {
          left: 12,
          right: 81,
          bottom: 47,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["商品访问数", "下单人数"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#E2E2E2",
              type: "solid",
            },
          },
          axisLabel: {
            fontSize: 14,
            color: "#999999",
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#E2E2E2",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#E2E2E2",
              type: "solid",
            },
          },
          axisLabel: {
            show: true,
            interval: 0,
            color: "#999999",
            fontSize: 14,
            formatter: "{value}%",
          },
        },
        toolbox: {
          show: false,
        },
        series: [
          {
            name: "商品访问数",
            type: "line",
            smooth: true,
            data: [90, 1200],
          },
          {
            name: "下单人数",
            type: "line",
            smooth: true,
            data: [2890, 3300],
          },
        ],
      };

      this.chart.setOption(chartOptions);
    },
    payChart() {
      this.chart = echarts.init(document.getElementById("paynum"));
      const chartOptions = {
        color: ["#2B71FF", "#16D2A2"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["商品访问数", "支付人数"],
          left: 4,
          right: 51,
          itemGap: 40,
          itemWidth: 12,
          itemHeight: 12,
          icon: "circle",
          textStyle: {
            fontSize: 14,
            padding: [0, 0, 0, 5],
            width: 55,
          },
        },
        grid: {
          left: 12,
          right: 81,
          bottom: 47,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["商品访问数", "支付人数"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#E2E2E2",
              type: "solid",
            },
          },
          axisLabel: {
            fontSize: 14,
            color: "#999999",
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#E2E2E2",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#E2E2E2",
              type: "solid",
            },
          },
          axisLabel: {
            show: true,
            interval: 0,
            color: "#999999",
            fontSize: 14,
            formatter: "{value}%",
          },
        },
        toolbox: {
          show: false,
        },
        series: [
          {
            name: "商品访问数",
            type: "line",
            smooth: true,
            data: [90, 1200],
          },
          {
            name: "支付人数",
            type: "line",
            smooth: true,
            data: [2890, 3300],
          },
        ],
      };

      this.chart.setOption(chartOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
.Transaction-box {
  padding: 32px 40px 50px;

  .title {
    line-height: 54px;
    font-size: 20px;
    font-weight: bold;
    color: #333333;
  }
  .time {
    margin-left: 9px;
    line-height: 14px;
    font-size: 14px;
    color: #999999;
  }

  .chart-box {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 30.5%;

    .per-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      #transact,
      #ordernum,
      #paynum {
        width: 30.5%;
        height: 100%;
        background: #ffffff;
        border: 1px solid #e2e2e2;
      }
    }
  }
}
</style>