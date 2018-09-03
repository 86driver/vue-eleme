<template>
  <div class="header-wrapper">
    <div class="header-main">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="name">
          <span class="brand"></span>
          <span class="seller-name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="supports">
          <v-scroll></v-scroll>
        </div>
      </div>
      <div class="detail-count" @click="showDetail=true">
        <span>5个</span>
        <i class="iconfont icon-xiangyoujiantou"></i>
      </div>
      <div class="bg">
        <img :src="seller.avatar">
      </div>
      <transition name="show-detail">
        <div class="detail" v-if="showDetail">
          <div class="detail-wrapper clearFix">
            <div class="detail-content">
              <div class="detail-title">{{seller.name}}</div>
              <v-star :score="score" class="seller-star" :size="48"></v-star>
              <div class="activities">
                <span class="line"></span>
                <span class="activities-title">优惠信息</span>
                <span class="line"></span>
              </div>
              <support :supports="seller.supports"></support>
              <div class="notice">
                <span class="line"></span>
                <span class="notice-title">商家公告</span>
                <span class="line"></span>
                <p class="notice-content">{{seller.bulletin}}</p>
              </div>
            </div>
          </div>
          <div class="detail-footer">
            <i class="iconfont icon-cuowu" @click="showDetail = false"></i>
          </div>
        </div>
      </transition>
    </div>
    <div class="header-bulletin">
      <span class="bulletin-img"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="iconfont icon-xiangyoujiantou" @click="showDetail = true"></i>
    </div>
  </div>
</template>

<script>
  import scroll from '../scroll/scroll'
  import star from '../star/star'
  import support from '../support/support'
  export default {
    data () {
      return {
        showDetail: false,
        iconMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      }
    },
    computed: {
      seller () {
        return this.$store.state.seller
      },
      score () {
        // 用于star组件计算
        return this.seller.score
      }
    },
    created () {
        this.$store.dispatch('commitSeller')
    },
    components: {
      'v-scroll': scroll,
      'v-star': star,
      support
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
  .line{
    display: inline-block;
    width: 107px;
    border-bottom: 2px rgba(255,255,255,0.2) solid;
    vertical-align: center;
  }
  .clearFix::after {
    display: block;
    content: ".";
    height: 0;
    font-size: 0;
    clear: both;
    visibility: hidden;
  }
  .header-wrapper{
    background: rgba(7, 17, 27, 0.5);
    .header-main{
      position: relative;
      padding: 24px 12px 18px 15px;
      .show-detail-enter-active,.show-detail-leave-active{
        transition: all .5s linear;
        opacity: 1;
      }
      .show-detail-enter,.show-detail-leave-to{
        opacity: 0;
        background: rgb(7, 17, 27)
      }
      .avatar{
        display: inline-block;
        vertical-align: top;
        img{
          width: 64px;
          height: 64px;
          border-radius: 2px;
        }
      }
      .content{
        display: inline-block;
        margin-left: 16px;
        color: #fff;
        .name{
          .brand{
            vertical-align: top;
            display: inline-block;
            background-size: 30px 18px;
            background-repeat: no-repeat;
            width: 30px;
            height: 18px;
            .bg-image('brand');
          }
          .seller-name{
            margin-left: 6px;
            font-size: 16px;
            font-weight: 700;
            line-height: 18px;
          }
        }
        .description{
          margin-top: 8px;
          font-size: 12px;
          font-weight: 200;
          line-height: 12px;
        }
        .supports{
          margin-top: 10px;
          font-size: 10px;
          line-height: 12px;
          font-weight: 200;
        }
      }
      .detail-count{
        position: absolute;
        right: 10px;
        bottom: 18px;
        color: #fff;
        font-weight: 200;
        line-height: 12px;
        padding: 7px 8px;
        background-color: rgba(0,0,0,0.2);
        border-radius: 12px;
        .icon-xiangyoujiantou{
          font-size: 10px;
        }
      }
      .detail{
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7,17,27,0.8);
        -webkit-backdrop-filter: blur(10px);
        .detail-wrapper{
          min-height: 100%;
          .detail-content{
            margin:0 36px;
            padding: 64px 0;
            text-align: center;
            .detail-title{
              font-size: 16px;
              font-weight: 700;
              color: #fff;
              line-height: 16px;
            }
            .seller-star{
              margin-top: 16px;
              height: 24px;
            }
            .activities{
              margin-top: 28px;
              .activities-title{
                vertical-align: bottom;
                font-size: 14px;
                color: #fff;
                font-weight: 700;
                line-height: 14px;
                margin: 0 12px;
              }
            }
            .notice{
              margin-top: 28px;
              .notice-title{
                vertical-align: bottom;
                font-size: 14px;
                color: #fff;
                font-weight: 700;
                line-height: 14px;
                margin: 0 12px;
              }
              .notice-content{
                text-align: left;
                margin: 24px 12px 0 12px;
                font-size: 12px;
                font-weight: 200;
                color: #fff;
                line-height: 24px;
              }
            }
          }
        }
        .detail-footer{
          position: relative;
          margin: -64px auto 0 auto;
          width: 32px;
          height: 32px;
          clear: both;
          font-size: 32px;
          line-height: 32px;
          color: rgba(255,255,255,0.5);
          text-align: center;
        }
      }
      .bg{
        width: 100%;
        height: 100%;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        filter: blur(10px);
        z-index: -1;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .header-bulletin{
      position: relative;
      padding: 0 24px 0 12px;
      line-height: 28px;
      background-color: rgba(7,17,27,0.2);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #fff;
      .bulletin-img{
        vertical-align: baseline;
        display: inline-block;
        background-size: 22px 14px;
        background-repeat: no-repeat;
        width: 22px;
        height: 14px;
        .bg-image('bulletin');
      }
      .bulletin-text{
        vertical-align: top;
        height: 28px;
        margin: 0 4px;
        line-height: 28px;
        color: #fff;
        font-size: 10px;
        font-weight: 200;
      }
      i{
        position: absolute;
        font-size: 10px;
        right: 12px;
        top: 0;
      }
    }
  }
</style>
