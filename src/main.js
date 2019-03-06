import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import {ApiService} from './services/api.service'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'


window.toastr = require('toastr');


// Set the base URL of the API
ApiService.init('http://jive-core.herokuapp.com/api/v1');

if (store.dispatch('isLoggedIn'))
    ApiService.setHeader(store.getters.GET_AUTH_TOKEN);
else
    store.dispatch('UNSET_USER').then(() => {});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

Vue.use(VueToastr2);

