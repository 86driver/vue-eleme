<template>
  <div>
    <ul class="u-list" :class="supportType">
      <li v-for="(support,index) in supports" :key="index">
        <span :class="iconMap[index]" class="bg-img"></span>
        <span class="description">{{support.description}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'support',
    props: {
      supports: {
        type: Array
      },
      position: {
        type: String
      }
    },
    data () {
      return {
        iconMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      }
    },
    computed: {
      supportType () {
        return this.position + '-border'
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/min.less';
  .decrease{
    .bg-image('decrease_1')
  }
  .discount{
    .bg-image('discount_1')
  }
  .guarantee{
    .bg-image('guarantee_1')
  }
  .invoice{
    .bg-image('invoice_1')
  }
  .special{
    .bg-image('special_1')
  }
  .u-list{
    margin-top: 24px;
    li{
      text-align: left;
      margin: 12px;
      .bg-img{
        display: inline-block;
        background-size: 16px 16px;
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }
      .description{
        font-size: 12px;
        font-weight: 200;
        color: #fff;
        line-height: 12px;
        vertical-align: text-top;
      }
    }
  }
  .bottom-border{
    margin-top: 0;
    li{
      margin: 0;
      padding: 16px 0;
      .description{
        color: rgb(7,17,27);
        font-weight: 400;
        line-height: 6px;
      }
    }
    :not(:last-child){
      border-bottom: 1px solid rgba(7,17,27,0.1);
    }
  }
</style>
