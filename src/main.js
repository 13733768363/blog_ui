import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './api/http'
import ElementUI from 'element-ui';
import qs from 'qs';
import 'element-ui/lib/theme-chalk/index.css';
import FunctionalCalendar from 'vue-functional-calendar';

Vue.use(ElementUI);
Vue.use(FunctionalCalendar, {
  dayNames: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
});
Vue.prototype.http = http
Vue.prototype.qs = qs
Vue.prototype.basePath = "http://127.0.0.1:8081"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
