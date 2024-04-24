<template>
    <div ref="chartContainer" :style="{ height: height, width: width }"></div>
  </template>
  
  <script>
  import echarts from 'echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import ResizeObserver from 'resize-observer-polyfill/dist/ResizeObserver.es'
  
  export default {
    name: 'ECharts',
    props: {
      options: {
        type: Object,
        required: true
      },
      height: {
        type: String,
        default: '100%'
      },
      width: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
      this.observeResize()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    watch: {
      options: {
        handler(newOptions) {
          this.chart.setOption(newOptions)
        },
        deep: true
      }
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$refs.chartContainer)
        this.chart.setOption(this.options)
      },
      observeResize() {
        const ro = new ResizeObserver(entries => {
          for (let entry of entries) {
            this.chart.resize()
          }
        })
        ro.observe(this.$refs.chartContainer)
      }
    }
  }
  </script>