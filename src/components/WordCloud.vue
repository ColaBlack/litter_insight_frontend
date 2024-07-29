<template>
  <h2 style="text-align: center">群众信件词云图</h2>
  <div ref="wordCloud" style="width: 600px; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-wordcloud';

export default {
  name: 'WordCloudWithData',
  data() {
    return {
      wordCloudData: []
    };
  },
  async mounted() {
    await this.fetchData();
    this.initChart();
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$http.get('/word');
        this.wordCloudData = response.data
          .sort((a, b) => b.num - a.num)
          .slice(0, 100)
          .map(item => ({
            name: item.word,
            value: item.num
          }));
        console.log('Fetched data:', this.wordCloudData);
      } catch (error) {
        console.error('Error fetching word cloud data:', error);
      }
    },
    initChart() {
      const chart = echarts.init(this.$refs.wordCloud);

      chart.setOption({
        series: [{
          type: 'wordCloud',
          shape: 'circle',
          width: '100%',
          height: '100%',
          gridSize: 16,
          sizeRange: [14, 40],
          rotationRange: [0, 30],
          textStyle: {
            normal: {
              color: function () {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')';
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: this.wordCloudData
        }]
      });
    }
  }
};
</script>

<style scoped>
</style>
