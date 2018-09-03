<template>
  <div class="ratings-wrapper">
    <div class="sell-msg">
      <div class="left-msg">
        <div class="score">{{seller.score}}</div>
        <div class="font1">综合评分</div>
        <div class="font2">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="right-msg">
        <div>
          <span class="score-font">服务态度</span>
          <v-star :score="serviceScore" class="v-star" :size="36"></v-star>
          <span class="score-count">{{seller.serviceScore}}</span>
        </div>
        <div class="margin-top-8">
          <span class="score-font">美食好评</span>
          <v-star :score="foodScore" class="v-star" :size="36"></v-star>
          <span class="score-count">{{seller.foodScore}}</span>
        </div>
        <div class="margin-top-8">
          <span class="score-font">送达时间</span>
          <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <ratingselect @complaints="complaints" @recommend="recommend" @all="all" @toggleContent="toggleContent"></ratingselect>
    <pulldown ref="pulldown"></pulldown>
  </div>
</template>

<script>
  import star from '../star/star'
  import pulldown from '../pulldown/pulldown'
  import ratingselect from '../ratingselect/ratingselect'

  export default {
    name: 'ratings',
    created () {
      this.$store.dispatch('commitSeller')
    },
    computed: {
      seller () {
        return this.$store.state.seller
      },
      serviceScore () {
        return this.seller.serviceScore
      },
      foodScore () {
        return this.seller.foodScore
      }
    },
    methods: {
      all () {
        // 没有定义rateType = 100  这里设置为100意味着选择全部
        this.$refs.pulldown.rateType = 100
      },
      recommend () {
        // 查看推荐评价
        this.$refs.pulldown.rateType = 0
      },
      complaints () {
        // 查看吐槽评价
        this.$refs.pulldown.rateType = 1
      },
      toggleContent () {
        this.$refs.pulldown.onlyContent = !this.$refs.pulldown.onlyContent
      }
    },
    components: {
      'v-star': star,
      ratingselect,
      pulldown
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .margin-top-8{
    margin-top: 8px;
  }
  .score-font{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 18px;
    margin-right: 10px;
  }
  .score-count{
    color: #ff9900;
    line-height: 18px;
    margin-left: 10px;
  }
  .v-star{
    display: inline-block;
  }
  .sell-msg {
    margin: 18px 0;
    display: flex;
    .left-msg {
      flex: 0 0 137px;
      width: 137px;
      text-align: center;
      border-right: 1px solid rgba(147, 153, 159, 0.4);
      .score {
        font-size: 24px;
        color: rgb(255, 153, 0);
        line-height: 28px;
      }
      .font1 {
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 12px;
        margin: 6px 0 8px 0;
      }
      .font2 {
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 10px;
        margin-bottom: 6px;
      }
    }
    .right-msg{
      flex: 1;
      margin: 0 24px;
      .deliveryTime{
        font-size: 12px;
        color: rgb(147,153,159);
        line-height: 18px;
        display: inline-block;
      }
    }
  }
</style>
