const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     "/DataJson": {
  //       target: "http://10.10.24.18:3000/DataJson",
  //       changeOrigin: true,
  //       ws: false,
  //       // pathRewrite:{
  //       //   "^/DataJson":"/DataJson"
  //       // }
  //     },
  //     "/": {
  //       target: "https://www.fastmock.site/mock/46d79d67650c270cc757f93c6bce8041/tv",
  //       changeOrigin: true,
  //       ws: false,
  //     },
  //   },
  // },
});
