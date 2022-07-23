<template>
  <div class="rollup-vue-components-ts">
    <h3>{{ name }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'rollup-vue-components-ts',
})
export default class RollupVueComponentsTs extends Vue {
  // 防止在ts-vue 使用use 方法出错
  static install(vue: typeof Vue): void { }
  name: string = "rollup-vue-components-ts-demo"
}
</script>

<style lang="scss" scoped>
.rollup-vue-components-ts {
  position: relative;
}
</style>
