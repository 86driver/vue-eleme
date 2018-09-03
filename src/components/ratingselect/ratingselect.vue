<template>
  <div class="ratings">
      <!-- 是否显示商品评价四个字 -->
      <slot></slot>
      <div class="rating-type">
        <span class="rating-all" @click="all" :class="{'positive':rateType === 100}">{{selectType.all}}</span>
        <span class="rating-recommend" @click="recommend" :class="{'positive':rateType === 0}">{{selectType.positive}}</span>
        <span class="rating-complaints" @click="complaints" :class="{'negative':rateType === 1}">{{selectType.negative}}</span>
      </div>
      <div class="select-ratings" @click="toggleContent">
        <i class="iconfont icon-zhengque" :class="{'onlyContent':onlyContent}"></i>
        <span>只看有内容的评价</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'ratingselect',
    props: {
      selectType: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data () {
      return {
        rateType: 100,
        onlyContent: false
      }
    },
    methods: {
      all () {
        this.rateType = 100
        this.$emit('all')
      },
      recommend () {
        // 查看推荐评价
        this.rateType = 0
        this.$emit('recommend')
      },
      complaints () {
        // 查看吐槽评价
        this.rateType = 1
        this.$emit('complaints')
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent
        this.$emit('toggleContent')
      }
    }
  }
</script>

<style lang="less" scoped>
  .ratings{
    margin: 18px 18px 0 18px;
    .rating-title{
      font-size: 14px;
      line-height: 14px;
      color: #07111b;
    }
    .rating-type{
      padding: 18px 0;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      .rating-all{
        background-color: rgba(0,160,220,0.2);
        padding: 8px 12px;
        border-radius: 2px;
        margin-right: 8px;
      }
      .rating-recommend{
        background-color: rgba(0,160,220,0.2);
        padding: 8px 12px;
        border-radius: 2px;
        margin-right: 8px;
      }
      .positive{
        background-color: rgb(0,160,220) !important;
        color: #fff;
      }
      .negative{
        background-color: rgb(77,85,93) !important;
        color: #fff;
      }
      .rating-complaints{
        background-color: rgba(77,85,93,0.2);
        padding: 8px 12px;
        border-radius: 2px;
      }
    }
    .select-ratings{
      margin-top: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      i{
        width: 24px;
        height: 24px;
        font-size: 18px;
        color: #fff;
        background-color: #93999f;
        line-height: 24px;
        border-radius: 50%;
        display: inline-block;
        text-align: center;
        margin-right: 4px;
      }
      .onlyContent{
        background-color: #00c850;
      }
      span{
        font-size: 12px;
        line-height: 24px;
        color: rgb(147,153,159);
        vertical-align: top;
      }
    }
  }
  .rating-msg{
    padding: 16px 18px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    .user{
      float: right;
    }
    .time{
      float: left;
      font-size: 10px;
      color: rgb(147,153,159);
      line-height: 12px;
      display: inline-block;
    }
    .username{
      margin-right: 6px;
      font-size: 10px;
      color: rgb(147,153,159);
      display: inline-block;
      line-height: 12px;
    }
    .avatar img{
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .text{
      clear: both;
      .icon-thumb-up{
        color: rgb(0,160,220);
      }
      .text-content{
        font-size: 12px;
        color: rgb(7,17,27);
        line-height: 16px;
        display: inline-block;
      }
    }
  }
</style>
