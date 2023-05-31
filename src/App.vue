<template>
  <div id="app" ref="app" @scroll="toTopShow">
    <div class="homeTop" ref="homeTop" v-show="!$route.meta.isShowTop">
      <!-- 顶部搜索及导航 -->
      <search-bar @toTab="toTab" ref="searchBar"></search-bar>
      <!-- 轮播图 -->
      <div class="mask" ref="topMask"></div>
    </div>
    <router-view @appScroll="appScroll"></router-view>
    <div
      ref="toTop"
      class="iconfont icon-4fanhuidingbucheng toTop"
      @click="topTo"></div>
  </div>
</template>
<script>
  import SearchBar from "@/components/SearchBar.vue";

  import { getHome } from "@/api/home.js";
  import { getTvPlay } from "@/api/tvPlay.js";

  import { mapState } from "vuex";

  export default {
    components: {
      SearchBar,
    },
    data() {
      return {
        banners: null,
        activeScrollTo: 0,
      };
    },
    computed: {
      ...mapState({
        bannerColor: (state) => state.bannerColor,
      }),
    },
    methods: {
      // 跳转到相应板块并请求当前板块数据
      toTab(index) {
        if (index == 0) {
          this.$router.push("home").catch((err) => {});
        } else if (index == 1) {
          this.$router.push("variety").catch((err) => {});
        } else if (index == 2) {
          this.$router.push("animate").catch((err) => {});
        }
      },
      // 显示返回顶部按钮
      toTopShow() {
        if (this.$refs.app.scrollTop >= 250) {
          this.$refs.toTop.style.opacity = 1;
        } else {
          this.$refs.toTop.style.opacity = 0;
        }
      },
      // 返回顶部
      topTo() {
        this.$refs.app.scroll({
          top: 0,
          behavior: "smooth",
        });
      },
      // 滚动到评论区
      appScroll(num) {
        this.$refs.app.scroll({
          top: num,
          behavior: "smooth",
        });
      },
      getTvPlayData() {
        getTvPlay().then((data) => {
          console.log(data.data.banners);
          this.banners = data.data.banners;
        });
      },
    },
    watch: {
      bannerColor: {
        handler(val) {
          if (this.$route.name != "search") {
            this.$refs.topMask.style.backgroundImage = `linear-gradient(to bottom, rgba(${val[0]}, ${val[1]}, ${val[2]}, 1) 5px, transparent 340px)`;
          }
        },
        deep: true,
      },
      $route(val) {
        if (val.name == "home") {
          this.$refs.searchBar.toNavActive(0);
        } else if (val.name == "variety") {
          this.$refs.searchBar.detailToNavActive(1);
        } else if (val.name == "animate") {
          this.$refs.searchBar.detailToNavActive(2);
        }
      },
    },
    created() {},
  };
</script>
<style lang="scss" scoped>
  #app {
    height: 100vh;
    overflow: scroll;

    .homeTop {
      height: 89px;
      position: relative;
      // background-image: linear-gradient(
      //   to bottom,
      //   rgb(205, 219, 227) 50%,
      //   rgb(255, 255, 255) 100%
      // );

      .mask {
        width: 100%;
        height: 339px;
        position: absolute;
        top: 0%;
        z-index: 1;
      }
    }

    .toTop {
      width: 50px;
      height: 50px;
      font-size: 40px;
      text-align: center;
      line-height: 50px;
      color: rgb(255, 95, 0);
      border: none;
      border-radius: 50%;
      position: fixed;
      bottom: 0;
      right: 6%;
      transform: translate(0, -50%);
      cursor: pointer;
      z-index: 99;
      opacity: 0;
      transition: 0.5s;
      // display: none;
    }
  }
</style>
