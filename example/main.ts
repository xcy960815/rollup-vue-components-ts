
import Vue from 'vue'
// @ts-ignore
import App from './App'
Vue.config.productionTip = false
import RollupVueComponentsTs from "rollup-vue-components-ts"

Vue.use(RollupVueComponentsTs)
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})