import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/homeView.vue"),
  },
  {
    path: "/playDetail",
    name: "playDetail",
    component: () => import("@/views/playDetail.vue"),
    meta: {
      isShowTop: true,
    },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/searchView.vue"),
    meta: {
      isShowTop: true,
    },
  },
  {
    path: "/searchResult",
    name: "searchResult",
    component: () => import("@/views/searchResult.vue"),
    meta: {
      isShowTop: true,
    },
  },
  {
    path: "/tvPlay",
    name: "tvPlay",
    component: () => import("@/views/tvPlay.vue"),
  },
  {
    path: "/history",
    name: "history",
    component: () => import("@/views/historyView.vue"),
    meta: {
      isShowTop: true,
    },
  },
  {
    path: "/variety",
    name: "variety",
    component: () => import("@/views/varietyView.vue"),
  },
  {
    path: "/animate",
    name: "animate",
    component: () => import("@/views/animateView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/loginView.vue"),
    meta: {
      isShowTop: true,
    },
    beforeEnter: (to, from, next) => {
      let token = window.localStorage.getItem("token");
      // 判断是否登录
      if (token) {
        next("/userInfos");
        return;
      } else {
        next();
      }
    },
  },
  {
    path: "/userInfos",
    name: "userInfos",
    component: () => import("@/views/userInfos.vue"),
    meta: {
      isShowTop: true,
    },
    // 独享路由守卫
    beforeEnter: (to, from, next) => {
      let token = window.localStorage.getItem("token");
      // 判断是否登录
      if (!token) {
        next("/login");
        return;
      } else {
        next();
      }
    },
  },
  {
    path: "/collectView",
    name: "collectView",
    component: () => import("@/views/collectView.vue"),
    meta: {
      isShowTop: true,
    },
    // 独享路由守卫
    beforeEnter: (to, from, next) => {
      let token = window.localStorage.getItem("token");
      // 判断是否登录
      if (!token) {
        next("/login");
        return;
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
