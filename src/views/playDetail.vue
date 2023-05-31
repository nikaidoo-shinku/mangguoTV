<template>
  <div class="playDetail" ref="playDetail">
    <van-sticky>
      <div class="top">
        <!-- 头部区域-->
        <div class="headD">
          <div class="logo" @click="tohome"></div>
          <div class="searchBox">
            <div class="iconfont icon-sousuo search" @click="toSearch"></div>
          </div>
          <div class="user">
            <div
              class="iconfont icon-lishijilu history"
              @click="toHistory"></div>
            <div class="iconfont icon-denglu sign-in" @click="toLogin"></div>
          </div>
        </div>
        <!-- 导航栏 -->
        <div class="navD">
          <div class="navBar" ref="navBar">
            <ul>
              <li
                :ref="index + active"
                @click="toRoute(index)"
                :class="[{ active: active == index }]"
                v-for="(item, index) in navData"
                :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </van-sticky>

    <!-- 播放区域 -->
    <div class="videoArea" v-if="tvPlayDetailData">
      <video
        ref="playVideo"
        :src="playData"
        preload="auto"
        width="100%"
        height="211px"
        autoplay="true"
        poster="../assets/img/73da5f6bgy1fdguwn4yang207w0asdoe.webp"
        controls="controls"></video>
      <div class="toSave" v-show="tipShow">
        <i class="iconfont icon-guanbi guanbi" @click="closeTip"></i>
        <div class="tip">记忆你上次看到{{ nowTime | formatNowTime }}</div>
        <div class="jumpTo" @click="jumpTo">跳转</div>
      </div>
      <!-- 视频信息 -->
      <div class="videoMessage">
        <!-- <div class="appTipArea">
          <div class="appTip">
            <span>超清更流畅，打开芒果TV观看</span>
          </div>
        </div> -->
        <div class="title">
          <div class="titleLeft">
            {{ tvPlayDetailData.collName }}
          </div>
          <div class="more">
            <span>简介</span>
            <div
              class="iconfont icon-zhankaigengduo-xian open"
              @click="moreOpen"
              v-show="!moreShow"></div>
            <div
              class="iconfont icon-icon_function_shouqi open"
              @click="moreOpen"
              v-show="moreShow"></div>
          </div>
        </div>
        <div class="videoDetail" v-show="moreShow" ref="videoDetail">
          <span>类型：{{ detailType }}</span>
          <span>地区：{{ tvPlayDetailData.area }}</span>
          <span>电视台：湖南卫视 / 芒果TV</span>
          <span>播出时间：湖南卫视 每周五22:00；芒果TV 每周五24:00</span>
          <span>主持人：未知</span>
          <span v-if="tvPlayDetailData.guest" class="one-txt-cut"
            >嘉宾：{{ tvPlayDetailData.guest }}</span
          >
          <p>简介：{{ tvPlayDetailData.description }}</p>
        </div>
      </div>
    </div>
    <!-- 点赞分享区 -->
    <div class="likeArea">
      <div class="likeLeft">
        <i class="iconfont icon-pinglun comt"></i>
        <span
          class="commLength"
          v-if="commentTopData && commentData"
          @click="toComment"
          >{{ commentTopData.length + commentData.length }}热评</span
        >
      </div>
      <div class="likeRight">
        <i
          class="iconfont icon-fenxiang fenxiang"
          @click="showShare = true"></i>
        <i
          class="iconfont icon-dianzan dianzan"
          v-show="goodFor == 0"
          @click="goodForChange"></i>
        <i
          class="iconfont icon-dianzan1 dianzan1"
          v-show="goodFor == 1"
          @click="goodForChange"></i>
        <i
          class="iconfont icon-shoucang shoucang"
          v-show="collect == 0"
          @click="collectChange"></i>
        <i
          class="iconfont icon-shoucang1 shoucang1"
          v-show="collect == 1"
          @click="collectChange"></i>
      </div>
    </div>
    <!-- 广告 -->
    <div class="advertisementArea">
      <div class="advertisement">
        <img src="../assets/img/64142a4db3912.jpg" alt="" />
        <div class="tip">广告</div>
      </div>
    </div>
    <!-- 正片 -->
    <div class="onVideo" v-if="tvPlayDetailData">
      <div class="title">
        <div class="titleLeft">正片</div>
        <div class="more">
          <span>更多《{{ tvPlayDetailData.collName }}》系列内容</span>
          <div class="iconfont icon-jiantou3 open"></div>
        </div>
      </div>
      <div class="videoItem" ref="videoArea" v-if="tvPlayDetailData">
        <ul>
          <li
            v-for="(item, index) in tvPlayDetailData.list"
            :key="item.partId"
            @click="changeVideo(item.partId, $event, index)"
            v-lazy="item.image">
            <div class="imgDiv">
              <img :src="item.image + '?param=128y72'" alt="" />
              <div class="mask">
                <div class="vip">乐享VIP</div>
                <div class="time">{{ item.desc }}</div>
              </div>
            </div>
            <div class="mess" :class="{ active: item.partId == activeItem }">
              {{ item.subtitle }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 花絮片段 -->
    <div class="videoModule">
      <div class="title">
        <div class="titleLeft">花絮片段</div>
      </div>
      <div class="videoItem" v-if="tvPlayDetailData">
        <ul>
          <li
            v-for="item in tvPlayDetailData.list"
            :key="item.partId"
            v-lazy="item.image">
            <div class="imgDiv">
              <img :src="item.image + '?param=128y72'" alt="" />
              <div class="mask">
                <div class="time">{{ item.subDuration }}</div>
              </div>
            </div>
            <div class="mess">{{ item.subtitle }}</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- VIP系列推荐 -->
    <div class="VIPVideo">
      <div class="title">
        <div class="titleLeft">VIP系列推荐</div>
      </div>
      <div class="videoItem">
        <ul>
          <li>
            <div class="imgDiv">
              <img
                src="https://2img.hitv.com/preview/sp_images/2023/04/29/202304291536239847022.jpg_192x108_h.webp"
                alt="" />
              <div class="mask">
                <div class="time">2023-04-30</div>
              </div>
            </div>
            <div class="mess">
              向往的生活7 慢直播第1期：黄磊“民族风”客厅隔断遭吐槽？
              何炅暖心布置照片墙
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 会员特权 -->
    <div class="VIPPower">
      <div class="title">
        <div class="titleLeft">会员特权</div>
      </div>
      <div class="videoItem">
        <ul>
          <li>
            <div class="imgDiv">
              <img src="../assets/img/jump-ad.1dc2571.png" alt="" />
            </div>
            <div class="mess">跳过广告</div>
          </li>
          <li>
            <div class="imgDiv">
              <img src="../assets/img/hot-video.6120a45.png" alt="" />
            </div>
            <div class="mess">热剧抢先看</div>
          </li>
          <li>
            <div class="imgDiv">
              <img src="../assets/img/live.d3db7c0.png" alt="" />
            </div>
            <div class="mess">综艺直播</div>
          </li>
          <li>
            <div class="imgDiv">
              <img src="../assets/img/high-image.1994d5c.png" alt="" />
            </div>
            <div class="mess">蓝光画质</div>
          </li>
        </ul>
      </div>
      <div class="VIPTip">
        <div class="appTip">
          <span>立即开通，尊享会员特权</span>
        </div>
      </div>
    </div>
    <!-- 评论区 -->
    <div class="comment" ref="comment">
      <div class="title">
        <div class="titleLeft">评论</div>
      </div>
      <div class="commentItem">
        <div class="hotComment" v-if="commentTopData">
          <div
            class="item"
            v-for="(item, index) in commentTopData"
            :key="index">
            <div class="itemTop">
              <div class="avatar">
                <img :src="item.user.photo" alt="" />
              </div>
              <div class="infos">
                <div class="userName">
                  <div class="name">
                    {{ item.user.nickName }}
                    <div class="v" v-if="item.user.level">
                      v{{ item.user.level }}
                    </div>
                  </div>
                  <div class="time">{{ item.date }}</div>
                </div>
                <div class="content">
                  <div class="hotContent">
                    <span>热</span>
                    {{ item.content }}
                  </div>
                </div>
              </div>
            </div>
            <div class="hotOther" v-if="item.replyList != []">
              <div class="other">
                <div
                  class="otherList"
                  v-for="(it, ind) in item.replyList"
                  :key="ind">
                  <div class="userFor">
                    <span
                      >{{ it.user.nickName }} 回复
                      {{ item.user.nickName }}:</span
                    >
                    {{ it.content }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="commentCom" v-if="commentData">
          <div class="item" v-for="(item, index) in commentData" :key="index">
            <div class="itemTop">
              <div class="avatar">
                <img :src="item.user.photo" alt="" />
              </div>
              <div class="infos">
                <div class="userName">
                  <div class="name">
                    {{ item.user.nickName }}
                    <div class="v" v-if="item.user.level">
                      v{{ item.user.level }}
                    </div>
                  </div>
                  <div class="time">{{ item.date }}</div>
                </div>
                <div class="content">
                  <div class="hotContent">{{ item.content }}</div>
                </div>
              </div>
            </div>
            <div class="hotOther" v-if="item.replyList != []">
              <div class="other">
                <div
                  class="otherList"
                  v-for="(it, ind) in item.replyList"
                  :key="ind">
                  <div class="userFor">
                    <span
                      >{{ it.user.nickName }} 回复
                      {{ item.user.nickName }}:</span
                    >
                    {{ it.content }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="footD">
      <div class="footCommon">
        <p>Copyright © 2006-2023 mgtv.com All Rights Reserved</p>
        <p>互联网出版许可证：新出网证（湘）字08号</p>
      </div>
    </div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options" />
  </div>
</template>
<script>
  import { getVarietyDetail, getVarietyPlayDetail } from "@/api/variety";
  import { getcommentTop, getcomment } from "@/api/comment";

  export default {
    data() {
      return {
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
        active: 0,
        tvPlayDetailData: null,
        playData: null,
        commentTopData: null,
        commentData: null,
        detailType: "",
        moreShow: false,
        activeItem: 0,
        tipShow: true,
        currentTime: 0,
        vid: 0,
        nowTime: 0,
        showShare: false,
        options: [
          [
            { name: "微信", icon: "wechat" },
            { name: "朋友圈", icon: "wechat-moments" },
            { name: "微博", icon: "weibo" },
            { name: "QQ", icon: "qq" },
          ],
          [
            { name: "复制链接", icon: "link" },
            { name: "分享海报", icon: "poster" },
            { name: "二维码", icon: "qrcode" },
            { name: "小程序码", icon: "weapp-qrcode" },
          ],
        ],
        goodFor: 0,
        collect: 0,
      };
    },
    methods: {
      // 回到首页
      tohome() {
        this.saveVideoCurrentTime(this.vid);
        this.$router.push("home");
      },
      // 简介展开
      moreOpen() {
        this.moreShow = this.moreShow ? false : true;
      },
      // 切换视频
      changeVideo(id, event, index) {
        this.tipShow = true;
        this.saveVideoCurrentTime(this.vid);
        this.vid = id;
        let localGoodData = JSON.parse(localStorage.getItem("goodFor"));
        if (localGoodData) {
          localGoodData = localGoodData.filter((item) => {
            return item.id == id;
          });
          if (!localGoodData[0]) {
            this.goodFor = 0;
          } else {
            this.goodFor = localGoodData[0].good;
          }
        }
        let localcollectData = JSON.parse(localStorage.getItem("collect"));
        if (localcollectData) {
          localcollectData = localcollectData.filter((item) => {
            return item.id == id;
          });
          if (!localcollectData[0]) {
            this.collect = 0;
          } else {
            this.collect = localcollectData[0].collect;
          }
        }
        this.getVarietyPlayDetailData(id);
        this.activeItem = id;
        this.$refs.videoArea.scroll({
          left: event.target.offsetWidth * index,
          behavior: "smooth",
        });
        let localData = JSON.parse(localStorage.getItem("vid"));
        localData = localData.filter((item) => {
          return item.id == id;
        });
        if (localData[0]) {
          this.nowTime = localData[0].currentTime;
        }
      },
      // 跳转到上次的进度
      jumpTo() {
        this.$refs.playVideo.currentTime = this.nowTime;
        this.tipShow = false;
      },
      // 关闭跳转提示
      closeTip() {
        this.tipShow = false;
      },
      // 保存当前视频进度
      saveVideoCurrentTime(id) {
        if (!window.localStorage.getItem("vid")) {
          window.localStorage.setItem("vid", JSON.stringify([]));
        }
        let existingArray = JSON.parse(localStorage.getItem("vid"));
        if (existingArray != []) {
          for (let item of existingArray) {
            if (item.id == id) {
              item.currentTime = this.currentTime;
              window.localStorage.setItem("vid", JSON.stringify(existingArray));
              return;
            }
          }
        }
        existingArray.push({
          type: this.tvPlayDetailData.fstlvlType,
          id: id,
          currentTime: this.currentTime,
        });
        window.localStorage.setItem("vid", JSON.stringify(existingArray));
      },
      // 跳转到相应首页
      toRoute(index) {
        this.saveVideoCurrentTime(this.vid);
        if (index == 0) {
          this.$router.push("home");
        } else if (index == 1) {
          this.$router.push("variety");
        } else if (index == 2) {
          this.$router.push("animate");
        }
      },
      // 跳转到搜索页面
      toSearch() {
        this.saveVideoCurrentTime(this.vid);
        this.$router.push("search").catch((err) => {});
      },
      // 跳转到登录页
      toLogin() {
        this.saveVideoCurrentTime(this.vid);
        this.$router.push("login").catch((err) => {});
      },
      // 跳转到历史页面
      toHistory() {
        this.saveVideoCurrentTime(this.vid);
        this.$router.push("history").catch((err) => {});
      },
      // 滑动到评论区
      toComment() {
        this.$emit("appScroll", this.$refs.comment.offsetTop - 92);
      },
      // 点赞
      goodForChange() {
        this.goodFor = this.goodFor == 1 ? 0 : 1;
        this.goodForStore(this.vid);
      },
      // 收藏
      collectChange() {
        this.collect = this.collect == 1 ? 0 : 1;
        this.collectStore(this.vid);
      },
      // 存放点赞状态
      goodForStore(id) {
        if (!window.localStorage.getItem("goodFor")) {
          window.localStorage.setItem("goodFor", JSON.stringify([]));
        }
        let existingArray = JSON.parse(localStorage.getItem("goodFor"));
        if (existingArray != []) {
          for (let item of existingArray) {
            if (item.id == id) {
              item.good = this.goodFor;
              window.localStorage.setItem(
                "goodFor",
                JSON.stringify(existingArray)
              );
              return;
            }
          }
        }
        existingArray.push({
          type: this.tvPlayDetailData.fstlvlType,
          id: id,
          good: this.goodFor,
        });
        window.localStorage.setItem("goodFor", JSON.stringify(existingArray));
      },
      // 存放收藏状态
      collectStore(id) {
        if (!window.localStorage.getItem("collect")) {
          window.localStorage.setItem("collect", JSON.stringify([]));
        }
        let existingArray = JSON.parse(localStorage.getItem("collect"));
        if (existingArray != []) {
          for (let item of existingArray) {
            if (item.id == id) {
              item.collect = this.collect;
              window.localStorage.setItem(
                "collect",
                JSON.stringify(existingArray)
              );
              return;
            }
          }
        }
        existingArray.push({
          type: this.tvPlayDetailData.fstlvlType,
          id: id,
          collect: this.collect,
        });
        window.localStorage.setItem("collect", JSON.stringify(existingArray));
      },
      getTvPlayDetailData(id) {
        getVarietyDetail(id).then((data) => {
          this.tvPlayDetailData = data;
          if (this.tvPlayDetailData.fstlvlType == "1") {
            this.detailType = "综艺";
          } else if (this.tvPlayDetailData.fstlvlType == "2") {
            this.detailType = "动漫";
          }
        });
      },
      getVarietyPlayDetailData(id) {
        getVarietyPlayDetail(id).then((data) => {
          this.playData = data.url;
          this.vid = id;
          this.$nextTick(() => {
            if (this.$refs.playVideo) {
              this.$refs.playVideo.load();
              this.$refs.playVideo.ontimeupdate = () => {
                if (this.$refs.playVideo) {
                  this.currentTime = this.$refs.playVideo.currentTime;
                }
              };
            }
          });
        });
      },
      getcommentTopData(id) {
        getcommentTop(id).then((data) => {
          this.commentTopData = data.list;
        });
      },
      getcommentData(id) {
        getcomment(id).then((data) => {
          this.commentData = data.list;
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
      this.getTvPlayDetailData(this.$route.query.id); // 获取综艺详情列表数据
      this.getVarietyPlayDetailData(this.$route.query.id); // 获取视频播放数据
      this.getcommentTopData(this.$route.query.id); // 获取综艺评论区热门评论数据
      this.getcommentData(this.$route.query.id); // 获取综艺评论区普通评论数据
      // 根据视频id高亮列表中正在播放的视频
      this.activeItem = this.$route.query.id;
    },
    mounted() {
      // 进入详情页获取上次退出时的缓存时间及点赞收藏状态
      let existingArray = JSON.parse(localStorage.getItem("vid"));
      if (existingArray) {
        existingArray = existingArray.filter((item) => {
          return item.id == this.$route.query.id;
        });
        if (existingArray[0]) {
          this.nowTime = existingArray[0].currentTime;
        }
        let goodArray = JSON.parse(localStorage.getItem("goodFor"));
        if (goodArray) {
          goodArray = goodArray.filter((item) => {
            return item.id == this.$route.query.id;
          });
          if (goodArray[0]) {
            this.goodFor = goodArray[0].good;
          }
        }
        let collectArray = JSON.parse(localStorage.getItem("collect"));
        if (collectArray) {
          collectArray = collectArray.filter((item) => {
            return item.id == this.$route.query.id;
          });
          if (collectArray[0]) {
            this.collect = collectArray[0].collect;
          }
        }
      }
    },
    updated() {
      // 进入详情页，导航跳转到相应类型位置
      this.active = this.tvPlayDetailData
        ? Number(this.tvPlayDetailData.fstlvlType)
        : 0;
      this.$refs.navBar.scroll({
        left:
          this.$refs[`${this.active + this.active}`].offsetWidth * this.active,
        behavior: "smooth",
      });
    },
  };
</script>
<style lang="scss" scoped>
  .playDetail {
    width: 100%;
    margin: 0 auto;
    background-color: rgb(42, 40, 43);
    // overflow: scroll;

    .top {
      background-color: #2a282b;
      .headD {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .logo {
          width: 30%;
          height: 44px;
          background: url(../assets/img/logoDetail.png) no-repeat 19px center;
          background-size: 82px;
        }

        .searchBox {
          flex: 1;
          display: flex;
          justify-content: end;

          .search {
            height: 44px;
            font-size: 22px;
            font-weight: 600;
            line-height: 48px;
            color: rgb(255, 215, 149);
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
            color: rgb(255, 215, 149);
          }

          .sign-in {
            height: 44px;
            font-size: 22px;
            font-weight: 600;
            line-height: 44px;
            line-height: 48px;
            color: rgb(255, 215, 149);
          }
        }
      }

      .navD {
        width: 100%;
        height: 34px;
        display: flex;
        align-items: end;
        margin-top: 11px;
        margin-bottom: 3px;

        .navBar {
          width: 100%;
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
              color: rgba(255, 255, 255, 0.3);

              &.active {
                font-size: 22px;
                font-weight: 600;
                color: rgb(255, 215, 156);
              }
            }
          }
        }
      }
    }

    .videoArea {
      width: 100%;
      position: relative;

      video {
        display: block;
      }

      .toSave {
        width: 200px;
        height: 25px;
        background-color: rgba(0, 0, 0, 0.6);
        position: absolute;
        top: 120px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        color: #fff;
        font-size: 13px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;

        i {
          font-size: 14px;
        }

        .jumpTo {
          color: rgb(255, 95, 0);
        }
      }

      .videoMessage {
        width: 100%;
        // height: 300px;
        margin-top: 15px;
        // border-bottom: 1px solid rgba(136, 136, 136, 0.2);

        .appTipArea {
          width: 100%;
          height: 44px;
          display: flex;
          justify-content: center;

          .appTip {
            width: 92%;
            height: 44px;
            border-radius: 22px;
            background: linear-gradient(
              45deg,
              rgb(240, 207, 156),
              rgb(231, 191, 114)
            );
            display: flex;
            justify-content: center;

            span {
              display: inline-block;
              height: 100%;
              line-height: 44px;
              color: rgb(129, 81, 15);
            }
          }
        }

        .title {
          width: 100%;
          height: 26px;
          margin-top: 15px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          padding-left: 15px;
          padding-right: 15px;
          padding-bottom: 3px;

          .titleLeft {
            height: 23px;
            font-size: 19px;
            font-weight: 700;
            color: #fff;
          }

          .more {
            height: 22px;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.3);

            .open {
              margin-left: 2px;
              font-size: 12px;
            }
          }
        }

        .videoDetail {
          width: 100%;
          height: 215px;
          box-sizing: border-box;
          padding: 0px 15px 15px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.3);

          span {
            display: block;
            height: 20px;
            line-height: 20px;
          }

          p {
            line-height: 20px;
          }
        }
      }
    }

    .likeArea {
      width: 100%;
      height: 75px;
      box-sizing: border-box;
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #353336;

      .likeLeft {
        .comt {
          font-size: 22px;
          color: rgba(255, 255, 255, 0.6);
        }

        .commLength {
          margin-left: 5px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }
      }

      .likeRight {
        width: 40%;
        display: flex;
        justify-content: space-between;

        .fenxiang {
          font-size: 22px;
          color: rgba(255, 255, 255, 0.6);
        }

        .dianzan {
          font-size: 22px;
          color: rgba(255, 255, 255, 0.6);
        }

        .dianzan1 {
          font-size: 22px;
          color: #ff6699;
        }

        .shoucang {
          font-size: 22px;
          color: rgba(255, 255, 255, 0.6);
        }

        .shoucang1 {
          font-size: 22px;
          color: #ff6699;
        }
      }
    }

    .advertisementArea {
      width: 92%;
      height: 65px;
      box-sizing: border-box;
      margin: 15px 15px 0px;

      .advertisement {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }

        .tip {
          width: 33px;
          height: 18px;
          font-size: 12px;
          line-height: 18px;
          position: absolute;
          right: 3px;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          color: #fff;
          text-align: center;
          border-radius: 3px;
        }
      }
    }

    .onVideo {
      width: 100%;
      height: 162px;
      margin-top: 30px;

      .title {
        width: 100%;
        height: 21px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: end;
        padding-left: 15px;
        padding-right: 15px;

        .titleLeft {
          height: 21px;
          font-size: 20px;
          line-height: 21px;
          font-weight: 700;
          color: #fff;
        }

        .more {
          height: 19px;
          display: flex;
          align-items: center;
          font-size: 14px;
          line-height: 19px;
          color: rgba(255, 255, 255, 0.3);

          .open {
            margin-left: 2px;
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
                }
              }
            }

            .mess {
              width: 128px;
              height: 44px;
              box-sizing: border-box;
              padding-right: 15px;
              margin-top: 10px;
              font-size: 15px;

              &.active {
                color: rgb(255, 95, 0);
              }
            }
          }
        }
      }
    }

    .videoModule {
      width: 100%;
      height: 162px;
      margin-top: 30px;

      .title {
        width: 100%;
        height: 21px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: end;
        padding-left: 15px;
        padding-right: 15px;

        .titleLeft {
          height: 21px;
          font-size: 20px;
          line-height: 21px;
          font-weight: 700;
          color: #fff;
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
                  rgba(0, 0, 0, 0.3) 20%
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

            .mess {
              width: 128px;
              height: 44px;
              box-sizing: border-box;
              padding-right: 15px;
              margin-top: 10px;
              font-size: 15px;
            }
          }
        }
      }
    }

    .VIPVideo {
      width: 100%;
      height: 162px;
      margin-top: 30px;

      .title {
        width: 100%;
        height: 21px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: end;
        padding-left: 15px;
        padding-right: 15px;

        .titleLeft {
          height: 21px;
          font-size: 20px;
          line-height: 21px;
          font-weight: 700;
          color: #fff;
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

            .mess {
              width: 128px;
              height: 44px;
              box-sizing: border-box;
              padding-right: 15px;
              margin-top: 10px;
              font-size: 15px;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }

    .VIPPower {
      width: 100%;
      height: 177px;
      margin-top: 30px;

      .title {
        width: 100%;
        height: 21px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: end;
        padding-left: 15px;
        padding-right: 15px;

        .titleLeft {
          height: 21px;
          font-size: 20px;
          line-height: 21px;
          font-weight: 700;
          color: #fff;
        }
      }

      .videoItem {
        width: 100%;
        height: 77px;
        margin-top: 15px;
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;

        &::-webkit-scrollbar {
          display: none;
        }

        ul {
          height: 77px;
          margin-left: 15px;
          margin-right: 9px;
          display: flex;
          justify-content: center;
          flex-wrap: nowrap;

          li {
            width: 84px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-right: 6px;
            color: rgba(255, 255, 255, 0.6);

            .imgDiv {
              width: 50px;
              height: 50px;
              margin: 0px 17px 12px;
              overflow: hidden;
              position: relative;

              img {
                width: 100%;
              }
            }

            .mess {
              width: 100%;
              height: 15px;
              box-sizing: border-box;
              font-size: 14px;
              line-height: 15px;
              text-align: center;
            }
          }
        }
      }

      .VIPTip {
        width: 100%;
        height: 44px;
        margin-top: 20px;
        display: flex;
        justify-content: center;

        .appTip {
          width: 92%;
          height: 44px;
          border-radius: 22px;
          background: linear-gradient(
            45deg,
            rgb(240, 207, 156),
            rgb(231, 191, 114)
          );
          display: flex;
          justify-content: center;

          span {
            display: inline-block;
            height: 100%;
            line-height: 44px;
            color: rgb(129, 81, 15);
          }
        }
      }
    }

    .comment {
      width: 100%;
      margin-top: 30px;

      .title {
        width: 100%;
        height: 21px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: end;
        padding-left: 15px;
        padding-right: 15px;

        .titleLeft {
          height: 21px;
          font-size: 20px;
          line-height: 21px;
          font-weight: 700;
          color: #fff;
        }
      }

      .commentItem {
        width: 100%;

        .item {
          width: 100%;
          overflow: hidden;
          border-bottom: 1px solid rgba(136, 136, 136, 0.2);
          margin-top: 15px;

          .itemTop {
            width: 100%;
            box-sizing: border-box;
            padding-left: 15px;
            padding-right: 15px;
            display: flex;

            .avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 15px;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .infos {
              flex: 1;

              .userName {
                width: 100%;
                height: 23px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                padding-top: 4px;
                padding-bottom: 2px;
                margin-bottom: 7px;

                .name {
                  height: 16px;
                  font-size: 14px;
                  line-height: 16px;
                  display: flex;
                  align-items: center;
                  color: rgb(255, 95, 0);

                  .v {
                    width: 21px;
                    height: 14px;
                    font-size: 12px;
                    margin-left: 4px;
                    background-color: rgb(219, 179, 97);
                    color: #fff;
                    text-align: center;
                    border-radius: 7px;
                  }
                }

                .time {
                  height: 12px;
                  line-height: 12px;
                  font-size: 12px;
                  color: rgba(255, 255, 255, 0.3);
                }
              }

              .content {
                width: 100%;
                margin-bottom: 15px;

                .hotContent {
                  font-size: 15px;
                  color: rgba(255, 255, 255, 0.6);

                  span {
                    display: inline-block;
                    width: 22px;
                    height: 16px;
                    font-size: 12px;
                    text-align: center;
                    color: #fff;
                    background-color: rgb(246, 28, 84);
                    border-radius: 3px;
                    margin-right: 3px;
                  }
                }
              }
            }
          }

          .other {
            width: 81%;
            box-sizing: border-box;
            padding-left: 10px;
            border-left: 1px solid rgb(255, 95, 0);
            margin-left: 70px;
            margin-bottom: 15px;

            .otherList {
              width: 100%;
              margin-bottom: 15px;
              font-size: 15px;

              .userFor {
                width: 100%;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.6);

                span {
                  display: inline-block;
                  height: 19px;
                  line-height: 19px;
                  color: rgba(255, 255, 255, 0.3);
                }
              }
            }
          }
        }

        .item:last-child {
          border-bottom: none;
        }
      }
    }

    .footD {
      width: 100%;
      height: 62px;
      box-sizing: border-box;

      .footCommon {
        width: 100%;
        height: 62px;
        box-sizing: border-box;
        padding-top: 15px;
        padding-bottom: 15px;
        text-align: center;
        font-size: 12px;
        color: rgb(136, 136, 136);
      }
    }
  }
</style>
