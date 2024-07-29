<template>
  <h2 style="text-align: center">历年来信数量</h2>
  <div ref="chart" style="width: 600px;height:400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'YearChart',
  data() {
    return {
      yearData: [],
    };
  },
  created() {
    this.fetchYearData();
  },
  methods: {
    fetchYearData() {
      fetch("http://114.55.119.106:1001/year")
        .then(response => response.json())
        .then(data => {
          this.yearData = data;
          this.initChart();
        })
        .catch(error => {
          console.error('Error fetching year data:', error);
        });
    },
    initChart() {
      if (this.$refs.chart) {
        const myChart = echarts.init(this.$refs.chart);
        const xAxisData = this.yearData.map(item => item.year);
        const seriesData = this.yearData.map(item => item.num);

        const chartOption = {
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['信件数量'],
            left: 'center',
            top: 'top'
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            name: '信件数量',
            data: seriesData,
            type: 'line',
            smooth: true,
          }]
        };

        myChart.setOption(chartOption);
      }
    }
  },
  beforeDestroy() {
    if (this.$refs.chart && this.$refs.chart.dispose) {
      this.$refs.chart.dispose();
    }
  }
};
</script>

<style scoped>
</style>
