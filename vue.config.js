const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  runtimeCompiler: true,
  transpileDependencies: true,
  pages: {
    // 配置多页面入口
    index: {
      entry: "./example/main.ts",
      // 当有多行是，Vue以最后一行entry为准。
      template: "example/index.html",
    },
  },
});
