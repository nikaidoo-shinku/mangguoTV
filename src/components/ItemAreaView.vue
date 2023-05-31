<template>
  <div class="hotItemArea" v-if="hotPlayData">
    <div
      class="hotItem"
      @click="toDetail(item.id)"
      v-for="(item, index) in hotPlayData"
      :key="index"
      v-lazy="item.pic">
      <div class="itemImg">
        <img :src="item.pic" alt="" />
      </div>
      <p class="itemTitle one-txt-cut">{{ item.title }}</p>
      <p class="itemText one-txt-cut">{{ item.subtitle }}</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      hotPlayData: {
        default: null,
      },
    },
    data() {
      return {
        TvPlayDetailData: null,
      };
    },
    methods: {
      // 跳转到详情页
      toDetail(id) {
        this.$router.push({ name: "playDetail", query: { id: id } });
      },
    },
    created() {},
  };
</script>
<style lang="scss" scoped>
  .hotItemArea {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 187px);

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
</style>
