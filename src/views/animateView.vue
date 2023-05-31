<template>
  <div class="animateView" v-if="animateData">
    <swiper
      :banners="animateData.banners"
      @backgroundchange="backgroundchange"></swiper>
    <!-- 当季热播 -->
    <div class="hotPlay">
      <div class="hotTitle">
        <div class="hotText">浪漫奇遇🍨夏日与你一起到来</div>
      </div>
      <item-area-view :hotPlayData="animateData.hotPlay"></item-area-view>
    </div>
    <!-- 佳片剧场 -->
    <div class="hotPlay">
      <div class="hotTitle">
        <div class="hotText">次元漫游 精彩不停</div>
      </div>
      <item-area-view :hotPlayData="animateData.niceVideo"></item-area-view>
    </div>
    <!-- 院线大片 -->
    <div class="hotPlay">
      <div class="hotTitle">
        <div class="hotText">短片特辑 抢先观看</div>
      </div>
      <item-area-view :hotPlayData="animateData.bigVideo"></item-area-view>
    </div>
    <!-- 时代画卷 -->
    <div class="hotPlay">
      <div class="hotTitle">
        <div class="hotText">独播强档 百变画风</div>
      </div>
      <item-area-view :hotPlayData="animateData.hotPlay"></item-area-view>
    </div>
    <!-- 萌趣成长 -->
    <div class="chilGrow" v-if="animateData">
      <div class="title">趣味日常 轻松剧场</div>
      <item-area-view :hotPlayData="animateData.chilGrow"></item-area-view>
    </div>
    <!-- 底部区域 -->
    <div class="foot">
      <div class="loadingTip">
        <div></div>
        <span>已全部加载完毕</span>
        <div></div>
      </div>
      <div class="footCommon">
        <p>Copyright © 2006-2023 mgtv.com All Rights Reserved</p>
        <p>互联网出版许可证：新出网证（湘）字08号</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { getAnimate } from "@/api/animate.js";
  import ItemAreaView from "@/components/ItemAreaView.vue";
  import HeightItemAreaView from "@/components/HeightItemAreaView.vue";
  import Swiper from "@/components/Swiper.vue";

  export default {
    components: { ItemAreaView, HeightItemAreaView, Swiper },
    data() {
      return {
        animateData: null,
      };
    },
    methods: {
      // 动态更改背景色
      backgroundchange(color) {
        this.$store.commit("changeBannerColor", color);
      },
      getAnimateData() {
        getAnimate().then((data) => {
          this.animateData = data.data;
        });
      },
    },
    created() {
      this.getAnimateData(); // 获取综艺主页数据
    },
    mounted() {},
  };
</script>
<style lang="scss" scoped>
  @mixin commonContainer {
    width: 100%;
    height: 100%;
  }

  @mixin titleMixin {
    width: 100%;
    height: 22px;
    display: flex;
    box-sizing: border-box;
    padding-left: 15px;
    margin-top: 30px;
    color: rgb(51, 51, 51);
  }

  @mixin videoItem {
    width: 100%;

    .title {
      @include titleMixin;
      font-weight: 700;
      font-size: 20px;
      line-height: 22px;
    }

    .itemArea {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .item {
        width: 124px;
        height: 205px;
        margin-top: 15px;

        .itemImg {
          width: 124px;
          height: 174px;
          margin-bottom: 14px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .text {
          width: 100%;
          box-sizing: border-box;
          padding-left: 15px;
          line-height: 16px;
          color: rgb(51, 51, 51);
        }
      }
    }
  }

  @mixin videoItemSc {
    width: 100%;

    .title {
      @include titleMixin;
      font-weight: 700;
      font-size: 20px;
      line-height: 22px;
    }

    .hotItemArea {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .hotItem {
        width: 187px;
        height: 160px;
        margin-top: 15px;

        .itemImg {
          width: 100%;
          height: 105px;
          margin-bottom: 14px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .itemTitle {
          height: 16px;
          line-height: 16px;
          padding-left: 15px;
          margin-bottom: 13px;
          color: rgb(51, 51, 51);
        }

        .itemText {
          font-size: 12px;
          height: 12px;
          line-height: 12px;
          padding-left: 15px;
          color: rgb(136, 136, 136);
        }
      }
    }
  }

  .animateView {
    @include commonContainer;

    .hotPlay {
      width: 100%;

      .hotTitle {
        @include titleMixin;

        .hotImg {
          margin-right: 10px;

          img {
            width: 22px;
          }
        }

        .hotText {
          font-size: 20px;
          font-weight: 550;
          line-height: 22px;
        }
      }
    }

    .niceVideo {
      @include videoItem;
    }

    .bigVideo {
      @include videoItem;
    }

    .viewVideo {
      @include videoItem;
    }

    .chilGrow {
      @include videoItemSc;
    }

    .foot {
      width: 100%;
      height: 118px;
      margin-top: 15px;

      .loadingTip {
        width: 100%;
        height: 56px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        padding-top: 20px;
        padding-bottom: 20px;
        align-items: center;
        color: rgb(136, 136, 136);

        div {
          width: 60px;
          border-bottom: 1px solid rgb(136, 136, 136);
          opacity: 0.2;
        }

        span {
          font-size: 12px;
          line-height: 16px;
          margin-left: 10px;
          margin-right: 10px;
        }
      }

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
