import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, BIcon, BIconShieldLock, BIconGlobe, BIconKey, BIconKeyFill, BIconSegmentedNav, BIconClipboard } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.component('BIcon', BIcon)
Vue.component('BIconShieldLock', BIconShieldLock)
Vue.component('BIconGlobe', BIconGlobe)
Vue.component('BIconKey', BIconKey)
Vue.component('BIconKeyFill', BIconKeyFill)
Vue.component('BIconSegmentedNav', BIconSegmentedNav)
Vue.component('BIconClipboard', BIconClipboard)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
