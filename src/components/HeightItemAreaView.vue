<template>
  <div class="itemArea" v-if="bigVideo">
    <div class="item" v-for="item in bigVideo" :key="item.id" v-lazy="item.pic">
      <div class="itemImg">
        <img :src="item.pic" alt="" />
      </div>
      <div class="text">{{ item.title }}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      bigVideo: {
        default: null,
      },
    },
    data() {
      return {};
    },
  };
</script>
<style lang="scss" scoped>
  .itemArea {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 124px);

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
</style>
