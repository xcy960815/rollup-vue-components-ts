<template>
  <div class="rollup-vue-components-ts">
    <h3>{{ name }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "rollup-vue-components-ts",

  data() {
    return {
      name: "rollup-vue-components-ts-demo",
    };
  },
});
</script>

<style lang="scss" scoped>
.rollup-vue-components-ts {
  position: relative;
}
</style>
