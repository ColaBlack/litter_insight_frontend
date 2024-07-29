<template>
  <h2 style="text-align: center">各个部门处理的信件数量</h2>
  <div ref="chart" style="width: 600px;height:400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'DepartmentChart',
  data() {
    return {
      departmentData: [],
      chart: null
    };
  },
  created() {
    this.fetchDepartmentData();
  },
  methods: {
    fetchDepartmentData() {
      this.$http.get('/department')
        .then(response => {
          this.departmentData = response.data;
          this.initChart();
        })
        .catch(error => {
          console.error('Error fetching department data:', error);
        });
    },
    initChart() {
      if (this.$refs.chart) {
        this.chart = echarts.init(this.$refs.chart);
        const departmentMap = new Map();
        this.departmentData.forEach(item => {
          const num = departmentMap.get(item.department) || 0;
          departmentMap.set(item.department, num + item.num);
        });

        const chartData = {
          tooltip: {},
          legend: {
            data: ['信件数']
          },
          xAxis: {
            data: Array.from(departmentMap.keys()),
            axisLabel: {
              show: false
            }
          },
          yAxis: {},
          series: [{
            name: '信件数',
            type: 'bar',
            data: Array.from(departmentMap.values())
          }]
        };

        this.chart.setOption(chartData);
      }
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>

<style scoped>
</style>
