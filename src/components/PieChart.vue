<template>
  <h2 style="text-align: center">每个类型的信件数量</h2>
  <div ref="chart" style="width: 600px;height:400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'TypePieChart',
  data() {
    return {
      typeData: [],
    };
  },
  created() {
    this.fetchTypeData();
  },
  methods: {
    fetchTypeData() {
      fetch("http://114.55.119.106:1001/type")
        .then(response => response.json())
        .then(data => {
          this.typeData = data;
          this.initChart();
        })
        .catch(error => {
          console.error('Error fetching type data:', error);
        });
    },
    initChart() {
      if (this.$refs.chart) {
        const myChart = echarts.init(this.$refs.chart);
        const chartData = this.typeData.map(item => ({
          name: item.type,
          value: item.num,
        }));

        const chartOption = {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '50%',
              data: chartData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
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
