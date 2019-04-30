import Vue from 'vue'
import './style/base.scss'
import App from './App.vue'
import router from './router'

// 全局注册所有组件
import UniubiBase from '../packages'

Vue.use(UniubiBase)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
