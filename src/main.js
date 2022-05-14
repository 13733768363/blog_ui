import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './api/http'
import ElementUI from 'element-ui';
import qs from 'qs';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.prototype.http = http
Vue.prototype.qs = qs
Vue.prototype.basePath = "http://127.0.0.1:8081"
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
