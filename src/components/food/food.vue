<template>
  <transition name="food">
    <div class="food" v-show="showFood" ref="food">
      <div class="food-content">
        <div class="remove" @click="remove">
          <i class="iconfont icon-xiangzuojiantou"></i>
        </div>
        <div class="food-image">
          <img :src="food.image">
        </div>
        <div class="description">
          <div class="name">{{food.name}}</div>
          <div class="sales">
            <span>月售{{food.sellCount}}份</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span>￥{{food.price}}</span>
            <span v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartControl-wrapper">
            <cartControl @add="addFood" :food="food"></cartControl>
          </div>
          <transition name="fade">
            <div class="cart-shop" @click="addFirst" v-show="!food.count || food.count===0">
              <span>加入购物车</span>
            </div>
          </transition>
        </div>
        <div class="line"></div>
        <div class="info" v-if="food.info">
          <div class="info-title">商品介绍</div>
          <span>{{food.info}}</span>
        </div>
        <div class="line" v-if="food.info"></div>
        <ratingselect :selectType="selectType" @complaints="complaints" @recommend="recommend" @all="all" @toggleContent="toggleContent">
          <div class="rating-title">商品评价</div>
        </ratingselect>
        <div>
          <ul v-if="food.ratings && food.ratings.length">
            <li class="rating-msg" v-for="(rating,index) in ratings" :key="index" v-show="select(rating.rateType,rating.text)">
              <div>
                <span class="time">{{rating.rateTime | formatDate}}</span>
                <div class="user">
                  <span class="username">{{rating.username}}</span>
                  <span class="avatar"><img :src="rating.avatar"></span>
                </div>
              </div>
              <div class="text">
                <i class="iconfont" :class="icon[rating.rateType]"></i>
                <span class="text-content">{{rating.text}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import cartControl from '../cartcontrol/cartcontrol'
  import ratingselect from '../ratingselect/ratingselect'
  import {formatDate} from '../../assets/js/date'
  export default {
    name: 'food',
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFood: false,
        rateType: 100,
        onlyContent: false,
        selectType: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        // icon-thumb-up：rateType===0, icon-thumb-down-outline：rateType===1
        icon: ['icon-thumb-up', 'icon-thumb-down-outline']
      }
    },
    created () {
      this.$nextTick(() => {
        this.initScroll()
      })
    },
    computed: {
      ratings () {
        return this.food.ratings
      }
    },
    methods: {
      select (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.rateType === 100) {
          return true
        } else {
          return type === this.rateType
        }
      },
      remove () {
        this.showFood = false
      },
      initScroll () {
        this.foodScroll = new BScroll(this.$refs.food, {
          click: true
        })
      },
      addFirst (event) {
        Vue.set(this.food, 'selectFlag', true)
        this.$emit('add', event.target)
        Vue.set(this.food, 'count', 1)
      },
      addFood (target) {
        this.$emit('add', target)
      },
      all () {
        // 没有定义rateType = 100  这里设置为100意味着选择全部
        this.rateType = 100
      },
      recommend () {
        // 查看推荐评价
        this.rateType = 0
      },
      complaints () {
        // 查看吐槽评价
        this.rateType = 1
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent
      }
    },
    components: {
      cartControl,
      ratingselect
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/base";
  .food{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    width: 100%;
    background-color: #fff;
    transform: translate3d(0,0,0);
    &.food-enter,&.food-leave-active{
      transform: translate3d(100%,0,0);
    }
    &.food-enter-active,&.food-leave-active{
      transition: all .4s linear;
    }
    .food-content{
      .remove{
        position: fixed;
        top: 20px;
        left: 0;
        width: 48px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        i{
          font-size: 20px;
          color: #fff;
          background-color: gray;
          border-radius: 50%;
          line-height: 27px;
          width: 28px;
          height: 28px;
          display: inline-block;
        }
      }
      .food-image{
        width: 100%;
        height: 375px;
        img{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      .description{
        width: 100%;
        position: relative;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        padding-bottom: 18px;
        .name{
          margin: 18px 0 0 18px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7,7,27);
          line-height: 14px;
        }
        .sales{
          margin: 8px 0 0 18px;
          font-size: 10px;
          color: rgb(147,153,159);
          line-height: 20px;
          span:nth-child(1){
            margin-right: 12px;
          }
        }
        .price{
          margin: 18px 0 0 18px;
          font-weight: 700;
          line-height: 24px;
          span:nth-child(1){
            font-size: 14px;
            color: rgb(240,20,20);
          }
          span:nth-child(2){
            font-size: 10px;
            color: rgb(147,153,159);
            text-decoration:line-through;
          }
        }
        .cartControl-wrapper{
          position: absolute;
          right: 25px;
          bottom: 20px;
        }
        .cart-shop{
          &.fade-enter-active,&.fade-leave-active{
            opacity: 1;
            transition: all .5s;
          }
          &.fade-enter,&.fade-leave-to{
            opacity: 0;
            transition: all .5s;
          }
          position: absolute;
          bottom: 18px;
          right: 18px;
          height: 24px;
          line-height: 24px;
          width: 74px;
          border-radius: 12px;
          background-color: rgb(0,160,220);
          text-align: center;
          padding: 12px 6px;
          span{
            font-size: 10px;
            color: #fff;
            line-height: 12px;
          }
        }
      }
      .info{
        margin: 18px;
        .info-title{}
        font-size: 14px;
        line-height: 14px;
        color: rgb(7,17,27);
        span{
          margin: 6px 8px;
          font-size: 12px;
          font-weight: 200;
          color: rgb(77,85,93);
          line-height: 24px;
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
    }
  }
</style>
