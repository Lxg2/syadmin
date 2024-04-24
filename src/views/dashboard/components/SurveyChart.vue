<template>
    <div class="surveyChart-box card-box mb32">
        <div class="title">近7天小程序状况</div>
        <div id="content"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'SurveyChart',

    data() {
        return {
            chart: null,
        }
    },
    mounted() {
        this.initChart()
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart() {
            this.chart = echarts.init(document.getElementById('content'))
            const chartOptions = {
                color: ['#FFC446', '#2B71FF', '#16D2A2'],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['访问量', '新增用户', '总用户量'],
                    right: 87,
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
                    left: 12,
                    right: 81,
                    bottom: 47,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [
                        '2023-03-01',
                        '2023-03-02',
                        '2023-03-03',
                        '2023-03-04',
                        '2023-03-05',
                        '2023-03-06',
                        '2023-03-07'
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
                    name: "单位：万",
                    nameTextStyle: {
                        color:'#999999',
                        fontSize: 14,
                    },
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
                      color: '#999999',
                      fontSize: 14,
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
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '新增用户',
                        type: 'line',
                        smooth: true,
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '总用户量',
                        type: 'line',
                        smooth: true,
                        data: [150, 232, 201, 154, 190, 330, 410]
                    }
                ]
            };
            this.chart.setOption(chartOptions)
        }
    }
};
</script>

<style lang="scss" scoped>
.surveyChart-box {
    padding: 24px 0 0 24px;

    .title {
        height: 19px;
        font-size: 20px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 50px;
    }

    #content {
        width: 100%;
        height: 468px;
    }
}
</style>