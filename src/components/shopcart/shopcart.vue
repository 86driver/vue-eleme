<template>
  <div class="shopCart" @click="toggleSelectFoods">
    <div class="left">
      <div class="left-1">
        <div class="logo">
          <span :class="{'highLight':totalCount>0}"><i class="iconfont icon-gouwuche"></i></span>
        </div>
        <div class="total-count" v-show="totalCount>0">{{totalCount}}</div>
        <span class="price" :class="{'whiteColor':totalPrice>0}">￥{{totalPrice}}</span>
      </div>
      <div class="left-2">另需配送费￥{{seller.deliveryPrice}}元</div>
    </div>
    <!-- pay方法需要阻止冒泡，否则会和 toggleSelectFoods方法事件冲突-->
    <div class="right" :class="{'pay':totalPrice>=20}" @click.stop="pay">
      <span>{{payDesc}}</span>
    </div>
    <div class="ball-wrapper">
      <div v-for="(ball,index) in balls" :key="index">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="food">
        <div class="select-food-wrapper" v-show="showSelect">
          <div class="select-food-content">
            <div class="title">
              <span>购物车</span>
              <span @click="clearFoods">清空</span>
            </div>
            <ul class="list-food">
              <!-- v-show使用food.count配合clearFoods实现无选择商品隐藏列表 -->
              <li v-for="(food,index) in selectFoods" :key="index" v-show="food.count>0">
                <div class="food-name">{{food.name}}</div>
                <div class="food-price">￥{{food.count * food.price}}</div>
                <div class="cart-control">
                  <cartControl @add="addFood" :food="food"></cartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    <transition name="cover">
      <div class="bgCover" v-show="showSelect"></div>
    </transition>
  </div>
</template>

<script>
  import cartControl from '../cartcontrol/cartcontrol'
  export default {
    name: 'shopCart',
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        showSelect: false
      }
    },
    created () {
      this.$store.dispatch('commitSeller')
      this.$store.dispatch('commitGoods')
    },
    computed: {
      goods () {
        return this.$store.state.goods
      },
      seller () {
        return this.$store.state.seller
      },
      totalCount () {
        let count = 0
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              count += food.count
            }
          })
        })
        return count
      },
      totalPrice () {
        let price = 0
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              price += food.count * food.price
            }
          })
        })
        return price
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥20元起送`
        } else if (this.totalPrice < this.seller.minPrice) {
          let diff = 20 - this.totalPrice
          return `还差￥${diff}起送`
        } else {
          return `去结算`
        }
      },
      selectFoods () {
        let selectFoods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.selectFlag === true) {
              selectFoods.push(food)
            }
          })
        })
        return selectFoods
      }
    },
    methods: {
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            // 把cartcontrol组件对应dom传给ball.el
            ball.el = el
            // 使用dropBalls保存dom(用来获取其位置)
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop (el) {
       let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            // ball.el指向dropBalls，rect获取cartcontrol对应dom
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 42
            let y = -(window.innerHeight - rect.top - 25)
            el.style.display = ''
            // 初始化ball位置
            // 外层控制ball垂直方向
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            // 内层控制ball水平方向
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropping (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterDrop (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleSelectFoods () {
        if (this.totalCount > 0) {
          this.showSelect = !this.showSelect
        } else {
          this.showSelect = false
        }
      },
      clearFoods () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      addFood (target) {
        this.drop(target)
      },
      pay () {
        alert('一共' + this.totalPrice + '元')
      }
    },
    components: {
      cartControl
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/min.less';
  .shopCart {
    z-index: 2;
    display: flex;
    width: 100%;
    height: 48px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #141d27;
    .left {
      flex: 1;
      background-color: #141d27;
      .left-1 {
        display: inline-block;
        position: relative;
        .logo {
          position: fixed;
          left: 12px;
          bottom: 0;
          border-radius: 50%;
          width: 58px;
          height: 58px;
          background-color: #141d27;
          span {
            position: fixed;
            left: 18px;
            bottom: 8px;
            border-radius: 50%;
            color: #000;
            width: 44px;
            height: 44px;
            background-color: #2e3946;
            line-height: 44px;
            text-align: center;
            i {
              font-size: 24px;
            }
          }
          .highLight{
            background-color: rgb(0,160,220);
            color: #fff;
          }
        }
        .total-count{
          position: absolute;
          top: -10px;
          left: 50px;
          width: 24px;
          height: 16px;
          background-color: rgb(240,20,20);
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
          border-radius: 10px;
          line-height: 16px;
          text-align: center;
          color: #fff;
          font-weight: 700;
        }
        .price {
          display: inline-block;
          width: 40px;
          margin-left: 80px;
          line-height: 48px;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 700;
        }
        .whiteColor{
          color: #fff;
        }
      }
      .left-2 {
        margin-left: 15px;
        display: inline-block;
        height: 30px;
        line-height: 48px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
      }
    }
    .right {
      flex: 0 0 105px;
      width: 105px;
      background-color: #2e3946;
      line-height: 48px;
      text-align: center;
      span {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
      }
    }
    .pay{
      background-color: green;
      span{
        color: #fff;
      }
    }
    .ball-wrapper{
      .ball{
        position: fixed;
        left: 42px;
        bottom: 25px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
    .select-food-wrapper{
      z-index: -1;
      width: 100%;
      left: 0;
      bottom: 48px;
      position: fixed;
      overflow: auto;
      // 这里不需要用betterScroll 用一个max-height就可以实现
      max-height: 305px;
      background-color: #fff;
      &.food-enter,&.food-leave-to{
        transform: translateY(305px);
      }
      &.food-enter-active,&.food-leave-active{
        transition: all .4s;
      }
      .select-food-content{
        .title{
          padding: 0 18px;
          background-color: #f3f5f7;
          font-weight: 200;
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          span:nth-child(1){
            float: left;
            font-size: 14px;
            color: rgb(7,17,27);
          }
          span:nth-child(2){
            float: right;
            font-size: 12px;
            color: rgb(0,160,220);
          }
        }
        .list-food{
          padding: 0 18px;
          li{
            position: relative;
            height: 48px;
            line-height: 48px;
            border-bottom: 1px solid rgba(7,17,27,0.1);
            display: flex;
            .food-name{
              flex: 0 0 220px;
              width: 220px;
              font-size: 14px;
              color: rgb(7,17,27);
            }
            .food-price{
              flex: 1;
              font-size: 14px;
              color: rgb(240,20,20);
              font-weight: 700;
            }
            .cart-control{
              position: absolute;
              right: 0;
              bottom: 0;
              display: table;
              line-height: 48px;
            }
          }
        }
      }
    }
    .bgCover{
      z-index: -2;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(7,17,27,0.6);
      &.cover-enter,&.cover-leave-to{
        opacity: 0;
        background: rgba(7, 17, 27, 0);
      }
      &.cover-enter-active,&.cover-leave-active{
        opacity: 1;
        transition: all .4s linear;
      }
    }
  }
</style>
