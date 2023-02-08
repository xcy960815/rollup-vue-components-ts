// @ts-ignore
import rollupVueComponentsTs from './rollup-vue-components-ts.vue'
import { VueConstructor } from "vue"

const install = (Vue_2: VueConstructor) => {
    Vue_2.component(`rollup-vue-components-ts`, rollupVueComponentsTs)
}

export {
    rollupVueComponentsTs
}

export default {
    install,
}
