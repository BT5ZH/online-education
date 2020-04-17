import Vue from 'vue';
import VueRouter from 'vue-router';
import Online from './Online.vue';
import {routes} from './router';
import axios from 'axios';
import {store} from '../../store/index';
import Cxlt from 'cxlt-vue2-toastr';
// import utils from '../../js/utils';

Vue.use(VueRouter);

Vue.prototype.axios = axios;
// Vue.prototype.utils = utils;

var toConfigs = {
    position: 'top center',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
    showDuration: 2000,
    hideDuration: 2000,
    timeOut: 5000
  }
Vue.use(Cxlt, toConfigs);

const router = new VueRouter({
    routes,
});
new Vue({
    router,
    store,
    render: h => h(Online)
}).$mount('#online')