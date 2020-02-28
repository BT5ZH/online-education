import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import CxltToastr from 'cxlt-vue2-toastr'
import {store} from '../../store/index';
// import router from './router'

Vue.use(VueResource)

Vue.http.options.root = 'https://67yra4mxye.execute-api.cn-northwest-1.amazonaws.com.cn/rsuser';
Vue.http.headers.common['Content-Type'] = 'application/json';

var toastrConfigs = {
  position: 'top full width',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
  showDuration: 2000,
  hideDuration: 2000,
  timeOut: 5000
}

Vue.use(CxltToastr, toastrConfigs);


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
