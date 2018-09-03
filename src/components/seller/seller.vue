<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <div class="sell-msg">
        <div class="sell-top">
          <div class="left">
            <div class="title">{{seller.name}}</div>
            <v-star :size="36" :score="seller.score" class="v-star"></v-star>
            <span class="sellCount">月售{{seller.sellCount}}单</span>
          </div>
          <div class="right">
            <transition>
              <div>
                <i class="iconfont icon-jushoucang" @click="keepSeller" :class="{'showKeep':toggleKeep}"></i>
                <div v-show="toggleKeep">已收藏</div>
              </div>
            </transition>
          </div>
        </div>
        <div class="sell-bottom">
          <div class="minPrice">
            <div class="common">起送价</div>
            <div class="count">{{seller.minPrice}}<span>元</span></div>
          </div>
          <div class="deliveryPrice ">
            <div class="common">商家配送</div>
            <div class="count">{{seller.deliveryPrice}}<span>元</span></div>
          </div>
          <div class="deliveryTime">
            <div class="common">平均配送时间</div>
            <div class="count">{{seller.deliveryTime}}<span>分钟</span></div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="sell-content">
        <div class="title">公告与活动</div>
        <div class="bulletin">{{seller.bulletin}}</div>
        <support :supports="seller.supports" :position="`bottom`"></support>
      </div>
      <div class="line"></div>
      <div class="pics">
        <div class="title">商家实景</div>
        <div class="pic-wrapper" ref="picWrapper">
          <ul ref="picList" class="pic-list">
            <li v-for="(pic,index) in seller.pics" :key="index" class="pic-item">
              <img :src="pic">
            </li>
          </ul>
        </div>
      </div>
      <div class="line"></div>
      <div class="sell-infos">
        <div class="title border-1px">商家信息</div>
        <ul>
          <li v-for="(item,index) in seller.infos" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import star from '../star/star'
  import support from '../support/support'
  export default {
    name: 'seller',
    data () {
      return {
        toggleKeep: false
      }
    },
    created () {
      this._initScroll()
      this._initPic()
    },
    computed: {
      seller () {
        return this.$store.state.seller
      }
    },
    methods: {
      _initScroll () {
        this.$nextTick(() => {
          this.contentScroll = new BScroll(this.$refs.wrapper, {
            click: true
          })
        })
      },
      _initPic () {
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      },
      keepSeller () {
        this.toggleKeep = !this.toggleKeep
      }
    },
    components: {
      'v-star': star,
      support
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .v-star{
    display: inline-block;
  }
  .wrapper{
    position: absolute;
    top: 184px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .content{
      .title{
        font-size: 14px;
        padding-bottom: 8px;
      }
      .border-1px{
        border-bottom: 1px solid rgba(7,17,27,0.1);
      }
      .sell-msg{
        padding: 18px;
        .sell-top{
          display: flex;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          .left{
            flex: 1;
            .sellCount{
              margin-left: 12px;
              font-size: 10px;
              color: rgb(77,85,93);
            }
          }
          .right{
            flex: 0 0 40px;
            width: 40px;
            text-align: center;
            .showKeep{
              color: red;
            }
          }
        }
        .sell-bottom{
          display: flex;
          padding-top: 18px;
          .common{
            font-size: 10px;
            font-weight: 200;
            color: rgb(7,17,27);
          }
          .count{
            font-size: 24px;
            margin-top: 4px;
            span{
              font-weight: 200;
              font-size: 10px;
            }
          }
          div{
            flex: 1;
            text-align: center;
          }
          .minPrice,.deliveryPrice{
            border-right: 1px solid rgba(7,17,27,0.1);
          }
        }
      }
      .sell-content{
        padding: 18px 18px 0 18px;
        .bulletin{
          font-size: 12px;
          font-weight: 200;
          color: rgb(240,20,20);
          line-height: 24px;
          padding: 8px 12px 16px 12px;
          border-bottom: 1px solid rgba(7,17,27,0.1);
        }
      }
      .pics{
        margin: 18px 0 18px 18px;
        .pic-wrapper{
          overflow: hidden;
          width: 100%;
          .pic-list{
            width: 498px;
            .pic-item{
              margin-right: 6px;
              width: 120px;
              height: 90px;
              display: inline-block;
              &:last-child{
                margin: 0;
              }
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .sell-infos{
        padding: 18px;
        li{
          padding: 16px 12px;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          font-size: 12px;
          font-weight: 200;
          color: rgb(7,17,27);
          line-height: 16px;
          &:last-child{
            border-bottom: none;
          }
        }
      }
    }
  }

</style>
