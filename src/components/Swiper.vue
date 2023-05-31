<template>
  <!-- 轮播图 -->
  <div class="swiper" v-if="banners">
    <!-- Swiper -->
    <div class="swiper mySwiper" ref="mySwiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in banners"
          :key="item.id"
          @slideChange="slideChange(index)">
          <img :src="item.pic + '?param=345y194'" alt="" />
          <div class="swiperTitle">{{ item.title }}</div>
          <div class="swiperText">{{ item.subtitle }}</div>
          <div class="mask"></div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
  import ColorThief from "colorthief";

  export default {
    props: {
      banners: {
        default: null,
      },
    },
    data() {
      return {};
    },
    methods: {
      getSwiper() {
        var swiper = new Swiper(".mySwiper", {
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          slidesPerView: "auto",
          spaceBetween: 5,
          centeredSlides: true,
          // spaceBetween: 30,
          grabCursor: true,
          loop: true,
          observer: true,
          observeParents: true,
          observeSlideChildren: true,
          on: {
            slideChange: () => {
              if (this.$refs.mySwiper) {
                // console.log(
                //   "改变了，activeIndex为" + this.$refs.mySwiper.swiper.realIndex
                // );
                const img = new Image();
                img.crossOrigin = "";
                img.src =
                  this.banners[this.$refs.mySwiper.swiper.realIndex].pic;
                img.onload = () => {
                  const colorThief = new ColorThief();
                  const color = colorThief.getColor(img);
                  this.$emit("backgroundchange", color);
                };
              }
              // console.log(this.$refs.mySwiper.swiper.realIndex);
            },
          },
          //   pagination: {
          //     el: ".swiper-pagination",
          //     clickable: true,
          //   },
          //   navigation: {
          //     nextEl: ".swiper-button-next",
          //     prevEl: ".swiper-button-prev",
          //   },
        });
      },
    },
    mounted() {
      this.getSwiper();
    },
    updated() {
      this.getSwiper();
    },
  };
</script>
<style lang="scss" scoped>
  .swiper {
    width: 100%;
    // height: 194px;
    z-index: 3;
    margin-top: 5px;

    .swiper {
      width: 100%;
    }

    .swiper-slide {
      width: 92%;
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border-radius: 10px;
      overflow: hidden;
      position: relative;

      .swiperTitle {
        width: 100%;
        height: 20px;
        position: absolute;
        bottom: 38px;
        font-size: 20px;
        line-height: 20px;
        color: #fff;
        font-weight: 550;
        text-align: start;
        box-sizing: border-box;
        padding-left: 15px;
        z-index: 2;
      }

      .swiperText {
        width: 100%;
        height: 12px;
        position: absolute;
        bottom: 16px;
        font-size: 12px;
        line-height: 12px;
        color: rgba(255, 255, 255, 0.8);
        text-align: start;
        box-sizing: border-box;
        padding-left: 15px;
        z-index: 2;
      }

      .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-image: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.3) 10px,
          transparent
        );
        z-index: 1;
      }
    }

    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
