<template>
  <div class="history">
    <!-- 头部区域 -->
    <div class="head">
      <div class="iconfont icon-jiantou up" @click="toback"></div>
      <div class="title">播放记录</div>
      <div class="block"></div>
    </div>
    <!-- 历史记录 -->
    <div class="historyArea">
      <div class="title">近期播放记录</div>
      <div
        class="item"
        @click="toPlay(item.id)"
        v-for="(item, index) in historyData"
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
            <div class="iconfont icon-shengyuguankan look"></div>
            <span
              >已观看至{{
                historyLocalData[index].currentTime | formatNowTime
              }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 登录同步提示 -->
    <!-- <div class="loginSameArea">
      <div class="loginSame">
        <div class="text">登录后，播放记录可以随时同步</div>
        <div class="loginBtn" onclick="location.href='./login.html'">登录</div>
      </div>
    </div> -->
  </div>
</template>
<script>
  import { getHistory } from "@/api/history.js";

  export default {
    data() {
      return {
        historyData: [],
        historyLocalData: [],
        historyAllData: null,
        timePar: null,
      };
    },
    methods: {
      // 跳转回上一页
      toback() {
        this.$router.back();
      },
      // 跳转到播放详情页
      toPlay(id) {
        this.$router.push({ name: "playDetail", query: { id: id } });
      },
      getHistoryAllData() {
        getHistory().then((data) => {
          this.historyAllData = data.history;
          // console.log(this.historyAllData);

          let existingArray = JSON.parse(localStorage.getItem("vid"));
          for (let item of this.historyAllData) {
            for (let it of existingArray) {
              if (item.id == it.id) {
                this.historyData.push(item);
                this.historyLocalData.push(it);
              }
            }
          }
          console.log(this.historyData);
          console.log(this.historyLocalData);
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
      this.getHistoryAllData(); // 获取历史纪录数据
    },
    mounted() {},
  };
</script>
<style lang="scss" scoped>
  .history {
    max-width: 750px;
    min-width: 375px;
    margin: 0 auto;

    .head {
      width: 100%;
      height: 44px;
      box-sizing: border-box;
      padding-left: 15px;
      padding-right: 15px;
      display: flex;
      color: #fff;
      background-color: #222222;
      position: sticky;
      top: 0;
      z-index: 9;

      .up {
        width: 20px;
        height: 44px;
        font-size: 20px;
        line-height: 44px;
      }

      .title {
        flex: 1;
        height: 44px;
        text-align: center;
        line-height: 44px;
      }

      .block {
        width: 20px;
        height: 44px;
      }
    }

    .historyArea {
      width: 100%;
      box-sizing: border-box;
      padding-left: 15px;
      padding-right: 15px;
      margin-top: 30px;
      // margin-bottom: 65px;

      .title {
        height: 21px;
        font-size: 20px;
        line-height: 21px;
        font-weight: 700;
        color: #333333;
      }

      .item {
        width: 100%;
        height: 72px;
        margin-top: 15px;
        display: flex;

        .imgDiv {
          width: 128px;
          height: 100%;
          margin-right: 15px;
          position: relative;
          overflow: hidden;

          img {
            width: 100%;
            height: 100;
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
    }

    .loginSameArea {
      max-width: 750px;
      min-width: 375px;
      display: flex;
      justify-content: center;
      position: sticky;
      bottom: 0;
      padding-bottom: 5px;
      z-index: 9;

      .loginSame {
        width: 97%;
        height: 50px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-left: 10px;
        padding-right: 5px;
        background-color: #333333;
        border-radius: 4px;

        .text {
          flex: 1;
          height: 15px;
          font-size: 14px;
          line-height: 15px;
          color: #fff;
        }

        .loginBtn {
          width: 63px;
          height: 30px;
          background-color: #ff5f00;
          color: #fff;
          text-align: center;
          line-height: 30px;
          border-radius: 15px;
          font-size: 13px;
        }
      }
    }
  }
</style>
