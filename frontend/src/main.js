import Vue from 'vue'
import moment from 'moment'
import App from './App.vue'
import './plugins/bootstrap'
import router from './plugins/router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('formatDate', function (value, format) {
    if (!value) return ''
    return moment.utc(value).format(format || 'DD.MM.YYYY hh:mm')
})

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')