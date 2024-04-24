<template>
  <div class="flowanalysis-container">
    <!-- 流量分析 -->
    <div class="chart-box">
      <div class="row-between">
        <div class="title">流量分析</div>
        <el-button type="text">导出</el-button>
      </div>

      <div class="flex">
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
              <div class="yesterday">
                昨日&nbsp;&nbsp;
                <img src="" alt="" />
                {{ item.yesterday }}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div id="flowchart"></div>
    </div>

    <!-- 数据列表 -->
    <div class="sku-box">
      <div class="title">数据列表</div>
      <div>
        <el-table :data="Dltdata" class="panel_table">
          <el-table-column prop="datetime" label="日期"></el-table-column>

          <el-table-column
            prop="goodstype"
            label="访问量"
            width="400"
          ></el-table-column>

          <el-table-column prop="pv" label="访客" width="400">
            <template slot-scope="scope">
              <span style="color: #096bed">{{ scope.row.pv }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="numdtl"
            label="平均停留时长"
            width="400"
          ></el-table-column>

          <el-table-column
            prop="numpay"
            label="商品详情跳出率"
          ></el-table-column>
        </el-table>
      </div>

      <div class="foot mt30">
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
  name: "FlowAnalysis",
  components: { Pagination },
  data() {
    return {
      chart: null,
      radio: "1",
      name: "1",
      seek: "",
      total: 0,
      listQuery: {
        page: 1,
        limit: 6,
      },
      visitObj: {
        data: [
          {
            text: "访问量",
            num: 4800,
            yesterday: "25%",
          },
          {
            text: "访客",
            num: 3801,
            yesterday: "25%",
          },
          {
            text: "评均停留时长（秒）",
            num: 45,
            yesterday: "25%",
          },
          {
            text: "商品详情跳出率",
            num: "30%",
            yesterday: "25%",
          },
        ],
      },
      Dltdata: [
        {
          datetime: "2023-03-31",
          goodstype: 10089,
          pv: 9089,
          numdtl: 8090,
          numpay: "45%",
        },
        {
          datetime: "2023-03-31",
          goodstype: 10089,
          pv: 9089,
          numdtl: 8090,
          numpay: "45%",
        },
        {
          datetime: "2023-03-31",
          goodstype: 10089,
          pv: 9089,
          numdtl: 8090,
          numpay: "45%",
        },
        {
          datetime: "2023-03-31",
          goodstype: 10089,
          pv: 9089,
          numdtl: 8090,
          numpay: "45%",
        },
      ],
    };
  },
  mounted() {
    this.initChart();
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
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    initChart() {
      this.chart = echarts.init(document.getElementById("flowchart"));
      const chartOptions = {
        color: ["#096BED"],
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
            formatter: function (val) {
              var strs = val.split("");
              var str = "";
              for (let i = 0, s; (s = strs[i++]); ) {
                str += s;
                if (!(i % 13)) str += "\n";
              }
              return str;
            },
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
        series: [
          {
            data: [182, 120, 132, 101, 134, 90, 230, 210],
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
.flowanalysis-container {
  .title {
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 30px;
  }
  .chart-box {
    padding: 40px 40px 56px;
    background: #ffffff;
    margin-top: 30px;

    .ulitems {
      margin-top: 60px;
      .liitem {
        width: 250px;
        padding: 23px;
        background: #f8f8f8;
        border-radius: 10px;
        display: inline-block;
        margin-right: 20px;

        &:hover {
          background-color: #edf5ff;
        }

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

        .yesterday {
          line-height: 14px;
          font-size: 14px;
          font-weight: bold;
          color: #666666;
        }

        img {
          width: 8px;
          height: 12px;
        }
      }
    }
  }

  #flowchart {
    width: 100%;
  }

  .sku-box {
    padding: 40px 33px 78px 66px;
    background-color: #ffffff;
  }
}
</style>