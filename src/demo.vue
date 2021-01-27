<template>
  <div class="demo">
    {{ txt }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'demo',
})
export default class Demo extends Vue {
  message: string = 'demo'
}
</script>

<style lang="scss" scoped>
.demo {
  position: relative;
  color: red;
  font-size: 20px;
}
</style>
