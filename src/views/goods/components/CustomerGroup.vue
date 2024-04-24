<template>
  <div class="customer-container">
    <!-- 访问人群 -->
    <div class="chart-box">
      <div class="row-between">
        <div class="title">访问人群</div>
        <el-button type="text">导出</el-button>
      </div>

      <div class="row-between">
        <div>
          <div class="pro-box">
            <span class="vis blue">老用户</span>
            <span class="vis green">新用户</span>
          </div>

          <div class="probar">
            <el-progress
              :percentage="percentage"
              :format="format"
              :stroke-width="58"
              text-inside
              :show-text="false"
            />
          </div>
        </div>

        <div class="visit-box">
          <ul class="ulitems">
            <li
              class="liitem mb20"
              v-for="(item, index) in visitObj.data"
              :key="index"
            >
              <div class="text">{{ item.text }}</div>
              <div class="num-box">
                <div class="num">{{ item.num }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="title" style="margin: 50px 0 10px 0">访问时间分布</div>

      <div id="access-time"></div>
    </div>

    <!-- 数据列表 -->
    <div class="sku-box">
      <div class="row-between">
        <div class="title mb32">数据列表</div>
      </div>

      <div>
        <el-table style="width: 100%" :data="DltObj" class="panel_table">
          <el-table-column prop="datetime" label="日期" width="272" />

          <el-table-column prop="olduser" label="老用户" width="280">
            <template slot-scope="scope">
              <span style="color: #096bed">{{ scope.row.olduser }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="oldpro" label="老用户占比" width="275" />

          <el-table-column prop="newuser" label="新用户" width="276">
            <template slot-scope="scope">
              <span style="color: #096bed">{{ scope.row.newuser }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="newpro" label="新用户占比" width="295" />

          <el-table-column prop="meantime" label="平均停留时长" width="200" />
        </el-table>
      </div>

      <div class="underpart">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </div>
    </div>

    <!-- 付费人群 -->
    <div class="pay-box">
      <div class="title">付费人群</div>

      <div class="barga-box">
        <div class="heading">{{ bargains.heading }}</div>
        <ul class="flex">
          <li
            class="barga-item mr20 mb24 flex1"
            v-for="(bargains, index) in bargains.data"
            :key="index"
          >
            <div class="text">{{ bargains.text }}</div>
            <div class="num-box">
              <div class="num">{{ bargains.num }}</div>
            </div>
          </li>
        </ul>

        <div class="heading">{{ bargainews.heading }}</div>
        <ul class="flex">
          <li
            class="barga-item mr20 mb24 flex1"
            v-for="(bargainews, index) in bargainews.data"
            :key="index"
          >
            <div class="num-box">
              <div class="num">{{ bargains.num }}</div>
            </div>
          </li>
        </ul>
      </div>

      <div class="title">新老用户成交趋势</div>
      <div id="transact"></div>

      <div class="title" style="margin: 100px 0 13px">数据列表</div>

      <div class="row multi-user" style="width: 100%">
        <div class="multi blue">老用户</div>
        <div class="multi green">新用户</div>
      </div>

      <!-- 数据列表 -->
      <el-table style="width: 100%" :data="UserObj" class="panel_table">
        <el-table-column
          prop="datelist"
          label="日期"
          width="180"
        ></el-table-column>

        <el-table-column prop="usernum" label="用户数" width="150">
          <template slot-scope="scope">
            <span style="color: #096bed">{{ scope.row.usernum }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="propor"
          label="占比"
          width="106"
        ></el-table-column>

        <el-table-column
          prop="pct"
          label="客单价"
          width="136"
        ></el-table-column>

        <el-table-column
          prop="payment"
          label="支付金额"
          width="140"
        ></el-table-column>

        <el-table-column
          prop="paycon"
          label="支付转化率"
          width="138"
        ></el-table-column>

        <el-table-column prop="usernum" label="用户数" width="160">
          <template slot-scope="scope">
            <span style="color: #096bed">{{ scope.row.usernum }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="propor"
          label="占比"
          width="120"
        ></el-table-column>

        <el-table-column
          prop="pct"
          label="客单价"
          width="150"
        ></el-table-column>

        <el-table-column prop="payment" label="支付金额"></el-table-column>

        <el-table-column
          prop="paycon"
          label="支付转化率"
          width="140"
        ></el-table-column>
      </el-table>

      <div class="underpart">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>
  
<script>
import echarts from "echarts";
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";

export default {
  name: "CustomerGroup",
  components: { Pagination },
  data() {
    return {
      chart: null,
      radio: "1",
      name: "1",
      value: "",
      seek: "",
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      visitObj: {
        data: [
          {
            text: "老用户",
            num: "70%",
          },
          {
            text: "新用户",
            num: "30%",
          },
        ],
      },
      DltObj: [
        {
          datetime: "2023-03-31",
          olduser: 10089,
          oldpro: "70%",
          newuser: 9089,
          newpro: "30%",
          meantime: 10,
        },
        {
          datetime: "2023-03-31",
          olduser: 10089,
          oldpro: "70%",
          newuser: 9089,
          newpro: "30%",
          meantime: 10,
        },
        {
          datetime: "2023-03-31",
          olduser: 10089,
          oldpro: "70%",
          newuser: 9089,
          newpro: "30%",
          meantime: 10,
        },
      ],
      bargains: {
        heading: "老用户成交",
        data: [
          {
            text: "用户数",
            num: 5600,
          },
          {
            text: "成交用户占比",
            num: "75%",
          },
          {
            text: "客单价",
            num: "280.00",
          },
          {
            text: "支付金额",
            num: 280000.0,
          },
          {
            text: "支付转化率",
            num: "60%",
          },
        ],
      },
      bargainews: {
        heading: "新用户成交",
        data: [
          {
            num: 3600,
          },
          {
            num: "25%",
          },
          {
            num: "248.00",
          },
          {
            num: 178089.0,
          },
          {
            num: "40%",
          },
        ],
      },
      UserObj: [
        {
          datelist: "2023-03-31",
          usernum: 10089,
          propor: "70%",
          pct: 280.0,
          payment: 280909.0,
          paycon: "65%",
        },
        {
          datelist: "2023-03-31",
          usernum: 10089,
          propor: "70%",
          pct: 280.0,
          payment: 280909.0,
          paycon: "65%",
        },
        {
          datelist: "2023-03-31",
          usernum: 10089,
          propor: "70%",
          pct: 280.0,
          payment: 280909.0,
          paycon: "65%",
        },
        {
          datelist: "2023-03-31",
          usernum: 10089,
          propor: "70%",
          pct: 280.0,
          payment: 280909.0,
          paycon: "65%",
        },
      ],
      percentage: 70,
      subPercentage: 30,
    };
  },
  mounted() {
    this.initChart();
    this.accChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  created() {
    this.getList();
  },
  computed: {
    format() {
      return (percentage, successPercentage) => {
        return `${this.subPercentage}% / ${percentage}%`;
      };
    },
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    accChart() {
      this.chart = echarts.init(document.getElementById("access-time"));
      const chartOptions = {
        color: ["#096BED", "#16D2A2"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["老用户", "新用户"],
          right: 87,
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
          left: 18,
          right: 59,
          bottom: 32,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "2023-03-10",
            "2023-03-11",
            "2023-03-12",
            "2023-03-13",
            "2023-03-14",
            "2023-03-15",
            "2023-03-16",
            "2023-03-17",
          ],
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
          },
        },
        toolbox: {
          show: false,
        },
        series: [
          {
            data: [182, 120, 132, 101, 134, 90, 230, 210],
            type: "line",
            smooth: true,
          },
          {
            data: [120, 150, 232, 201, 154, 190, 330, 410],
            type: "line",
            smooth: true,
          },
        ],
      };
      this.chart.setOption(chartOptions);
    },
    initChart() {
      this.chart = echarts.init(document.getElementById("transact"));
      const chartOptions = {
        color: ["#096BED", "#16D2A2"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["老用户", "新用户"],
          right: 87,
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
          left: 18,
          right: 59,
          bottom: 32,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "2023-03-10",
            "2023-03-11",
            "2023-03-12",
            "2023-03-13",
            "2023-03-14",
            "2023-03-15",
            "2023-03-16",
            "2023-03-17",
          ],
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
          },
        },
        toolbox: {
          show: false,
        },
        series: [
          {
            data: [182, 120, 132, 101, 134, 90, 230, 210],
            type: "line",
            smooth: true,
          },
          {
            data: [120, 150, 232, 201, 154, 190, 330, 410],
            type: "line",
            smooth: true,
          },
        ],
      };
      this.chart.setOption(chartOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
.ana-container {
  font-family: Microsoft YaHei;

  .title {
    font-size: 20px;
    font-weight: bold;
    color: #333333;
  }
  .chart-box {
    padding: 40px 34px 56px 42px;
    background: #ffffff;
    margin-top: 30px;

    .pro-box {
      margin: 42px 0 32px 10px;
    }
    .vis {
      margin-right: 40px;
      &:last-child {
        margin-right: 0;
      }
      &.blue::before {
        background: #2b71ff;
      }
      &.green::before {
        background: #16d2a2;
      }
      &::before {
        content: "";
        position: relative;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
      }
    }

    .probar {
      width: 900px;
      height: 59px;
      font-size: 20px;
    }
    .ulitems {
      .liitem {
        width: 250px;
        padding: 23px;
        background: #f8f8f8;
        border-radius: 10px;
        display: inline-block;
        margin: 40px 20px 0 0;

        .text {
          line-height: 14px;
          font-size: 14px;
          color: #999999;
          margin-bottom: 22px;
        }

        .num-box {
          margin-bottom: 15px;
          display: flex;
          align-items: center;

          .num {
            line-height: 30px;
            font-size: 30px;
            font-weight: bold;
            color: #333333;
          }
        }
      }
    }
  }

  #access-time,
  #transact {
    width: 100%;
    height: 511px;
  }

  .sku-box {
    padding: 40px 40px 72px;
    background-color: #ffffff;
  }

  .pay-box {
    margin-top: 30px;
    background: #ffffff;
    padding: 31px 37px 66px 34px;

    .title {
      height: 19px;
      font-size: 20px;
      font-weight: bold;
      color: #333333;
    }

    .barga-box {
      padding: 46px 40px 100px 33px;

      .heading {
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        line-height: 14px;
      }

      .barga-item {
        .text {
          line-height: 14px;
          font-size: 14px;
          color: #999999;
          margin: 22px 0;
        }
        .num-box {
          margin-bottom: 32px;
          display: flex;
          align-items: center;

          .num {
            line-height: 30px;
            font-size: 30px;
            font-weight: bold;
            color: #333333;
            margin-right: 24px;
          }
        }
      }
    }

    .multi {
      width: 100%;
      height: 48px;
      text-align: center;
      line-height: 48px;
      font-size: 16px;
      font-weight: 400;
      color: #666666;
      &.blue {
        background: #f1f7ff;
      }
      &.green {
        background: #f4fff8;
      }
    }
  }

  .underpart {
    margin-top: 65px;
  }
}

::v-deep .el-progress-bar__outer {
  background-color: #16d2a2;
}
::v-deep .el-table th.is-leaf,
.el-table td {
  border-bottom: 0;
}
</style>