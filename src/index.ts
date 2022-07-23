// @ts-ignore
import rollupVueComponentsTs from './rollup-vue-components-ts.vue'
// import {Vue as _Vue} from "vue-property-decorator"
const install = (Vue) => {
    Vue.component(rollupVueComponentsTs.name, rollupVueComponentsTs)
}

export {
    rollupVueComponentsTs
}
export default {
    install,
}
