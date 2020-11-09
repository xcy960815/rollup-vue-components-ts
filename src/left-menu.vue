<template>
  <div class="index">
    {{messageData}}
    <!-- <el-button @click="handleClick">我是按钮</el-button> -->
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      messageData: '本模版基于rollup打包vue组件的模版，支持热更新,有助于快速开发vue组件库',
    }
  },
  methods: {
    handleClick() {
      console.log('handleClick')
    },
  },
}
</script>

<style scoped lang="less">
.index {
  margin-top: 10%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
