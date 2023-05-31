import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/css/base.css";
import "@/assets/font/iconfont.css";

import { Sticky, Lazyload, Toast, Icon, ShareSheet } from "vant";
import "vant/lib/index.css";

import VueCoreVideoPlayer from "vue-core-video-player";

Vue.use(Sticky)
  .use(Lazyload)
  .use(VueCoreVideoPlayer)
  .use(Toast)
  .use(Icon)
  .use(ShareSheet);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
