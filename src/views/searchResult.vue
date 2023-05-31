<template>
  <div class="searchResult">
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
      <div class="user" @click="toBack">取消</div>
    </div>
    <div class="searchItemArea" v-show="!mainPageView">
      <div class="item one-txt-cut">
        <i class="iconfont icon-search search"></i>
        <div class="itemWord one-txt-cut" @click="toResult(1, $event)">
          青年Π计划
        </div>
      </div>
      <div class="item one-txt-cut">
        <i class="iconfont icon-search search"></i>
        <div class="itemWord one-txt-cut" @click="toResult(2, $event)">
          我推的孩子
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="resultArea" v-show="mainPageView" v-if="resultData">
      <div class="imgArea">
        <img :src="resultData.videoAll.image" alt="" />
      </div>
      <div class="msg one-txt-cut">
        <div class="titleTop">
          <p class="tit">{{ resultData.videoAll.title }}</p>
          <p class="typ">类型:{{ resultData.videoAll.videotype }}</p>
          <p class="pers one-txt-cut" v-if="resultData.videoAll.guest">
            嘉宾:{{ resultData.videoAll.guest }}
          </p>
        </div>
        <div class="titleDown">
          <div class="soc">
            <span>播放源</span>
            <i class="iconfont icon-mangguoTV"></i>
          </div>
          <div class="toPlay">
            <van-icon name="play" class="play" />
            <span class="playText" @click="toPlay(resultData.videoAll.id)"
              >立即播放</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="resultData">
      <div
        class="item"
        @click="toPlay(item.id)"
        v-for="item in resultData.itemvideo"
        :key="item.id">
        <div class="imgDiv">
          <img :src="item.image" alt="" />
          <div class="mask">
            <div class="time">{{ item.duration }}</div>
          </div>
        </div>
        <div class="right txt-cut">
          <p class="text one-txt-cut">{{ item.title }}</p>
          <div class="looking">
            <div class="iconfont icon-24gf-playSquare look"></div>
            <span>更新时间：2023-05-25</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getSearchResult } from "@/api/search.js";

  export default {
    data() {
      return {
        searchWord: "",
        mainPageView: true,
        resultData: null,
      };
    },
    methods: {
      // 返回首页
      tohome() {
        this.$router.push("home");
      },
      // 返回上一页
      toBack() {
        this.$router.back();
      },
      // 搜索
      toSearch() {
        this.mainPageView = false;
        // if (this.searchWord != "") {
        //   this.getSearchSuggestData(this.searchWord);
        // }
      },
      // 取消搜索
      toNoSearch() {
        this.mainPageView = true;
      },
      // 点击搜索建议跳转到相关结果页
      toResult(keyword, event) {
        this.getSearchResultData(keyword);
        this.mainPageView = true;
        this.searchWord = event.target.innerText;
      },
      // 跳转到播放详情页
      toPlay(id) {
        this.$router.push({ name: "playDetail", query: { id: id } });
      },
      getSearchResultData(keyword) {
        getSearchResult(keyword).then((data) => {
          this.resultData = data;
          console.log(this.resultData);
        });
      },
    },
    filters: {
      // 视频播放时间格式化
      formatNowTime(val) {
        return (
          String(
            parseInt(val / 60) < 10
              ? "0" + String(parseInt(val / 60))
              : String(parseInt(val / 60))
          ) +
          ":" +
          String(
            parseInt(val % 60) < 10
              ? "0" + String(parseInt(val % 60))
              : String(parseInt(val % 60))
          )
        );
      },
    },
    created() {
      this.getSearchResultData(this.$route.query.keyword); // 获取搜索结果数据
    },
  };
</script>
<style lang="scss" scoped>
  .searchResult {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    .head {
      width: 100%;
      height: 44px;
      box-sizing: border-box;
      padding-left: 10px;
      padding-right: 10px;
      display: flex;
      align-items: center;
      background-color: #fff;

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

    .resultArea {
      width: 100%;
      height: 187px;
      display: flex;
      margin-top: 10px;
      background-color: #fff;
      box-sizing: border-box;
      padding: 15px 10px;

      .imgArea {
        width: 111px;
        height: 156px;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      .msg {
        flex: 1;
        margin-left: 10px;
        .titleTop {
          .tit {
            font-size: 14px;
            color: rgb(255, 95, 0);
          }

          .typ {
            font-size: 12px;
            margin-top: 5px;
            margin-bottom: 5px;
            color: rgb(102, 102, 102);
          }

          .pers {
            font-size: 12px;
            color: rgb(102, 102, 102);
          }
        }

        .titleDown {
          margin-top: 30px;
          .soc {
            span {
              font-size: 12px;
              color: rgb(102, 102, 102);
            }

            i {
              margin-left: 2px;
              font-size: 12px;
              color: rgb(255, 95, 0);
            }
          }

          .toPlay {
            margin-top: 15px;
            width: 82px;
            height: 28px;
            background-color: rgb(255, 95, 0);
            border-radius: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;

            .play {
              font-size: 20px;
            }

            .playText {
              display: inline-block;
              height: 28px;
              font-size: 13px;
              line-height: 29px;
            }
          }
        }
      }
    }

    .item {
      width: 100%;
      height: 72px;
      margin-top: 10px;
      display: flex;
      box-sizing: border-box;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #fff;

      .imgDiv {
        width: 128px;
        height: 100%;
        margin-right: 15px;
        position: relative;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }

        .mask {
          width: 100%;
          height: 72px;
          position: absolute;
          top: 0;
          background-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.2) 30%,
            rgba(0, 0, 0, 0.1)
          );
          z-index: 9;

          .time {
            height: 14px;
            font-size: 12px;
            color: #fff;
            position: absolute;
            right: 2%;
            bottom: 5%;
          }
        }
      }

      .right {
        flex: 1;
        box-sizing: border-box;
        padding-top: 4px;
        padding-bottom: 4px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .text {
          width: 100%;
          height: 22px;
          font-size: 15px;
          line-height: 22px;
          color: #333333;
        }

        .looking {
          display: flex;
          font-size: 12px;
          color: #888888;

          .look {
            height: 12px;
            line-height: 15px;
            transform-origin: center bottom;
            transform: scale(0.8);
            margin-right: 4px;
          }
        }
      }
    }

    .searchItemArea {
      width: 100%;
      height: 100%;
      background-color: #fff;
      overflow: hidden;

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
  }
</style>
