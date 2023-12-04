import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import './style.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import routes from './router/index.js';

const app = createApp(App);

const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

app.use(router).use(Antd).mount('#app');
