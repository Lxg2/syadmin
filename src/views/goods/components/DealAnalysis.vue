<template>
  <div class="deal-container">
    <!-- 交易分析 -->
    <div class="chart-box">
      <div class="row-between">
        <div class="title">交易分析</div>
        <el-button type="text">导出</el-button>
      </div>

      <div class="flex">
        <div class="visit-box">
          <div class="title-bar">{{ visitObj.title }}</div>
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

        <div class="order-box">
          <div class="title-bar">{{ orderObj.title }}</div>
          <ul class="ulitems">
            <li
              class="liitem mb20"
              v-for="(item, index) in orderObj.data"
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

        <div class="pay-box">
          <div class="title-bar">{{ payObj.title }}</div>
          <ul class="ulitems">
            <li
              class="liitem mb20"
              v-for="(item, index) in payObj.data"
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

      <div id="dealchart"></div>
    </div>

    <!-- sku分析 -->
    <div class="sku-box">
      <div class="row-between">
        <div class="title">sku分析</div>
        <el-button type="text">导出</el-button>
      </div>

      <el-table style="width: 100%" :data="Dltdata" class="dtl-item">
        <el-table-column prop="headline" label="规格"> </el-table-column>

        <el-table-column prop="goodstype" label="下单件数" width="220">
        </el-table-column>

        <el-table-column prop="pv" label="下单买家数" width="242">
          <template slot-scope="scope">
            <div style="color: #096bed" @click="dialogBuyer = true">
              {{ scope.row.pv }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="numdtl" label="付款件数" width="223">
        </el-table-column>

        <el-table-column prop="numpay" label="付款买家数" width="243">
          <template slot-scope="scope">
            <span style="color: #096bed">{{ scope.row.numpay }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="numm" label="付款金额" width="224">
        </el-table-column>

        <el-table-column prop="paypc" label="下单-支付转化率" width="178">
        </el-table-column>
      </el-table>

      <!-- 下单买家详情弹框 -->
      <el-dialog
        class="dialog-box"
        title="下单买家"
        :visible.sync="dialogBuyer"
        width="62%"
        :before-close="handleClose"
      >
        <div class="accesstime row-between mb30">
          <div class="block mb24 row">
            <div class="mr24" style="font-weight: 400; color: #333333">
              下单时间
            </div>
            <span class="demonstration"></span>
            <el-date-picker
              v-model="value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>

          <el-input
            v-model="listQuery.title"
            placeholder="输入关键词搜索"
            style="width: 360px; background: #f8f8f8"
            class="filter-item item-input"
            @keyup.enter.native="handleFilter"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>

        <el-table style="width: 100%" :data="orderdata" class="buyer-box">
          <el-table-column prop="paview" label="用户名" width="208">
            <template slot-scope="scope">
              <div class="flex">
                <el-image class="thumb" />
                <div class="content-box">
                  <span class="onelines">{{ scope.row.username }}</span>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="vistime" label="下单时间" width="214" />

          <el-table-column prop="paynum" label="下单件数" width="180" />

          <el-table-column prop="paymoy" label="下单金额" width="216" />

          <el-table-column prop="payStatus" label="支付状态">
            <template slot-scope="scope">
              <div
                :style="{
                  color: scope.row.payStatus ? 'red' : '#16D2A2',
                }"
              >
                {{ PAY_STATUS[scope.row.payStatus] }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="operate"
            label="操作"
            min-width="100"
          >
            <div class="operate">
              <el-button type="text">用户轨迹</el-button>
            </div>
          </el-table-column>
        </el-table>

        <div class="dialog-foot row">
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
          />
          <el-button type="primary" size="small">确定</el-button>
        </div>
      </el-dialog>

      <div class="foot">
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
  name: "DealAnalysis",
  components: { Pagination },
  data() {
    const PAY_STATUS = {
      0: "未支付",
      1: "已支付",
    };
    return {
      PAY_STATUS,
      chart: null,
      total: 0,
      dialogBuyer: false,
      value: "",
      listQuery: {
        page: 1,
        limit: 6,
      },
      visitObj: {
        title: "访问数据",
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
        ],
      },
      orderObj: {
        title: "下单数据",
        data: [
          {
            text: "下单人数",
            num: 2809,
            yesterday: "25%",
          },
          {
            text: "下单件数",
            num: 3801,
            yesterday: "25%",
          },
          {
            text: "下单金额",
            num: 280900.0,
            yesterday: "25%",
          },
          {
            text: "下单转化率",
            num: "40%",
            yesterday: "25%",
          },
        ],
      },
      payObj: {
        title: "支付数据",
        data: [
          {
            text: "支付人数",
            num: 28090,
            yesterday: "25%",
          },
          {
            text: "支付件数",
            num: 20809,
            yesterday: "25%",
          },
          {
            text: "支付金额",
            num: 28090.0,
            yesterday: "25%",
          },
          {
            text: "支付转化率",
            num: "40%",
            yesterday: "25%",
          },
          {
            text: "客单价",
            num: 28090.0,
            yesterday: "25%",
          },
          {
            text: "下单支付转化率",
            num: "20%",
            yesterday: "25%",
          },
        ],
      },
      Dltdata: [
        {
          headline: "蓝色-大号",
          goodstype: 10089,
          pv: 9089,
          numdtl: 8089,
          numpay: 4200,
          numm: 80900.0,
          paypc: "45%",
        },
        {
          headline: "蓝色-大号",
          goodstype: 10089,
          pv: 9089,
          numdtl: 8089,
          numpay: 4200,
          numm: 80900.0,
          paypc: "45%",
        },
        {
          headline: "蓝色-大号",
          goodstype: 10089,
          pv: 9089,
          numdtl: 8089,
          numpay: 4200,
          numm: 80900.0,
          paypc: "45%",
        },
        {
          headline: "蓝色-大号",
          goodstype: 10089,
          pv: 9089,
          numdtl: 8089,
          numpay: 4200,
          numm: 80900.0,
          paypc: "45%",
        },
      ],
      orderdata: [
        {
          username: "闰土",
          vistime: "2023-03-28 15:00:59",
          paynum: 3,
          paymoy: 2800.0,
          payStatus: 1,
        },
        {
          username: "闰土",
          vistime: "2023-03-28 15:00:59",
          paynum: 3,
          paymoy: 2800.0,
          payStatus: 0,
        },
        {
          username: "闰土",
          vistime: "2023-03-28 15:00:59",
          paynum: 3,
          paymoy: 2800.0,
          payStatus: 1,
        },
        {
          username: "闰土",
          vistime: "2023-03-28 15:00:59",
          paynum: 3,
          paymoy: 2800.0,
          payStatus: 0,
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
      this.chart = echarts.init(document.getElementById("dealchart"));
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
    handleClose() {
      this.dialogBuyer = false;
    },
  },
};
</script>


<style lang="scss" scoped>
.deal-container {
  .title {
    font-size: 20px;
    font-weight: bold;
    color: #333333;
  }

  .chart-box {
    padding: 40px 34px 56px 42px;
    background: #ffffff;
    margin: 30px 0;

    .title-bar {
      color: #096bed;
      margin: 50px 0 19px 0;
      font-size: 20px;
      font-weight: bold;
    }

    .ulitems {
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

  #dealchart {
    width: 100%;
  }

  .sku-box {
    padding: 40px 34px 72px 40px;
    background-color: #ffffff;

    .dtl-item {
      margin-bottom: 50px;
      font-size: 16px;
      font-weight: 400;
      color: #333333;
      line-height: 16px;
    }

    .buyer-box {
      .onelines {
        margin-left: 10px;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
      }
    }
    .dialog-foot {
      padding: 28px 0;
    }
  }
}

::v-deep .el-table th {
  height: 48px;
  // display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #f8f8f8;
  border: none;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
}

::v-deep .el-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  text-align: center;
}

::v-deep .el-table .cell {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  line-height: 30px;
}
</style>