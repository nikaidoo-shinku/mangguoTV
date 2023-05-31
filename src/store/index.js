import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bannerColor: null, // 轮播图的当前颜色状态
    navIndex: 0, // 导航栏状态
  },
  getters: {},
  mutations: {
    // 改变轮播图颜色状态
    changeBannerColor(state, payload) {
      state.bannerColor = payload;
    },
    // 改变导航栏状态
    changeNavIndex(state, payload) {
      state.navIndex = payload;
    },
  },
  actions: {},
  modules: {},
});
