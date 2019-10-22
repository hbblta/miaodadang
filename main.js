import Vue from 'vue'
import App from './App'
import http from './http'
import myhttp from './http/myhttp.js'
import store from './store'
import jurisdiction  from './common/jurisdiction.js'


Vue.config.productionTip = false
Vue.prototype.$jurisdiction = jurisdiction 
Vue.prototype.websiteUrl = 'https://openapi.hm8848.com'
Vue.prototype.$http = http;
Vue.prototype.$myhttp = myhttp;
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()


