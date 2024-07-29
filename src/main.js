import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

// 设置 Axios 的基础 URL
axios.defaults.baseURL = 'http://114.55.119.106:1001';

// 创建 Vue 应用实例
const app = createApp(App);

// 将 Axios 实例添加到 Vue 的全局属性中
app.config.globalProperties.$http = axios;

// 挂载应用程序
app.mount('#app');
