<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <BarChart />
      </div>
      <div class="col">
        <LineChart />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <PieChart />
      </div>
      <div class="col">
        <WordCloud />
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'
import WordCloud from './components/WordCloud.vue'

export default {
  name: 'App',
  components: {
    BarChart,
    LineChart,
    PieChart,
    WordCloud
  }
};
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 确保容器充满整个视口高度 */
}

.row {
  display: flex;
  flex-direction: row;
}

.col {
  flex: 1; /* 每个列占满一行 */
  margin: 10px; /* 添加一些间距 */
}
</style>
