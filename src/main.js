import Vue from 'vue'
import App from './App.vue'
import router from '@/permission'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "normalize.css"
import axios from '@/axios';
import Cookie from 'js-cookie';
import store from '@/store'
// import 'https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js';

Vue.config.productionTip = false;
Vue.use(ElementUI);    //vue use原理
Vue.prototype.$http = axios;
Vue.prototype.$cookie = Cookie;
Vue.prototype.$EventBus = new Vue();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
