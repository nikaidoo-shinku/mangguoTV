<template>
  <div class="userInfos">
    <!-- 头部区域-->
    <div class="head">
      <div class="logo" ref="logo" @click="tohome">
        <img src="../assets/img/mangguoLogo.png" alt="" />
      </div>
      <div class="input" @click="toSearch">
        <div class="iconfont icon-sousuo search"></div>
        我推的孩子
      </div>
      <div class="user">
        <div class="iconfont icon-lishijilu history" @click="toHistory"></div>
        <div class="iconfont icon-denglu sign-in" @click="toLogin"></div>
      </div>
    </div>
    <!-- 头像区 -->
    <div class="userCover" v-if="userData">
      <div class="cover">
        <img src="../assets/img/EqEgKAXC_400x400.png" alt="" />
      </div>
      <div class="userName">{{ userData.nickname }}</div>
    </div>
    <!-- 历史播放区域 -->
    <div class="historyArea">
      <div class="title">
        <span class="titleLeft">播放记录</span>
        <div class="titleRight" @click="toHistory">
          <span>记录看过的精彩</span>
          <div class="iconfont icon-jiantou3 jiantou3"></div>
        </div>
      </div>
      <div class="videoItem" ref="videoArea" v-if="historyData">
        <ul>
          <li
            v-for="item in historyData"
            :key="item.id"
            @click="toPlay(item.id)"
            v-lazy="item.image">
            <div class="imgDiv">
              <img :src="item.image + '?param=128y72'" alt="" />
              <div class="mask">
                <div class="time">{{ item.duration }}</div>
              </div>
            </div>
            <div class="mess txt-cut">
              {{ item.title }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 视频收藏 -->
    <div class="collectArea" v-if="collectData && collectSliceData">
      <div class="title">
        <span class="titleLeft">我的收藏</span>
      </div>
      <div class="noDataArea" v-if="collectData.length == 0">
        <van-icon name="live" class="noData" />
        <span>~暂无收藏~</span>
      </div>
      <div>
        <div
          class="item"
          @click="toPlay(item.id)"
          v-for="item in collectSliceData"
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
      <div
        class="collectFoot"
        v-if="collectData.length != 0"
        @click="toAllCollect">
        查看全部{{ collectData.length }}条收藏<i
          class="iconfont icon-jiantou3 more"></i>
      </div>
    </div>
    <!-- 退出登录 -->
    <div class="logOut" @click="logOut">退出登录</div>
  </div>
</template>
<script>
  import { getUserInfos } from "@/api/userInfos.js";
  import { getHistory } from "@/api/history.js";
  export default {
    data() {
      return {
        historyData: [],
        historyLocalData: [],
        historyAllData: null,
        timePar: null,
        userData: null,
        collectData: [],
        collectSliceData: [],
      };
    },
    methods: {
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
      // 跳转到播放详情页
      toPlay(id) {
        this.$router.push({ name: "playDetail", query: { id: id } });
      },
      // 跳转到历史页面
      toHistory() {
        this.$router.push("history").catch((err) => {});
      },
      // 跳转到所有收藏页
      toAllCollect() {
        this.$router.push("collectView").catch((err) => {});
      },
      // 退出登录
      logOut() {
        window.localStorage.removeItem("token");
        this.$router.push("login");
      },
      getHistoryAllData() {
        getHistory().then((data) => {
          this.historyAllData = data.history;
          // console.log(this.historyAllData);

          let existingArray = JSON.parse(localStorage.getItem("vid"));
          if (existingArray) {
            for (let item of this.historyAllData) {
              for (let it of existingArray) {
                if (item.id == it.id) {
                  this.historyData.push(item);
                  this.historyLocalData.push(it);
                }
              }
            }
          }
          console.log(this.historyData);
          console.log(this.historyLocalData);

          // 获取个人收藏
          let collectArray = JSON.parse(localStorage.getItem("collect"));
          if (collectArray) {
            for (let item of this.historyAllData) {
              for (let it of collectArray) {
                if (item.id == it.id && it.collect == 1) {
                  this.collectData.push(item);
                }
              }
            }
            this.collectSliceData = this.collectData.slice(0, 2);
          }
        });
      },
      getUserInfosData() {
        getUserInfos().then((data) => {
          this.userData = data;
        });
      },
    },
    created() {
      this.getHistoryAllData(); // 获取历史纪录数据
      this.getUserInfosData(); // 获取个人中心用户数据
    },
  };
</script>
<style lang="scss" scoped>
  .userInfos {
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
        background-color: #f5f5f5;
        border-radius: 20px;
        font-size: 14px;
        color: #bbbbbb;
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
          color: #bbbbbb;

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
          color: #686868;
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
          color: #686868;

          &.active {
            color: #66666b !important;
          }
        }
      }
    }

    .userCover {
      width: 100%;
      height: 107px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding-top: 17px;

      .cover {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .userName {
        font-size: 14px;
      }
    }

    .historyArea {
      width: 100%;
      height: 162px;
      margin-top: 30px;

      .title {
        width: 100%;
        height: 21px;
        box-sizing: border-box;
        padding-left: 15px;
        padding-right: 15px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .titleLeft {
          font-size: 20px;
          font-weight: 700;
        }

        .titleRight {
          font-size: 14px;
          color: rgb(136, 136, 136);
          display: flex;
          align-items: flex-end;

          .jiantou3 {
            line-height: 17px;
            font-size: 12px;
          }
        }
      }

      .videoItem {
        width: 100%;
        height: 126px;
        margin-top: 15px;
        display: flex;
        overflow-x: auto;

        &::-webkit-scrollbar {
          display: none;
        }

        ul {
          height: 126px;
          margin-left: 15px;
          margin-right: 12px;
          display: flex;
          flex-wrap: nowrap;

          li {
            width: 128px;
            height: 100%;
            margin-right: 3px;
            color: rgba(255, 255, 255, 0.6);

            .imgDiv {
              width: 100%;
              height: 72px;
              overflow: hidden;
              position: relative;

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
                  rgba(0, 0, 0, 0.3) 20%,
                  rgba(0, 0, 0, 0.1)
                );
                z-index: 9;

                .vip {
                  width: 51px;
                  height: 18px;
                  background-color: rgb(38, 91, 173);
                  font-size: 12px;
                  position: absolute;
                  top: 5%;
                  right: 2%;
                  text-align: center;
                  color: #fff;
                  line-height: 18px;
                  border-radius: 2px;
                }

                .time {
                  width: 67px;
                  height: 14px;
                  font-size: 12px;
                  color: #fff;
                  position: absolute;
                  right: 2%;
                  bottom: 5%;
                  text-align: end;
                }
              }
            }

            .mess {
              width: 128px;
              height: 32px;
              box-sizing: border-box;
              margin-top: 10px;
              font-size: 15px;
              color: #666666;
              font-size: 12px;

              &.active {
                color: rgb(255, 95, 0);
              }
            }
          }
        }
      }
    }

    .collectArea {
      width: 100%;
      height: 226px;
      margin-top: 30px;

      .title {
        width: 100%;
        height: 21px;
        box-sizing: border-box;
        padding-left: 15px;
        padding-right: 15px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .titleLeft {
          font-size: 20px;
          font-weight: 700;
        }

        .titleRight {
          font-size: 14px;
          color: rgb(136, 136, 136);
          display: flex;
          align-items: flex-end;

          .jiantou3 {
            line-height: 17px;
            font-size: 12px;
          }
        }
      }

      .noDataArea {
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;

        .noData {
          font-size: 120px;
          color: rgb(255, 95, 0);
        }

        span {
          font-size: 14px;
          color: #696969;
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

      .collectFoot {
        width: 100%;
        height: 30px;
        text-align: center;
        line-height: 30px;
        margin-top: 10px;
        font-size: 14px;
        color: #696969;
        border-top: 1px solid #f5f5f5;

        .more {
          font-size: 12px;
          color: #696969;
          margin-left: 2px;
        }
      }
    }

    .logOut {
      width: 345px;
      margin: 0 auto;
      margin-top: 15px;
      height: 44px;
      text-align: center;
      line-height: 44px;
      border-radius: 22px;
      color: #fff;
      background-image: linear-gradient(
        270deg,
        rgb(247, 171, 28),
        rgb(250, 97, 97) 52%,
        rgb(255, 95, 0)
      );
      // position: absolute;
      // bottom: 0%;
      // left: 50%;
      // transform: translate(-50%, -50%);
    }
  }
</style>
