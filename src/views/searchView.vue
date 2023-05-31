<template>
  <div class="searchView">
    <!-- 头部区域-->
    <div class="head">
      <div class="logo" @click="tohome"></div>
      <div class="input">
        <div class="iconfont icon-sousuo search"></div>
        <input
          type="text"
          placeholder="我推的孩子"
          v-model.trim="searchWord"
          @focus="toSearch" />
        <i class="iconfont icon-guanbi guanbi" @click="toNoSearch"></i>
      </div>
      <div class="user" @click="toResult(2)">搜全网</div>
    </div>
    <!-- 热门推荐 -->
    <div class="hotSearchArea" v-show="mainPageView">
      <div class="title">热门推荐</div>
      <ul class="titleList">
        <li
          :class="{ active: index == active }"
          @click="checkTitle(index)"
          v-for="(item, index) in hotTitle"
          :key="index">
          {{ item }}
        </li>
      </ul>
      <div class="topThree">
        <div class="item" v-for="(item, index) in searchViewData" :key="index">
          <div class="imgDiv">
            <img :src="item.image" alt="" />
            <div class="top">{{ index + 1 }}</div>
            <div class="down">更新至{{ item.desc }}期</div>
          </div>
          <p class="txt-cut">{{ item.title }}</p>
        </div>
      </div>
      <div class="fourToLast">
        <div class="item" v-for="(item, index) in searchViewData" :key="index">
          <span class="num">{{ index + 4 }}</span>
          <span class="text one-txt-cut">{{ item.title }}</span>
          <div class="iconfont icon-jiantou3"></div>
        </div>
      </div>
    </div>
    <div class="searchItemArea" v-show="!mainPageView">
      <div class="item one-txt-cut">
        <i class="iconfont icon-search search"></i>
        <div class="itemWord one-txt-cut" @click="toResult(1)">青年Π计划</div>
      </div>
      <div class="item one-txt-cut" @click="toResult(2)">
        <i class="iconfont icon-search search"></i>
        <div class="itemWord one-txt-cut">我推的孩子</div>
      </div>
    </div>
    <!-- 底部 -->
    <!-- <div class="footS">
      <div class="footCommon">
        <p>Copyright © 2006-2023 mgtv.com All Rights Reserved</p>
        <p>互联网出版许可证：新出网证（湘）字08号</p>
      </div>
    </div> -->
  </div>
</template>
<script>
  import { getSearch } from "@/api/search.js";
  export default {
    data() {
      return {
        searchViewData: null,
        mainPageView: true,
        searchWord: "",
        hotTitle: ["热门内容", "综艺", "电视剧", "电影", "动漫"],
        active: 0,
      };
    },
    methods: {
      // 返回首页
      tohome() {
        this.$router.push("home");
      },
      // 搜索
      toSearch() {
        this.mainPageView = false;
        if (this.searchWord != "") {
          this.getSearchSuggestData(this.searchWord);
        }
      },
      // 取消搜索
      toNoSearch() {
        this.mainPageView = true;
      },
      // 切换分类
      checkTitle(index) {
        this.active = index;
      },
      // 跳转到相关搜索页
      toSearchResult() {
        this.$router.push("searchResult");
      },
      // 点击搜索建议跳转到相关结果页
      toResult(keyword) {
        this.$router.push({
          name: "searchResult",
          query: { keyword: keyword },
        });
      },
      getSearchData() {
        getSearch().then((data) => {
          this.searchViewData = data.search;
          console.log(this.searchViewData);
        });
      },
    },
    created() {
      this.getSearchData(); // 获取搜索页数据
    },
  };
</script>
<style lang="scss" scoped>
  .searchView {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: scroll;

    .head {
      width: 100%;
      height: 44px;
      box-sizing: border-box;
      padding-left: 10px;
      padding-right: 10px;
      display: flex;
      align-items: center;

      .logo {
        width: 30%;
        height: 44px;
        background: url(../assets/img/logoSearch.png) no-repeat 0px center;
        background-size: 87px;
      }

      .input {
        flex: 1;
        height: 28px;
        background-color: rgb(245, 245, 245);
        border-radius: 20px;
        font-size: 14px;
        line-height: 28px;
        color: rgb(102, 102, 102);
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-left: 10px;
        margin-left: 7px;
        flex: 1;

        .search {
          width: 16px;
          height: 100%;
          line-height: 28px;
          margin-right: 5px;
          color: rgb(136, 136, 136);
        }

        .guanbi {
          transform-origin: left;
          transform: scale(0.5);
          font-weight: 600;
        }

        input {
          width: 100%;
        }
      }

      .user {
        width: 55px;
        height: 28px;
        font-size: 14px;
        margin-left: 10px;
        text-align: center;
        line-height: 28px;
        color: rgb(102, 102, 102);
      }
    }

    .hotSearchArea {
      width: 100%;
      margin-top: 18px;
      box-sizing: border-box;
      padding-left: 10px;

      .title {
        height: 14px;
        font-size: 14px;
        line-height: 14px;
        color: rgb(153, 153, 153);
      }

      .titleList {
        width: 100%;
        height: 26px;
        display: flex;
        font-size: 14px;
        margin-top: 10px;

        li {
          box-sizing: border-box;
          padding: 3px 14px;
          margin-right: 10px;

          &.active {
            background-color: rgb(255, 95, 0);
            border-radius: 18px;
            color: #fff;
          }

          &:last-child {
            margin-right: 0px;
          }
        }
      }

      .topThree {
        width: 100%;
        height: 210px;
        margin-top: 15px;
        box-sizing: border-box;
        padding-right: 10px;
        display: flex;
        justify-content: space-between;

        .item {
          width: 111px;
          height: 100%;

          .imgDiv {
            width: 100%;
            height: 156px;
            overflow: hidden;
            position: relative;

            img {
              width: 100%;
              height: 100%;
            }

            .top {
              width: 100%;
              height: 20px;
              background-color: rgb(255, 95, 0);
              font-size: 14px;
              color: #fff;
              text-align: center;
              line-height: 20px;
              position: absolute;
              top: 0;
            }

            .down {
              width: 100%;
              height: 13px;
              background-color: #000;
              font-size: 12px;
              color: rgb(238, 238, 238);
              box-sizing: border-box;
              padding-left: 5px;
              padding-right: 5px;
              position: absolute;
              bottom: 0;
              text-align: center;
              line-height: 13px;
              overflow: hidden;
            }
          }

          p {
            font-size: 14px;
            color: rgb(51, 51, 51);
            margin-top: 7px;
          }

          &:nth-child(2) .imgDiv {
            .top {
              background-color: rgb(67, 159, 253);
            }
          }

          &:nth-child(3) .imgDiv {
            .top {
              background-color: rgb(47, 205, 118);
            }
          }
        }
      }

      .fourToLast {
        width: 100%;
        box-sizing: border-box;
        padding-right: 10px;

        .item {
          width: 100%;
          height: 50px;
          border-top: 1px solid #f6f7fa;
          font-size: 14px;
          display: flex;
          align-items: center;

          .num {
            margin-right: 10px;
            color: #999999;
            font-weight: 700;
          }

          .text {
            color: #373737;
            margin-right: 5px;
          }

          div {
            width: 12px;
            height: 12px;
            font-size: 12px;
            color: #c7c7c7;
            box-sizing: border-box;
          }
        }
      }
    }

    .searchItemArea {
      width: 100%;
      height: 100%;
      background-color: #fff;

      .item {
        width: 100%;
        height: 30px;
        box-sizing: border-box;
        padding-left: 15px;
        display: flex;
        align-items: flex-start;
        margin-top: 10px;

        .search {
          line-height: 20px;
          color: #606877;
        }

        .itemWord {
          flex: 1;
          font-size: 14px;
          margin-left: 5px;
          color: #606877;
          border-bottom: 2px solid rgba(217, 218, 222, 0.5);
          padding-bottom: 10px;
        }
      }
    }

    .footS {
      width: 100%;
      height: 54px;
      box-sizing: border-box;
      background-color: #f5f5f5;
      position: absolute;
      bottom: 0;

      .footCommon {
        width: 100%;
        height: 54px;
        box-sizing: border-box;
        padding-top: 13px;
        padding-bottom: 13px;
        text-align: center;
        font-size: 12px;
        color: rgb(187, 187, 187);
        display: flex;
        flex-direction: column;
        justify-content: end;

        p {
          height: 15px;
          line-height: 15px;
        }
      }
    }
  }
</style>
