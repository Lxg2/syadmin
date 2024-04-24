<template>
  <div class="visitpage-box card-box">
    <div class="title" style="margin-bottom: 50px;">受访页面趋势</div>
    <!-- 图表 -->
    <div class="Chart-box " style="position: relative;">
      <el-scrollbar class="data-scroll" style="align-items: center;position: absolute;z-index: 9999;width: 60%;overflow: hidden;margin-right: 20px !important;padding-right: 10px;">
        <div class="flex mr20" style="flex-wrap: nowrap;box-sizing: border-box;">
        <div class="mr20">
          <el-radio-group v-model="radio" size="medium" style="display: flex !important;">
            <el-radio-button label="1" border>近7天</el-radio-button>
            <el-radio-button label="2" border>近14天</el-radio-button>
            <el-radio-button label="3" border>近1个月</el-radio-button>
          </el-radio-group>
        </div>
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
      </el-scrollbar>
      <Myecharts :options="chartOptions" height="450px"></Myecharts>
    </div>
    <div>
      <div class="row-between">
        <div class="title">数据列表</div>
        <div class="row">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <el-button size="small" class="ml20" plain>导出数据</el-button>
        </div>
      </div>

      <el-table :data="tableData" class="panel_table">
        <el-table-column prop="day" label="日期"/>
        <el-table-column prop="paview" label="访问量" />
        <el-table-column prop="visitor" label="访客">
          <template slot-scope="scope">
            <span style="color: #096bed">{{ scope.row.visitor }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="平均访问时长" width="200" />
      </el-table>
    </div>
    <div class="foot">
      <pagination
        style="justify-content: flex-end;"
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import Pagination from "@/components/Pagination";
import Myecharts from '@/components/Echarts'

export default {
  name: "Visitpage",
  components: { Pagination,Myecharts },
  data() {
    return {
      chart: null,
      chartOptions : {
                color: ['#16D2A2'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['访问量'],
                    top:10,
                    right: 0,
                    itemGap: 40,
                    itemWidth: 12,
                    itemHeight: 12,
                    icon: "circle",
                    textStyle: {
                        fontSize: 14,
                        padding: [0, 0, 0, 5],
                        width: 55
                    }
                },
                grid: {
                    left: 0,
                    top:100,
                    right: 10,
                    bottom: 0,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [
                        '0',
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '10',
                        '11',
                        '12',
                        '13',
                        '14',
                    ],
                    axisLine: {
                      show: true,
                      lineStyle: {
                        color: '#E2E2E2',
                        type: "solid"
                      }
                    },
                    axisLabel: {
                      fontSize: 14,
                      color: '#999999',
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine :{
                      lineStyle :{
                          type:'dashed',
                          color: '#E2E2E2'
                      }
                    },
                    axisLine: {
                      show: true,
                      lineStyle: {
                        color: '#E2E2E2',
                        type: "solid"
                      }
                    },
                    axisLabel: {
                      show: true,
                      interval: 0,
                      color: '#999999',
                      fontSize: 14,
                      formatter: '{value}%',
                    }
                },
                toolbox: {
                    show: false,
                },
                series: [
                    {
                        name: '访问量',
                        type: 'line',
                        smooth: true,
                        data: [2000, 1600, 1120, 1410, 1140, 1500, 1000, 1100, 1800, 1820, 1910, 2340, 2900, 3300, 310]
                    },
                ]
      },
      value: "",
      radio:'1',
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      tableData: [
        {
          day: "2023-03-02",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-04",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-01",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-03",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-02",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-04",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-01",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
        {
          day: "2023-03-03",
          paview: "100089",
          visitor: "1200",
          user: "1200",
          time: "00:12:45",
          usum: "200000",
        },
      ],
    };
  },
  created() {
    this.getList();
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
      this.chart = echarts.init(document.getElementById("trend"));
      const chartOptions = {
        color: ["#16D2A2"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["访问量"],
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
          left: 12,
          right: 81,
          bottom: 47,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2023-03-01",
            "2023-03-02",
            "2023-03-03",
            "2023-03-04",
            "2023-03-05",
            "2023-03-06",
            "2023-03-07",
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
            formatter: "{value}%",
          },
        },
        toolbox: {
          show: false,
        },
        series: [
          {
            name: "访问量",
            type: "line",
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210],
          },
        ],
      };
      this.chart.setOption(chartOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.data-scroll .el-scrollbar__wrap{
  overflow-y:hidden;
}
.visitpage-box {
  padding: 23px 73px 0 32px;

  .title {
    height: 19px;
    font-size: 20px;
    font-weight: bold;
    color: #333333;
  }

  #trend {
    width: 100%;
    height: 468px;
  }

  .row-between {
    margin: 90px 0px 37px 0px;
  }

  .foot {
    padding: 30px 0;
  }
}
</style>