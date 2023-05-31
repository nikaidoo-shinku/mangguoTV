<template>
  <div class="SearchBar">
    <van-sticky :offset-top="0" @scroll="changeColor">
      <div class="topArea" :class="{ isFixed: isFixed }">
        <!-- 头部区域-->
        <div class="head">
          <div class="logo" ref="logo" @click="tohome">
            <img src="../assets/img/mangguoLogo.png" alt="" />
          </div>
          <div
            class="input"
            :class="{ active: activeScroll }"
            @click="toSearch">
            <div
              class="iconfont icon-sousuo search"
              :class="{ active: activeScroll }"></div>
            我推的孩子
          </div>
          <div class="user">
            <div
              class="iconfont icon-lishijilu history"
              :class="{ active: activeScroll }"
              @click="toHistory"></div>
            <div
              class="iconfont icon-denglu sign-in"
              :class="{ active: activeScroll }"
              @click="toLogin"></div>
          </div>
        </div>
        <!-- 导航栏 -->
        <div class="nav">
          <div class="nav-left">
            <img src="../assets/img/20200608202326171.png" alt="" />
          </div>
          <div class="navBar" ref="navBar">
            <ul>
              <li
                :ref="'navLi' + index"
                :class="[
                  { active: active == index },
                  { activeSc: activeSc == index && activeScroll },
                  { activeScFalse: activeScroll },
                ]"
                v-for="(item, index) in navData"
                :key="index"
                @click="toNav(index, $event)">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </van-sticky>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isFixed: false,
        active: 0,
        activeScroll: false,
        activeSc: 0,
        navData: [
          "精选",
          "综艺",
          "动漫",
          "电视剧",
          "电影",
          "少儿",
          "新闻",
          "纪录片",
          "短剧",
          "音乐",
          "游戏",
          "好玩",
          "娱乐",
        ],
      };
    },
    methods: {
      // 监听滚动更改头部搜索及导航样式
      changeColor(obj) {
        this.isFixed = obj.isFixed === true ? true : false;
        this.activeScroll = obj.isFixed === true ? true : false;
      },
      // 点击导航高亮及跳转到相应页面
      toNav(index, event) {
        this.active = index;
        this.activeSc = index;
        this.$emit("toTab", index);
        // this.$refs.navBar.scrollLeft =
        //   event.target.offsetLeft - event.target.offsetWidth;
        this.$refs.navBar.scroll({
          left: event.target.offsetLeft - event.target.offsetWidth,
          behavior: "smooth",
        });
      },
      // 父组件操作导航高亮
      toNavActive(index) {
        this.$nextTick(() => {
          this.active = index;
          this.activeSc = index;
          // this.$refs.navBar.scrollLeft =
          //   event.target.offsetLeft - event.target.offsetWidth;
          this.$refs.navBar.scroll({
            left: "0px",
            behavior: "smooth",
          });
        });
      },
      // 详情页操作导航栏
      detailToNavActive(index) {
        this.$nextTick(() => {
          this.active = index;
          this.activeSc = index;
          // this.$refs.navBar.scrollLeft =
          //   event.target.offsetLeft - event.target.offsetWidth;
          this.$refs.navBar.scroll({
            left:
              this.$refs[`navLi${index}`][0].offsetLeft -
              this.$refs[`navLi${index}`][0].offsetWidth,
            behavior: "smooth",
          });
        });
      },
      // 回到首页
      tohome() {
        this.$router.push("home").catch((err) => {});
      },
      // 跳转到搜索页面
      toSearch() {
        this.$router.push("search").catch((err) => {});
      },
      // 跳转到登录页
      toLogin() {
        this.$router.push("login").catch((err) => {});
      },
      // 跳转到历史页面
      toHistory() {
        this.$router.push("history").catch((err) => {});
      },
    },
  };
</script>
<style lang="scss" scoped>
  .SearchBar {
    width: 100%;
    position: sticky;
    z-index: 99;

    .isFixed {
      transition: 0.2s;
      background-color: rgba(255, 255, 255, 1);
    }

    .head {
      width: 100%;
      display: flex;
      align-items: center;

      .logo {
        width: 30%;
        height: 44px;
        background-size: 82px;
        position: relative;
        overflow: hidden;

        img {
          width: 105px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .input {
        height: 32px;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-left: 10px;
        flex: 1;

        &.active {
          color: #bbbbbb;
          background: #f5f5f5;
        }

        .search {
          width: 16px;
          height: 100%;
          line-height: 32px;
          margin-right: 5px;
          color: rgb(187, 187, 187);

          &.active {
            color: #bbbbbb;
          }
        }
      }

      .user {
        width: 27%;
        display: flex;
        justify-content: space-evenly;

        .history {
          height: 44px;
          font-size: 22px;
          font-weight: 600;
          line-height: 48px;
          color: #fff;
          &.active {
            color: #66666b !important;
          }
        }

        .sign-in {
          height: 44px;
          font-size: 22px;
          font-weight: 600;
          line-height: 44px;
          line-height: 48px;
          color: #fff;

          &.active {
            color: #66666b !important;
          }
        }
      }
    }
    .nav {
      width: 100%;
      height: 34px;
      display: flex;
      align-items: end;
      margin-top: 11px;
      margin-bottom: 13px;

      .nav-left {
        width: 54px;
        height: 34px;

        img {
          width: 100%;
        }
      }

      .navBar {
        width: 85%;
        height: 30px;
        overflow-x: auto;

        &::-webkit-scrollbar {
          display: none;
        }

        ul {
          height: 30px;
          display: flex;
          flex-wrap: nowrap;

          li {
            height: 100%;
            box-sizing: border-box;
            text-align: center;
            font-size: 15px;
            white-space: nowrap;
            padding-left: 13px;
            padding-right: 13px;
            line-height: 30px;
            color: hsla(0, 0%, 100%, 0.6);

            &.active {
              font-size: 22px;
              font-weight: 600;
              color: #fff;
            }

            &.activeScFalse {
              color: #bbbbbb;
            }

            &.activeSc {
              color: #ff5f00;
            }
          }
        }
      }
    }
  }
</style>
