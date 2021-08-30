<template>
  <div class="demo">
    {{ message }}
    <div class="demo">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'demo',
})
export default class Demo extends Vue {
  // 防止在ts-vue 使用use 方法出错
  static install(vue: typeof Vue): void {}
  message: string = 'vue+ts+rollup'
}
</script>

<style lang="scss" scoped>
.demo {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 20px;
}
</style>
