import Vue from 'vue'
import App from './App.vue'
import './firebase.setup'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
