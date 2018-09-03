<template>
    <div class="goods-wrapper">
      <div class="goods-nav" ref="navWrapper">
        <ul>
          <li v-for="(goodsName, index) in goods" :key="index" ref="navList" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
            <span>{{goodsName.name}}</span>
          </li>
        </ul>
      </div>
      <div class="goods-content" ref="contentWrapper">
        <ul>
          <li v-for="(foodSort, index) in goods" :key="index" ref="foodList">
            <h1 class="foodSort">{{foodSort.name}}</h1>
            <ul>
              <li v-for="(food, index) in foodSort.foods" :key="index" class="food" @click.stop="showFood(food)">
                <div class="food-content">
                  <div class="content-left">
                    <span class="food-icon">
                      <img :src="food.icon">
                    </span>
                  </div>
                  <div class="content-right">
                    <div class="food-title">{{food.name}}</div>
                    <div class="food-description" v-if="food.description">
                      <span>{{food.description}}</span>
                    </div>
                    <div class="sell-msg">
                      <span>月售{{food.sellCount}}份</span>
                      <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="new-price">￥{{food.price}}</span>
                      <span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                  </div>
                </div>
                <div class="cart-control">
                  <cartControl @add='addFood' :food="food"></cartControl>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopCart ref="shopCart"></shopCart>
      <food ref="food" :food="selectedFood" @add="addFood"></food>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopCart from '../shopcart/shopcart'
  import cartControl from '../cartcontrol/cartcontrol'
  import food from '../food/food'
  export default {
    name: 'goods',
    data () {
      return {
        foods: [],
        // 存放右侧外层li的高度
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    created () {
      this.$store.dispatch('commitGoods')
      this.$nextTick(() => {
        this._initScroll()
        // 因为ref是在渲染之后出现，所以这里用一个setTimeout等待dom渲染结束
        setTimeout(this._calculateHeight, 20)
      })
    },
    computed: {
      goods () {
        return this.$store.state.goods
      },
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          this._followScroll(i)
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    methods: {
      addFood (target) {
        this._drop(target)
      },
      _drop (target) {
        this.$refs.shopCart.drop(target)
      },
      selectMenu (index, event) {
        // 左右联动右边
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodList
        let el = foodList[index]
        this.contentScroll.scrollToElement(el, 300)
      },
      _followScroll (index) {
        // 右边联动左边
        let navList = this.$refs.navList
        let el = navList[index]
        this.navScroll.scrollToElement(el, 300, 0, -100)
      },
      _initScroll () {
        // 不能直接写 new BSscroll() 因为Eslint会报错
        this.navScroll = new BScroll(this.$refs.navWrapper, {
          click: true
        })
        this.contentScroll = new BScroll(this.$refs.contentWrapper, {
/*        better-scroll初始化的时候会 preventDefault 阻止默认行为，
          声明click为true,表示映射一个点击，这里注意点击在非移动端会有两次点击,
          解决办法 在dom中绑定事件@click=‘selectMenu($index,$ event)’传入event,
          非移动端下event没有_constructed属性 */
          click: true,
          // 实时监测当前滚动高度
          probeType: 3
        })
        // 监听this.contentScroll滚动事件，判断所处滚动高度
        this.contentScroll.on('scroll', (pos) => {
          // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y))
          }
        })
      },
      // 计算每个内层li的高度并存入listHeight
      _calculateHeight () {
        let foodList = this.$refs.foodList
        let height = 0
        // 滚动到顶端，也就是height == 0 的时候
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      showFood (food) {
        // 显示food组件内容
        this.$refs.food.showFood = true
        this.selectedFood = food
      }
    },
    components: {
      shopCart,
      cartControl,
      food
    }
  }
</script>

<style lang="less" scoped>
  .goods-wrapper{
    width: 100%;
    display: flex;
    position: absolute;
    top: 184px;
    bottom: 46px;
    overflow: hidden;
    .goods-nav{
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
      li{
        width: 56px;
        padding: 0 12px;
        height: 54px;
        line-height: 54px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        span{
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
          color: rgb(77,85,93);
          font-weight: 400;
          line-height: 14px;
        }
      }
      .current{
        background-color: #fff;
        span{
          font-weight: 700;
          color: rgb(226, 122, 122);
        }
      }
    }
    .goods-content{
      flex: 1;
      .foodSort{
        padding-left: 14px;
        background-color: #f3f5f7;
        font-size: 12px;
        line-height: 26px;
        color: rgb(147,153,159);
        border-left: 2px solid #d9dde1;
      }
      .food{
        position: relative;
        margin: 9px 18px 9px 18px;
        padding: 9px 0;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .food-content{
          display: flex;
          .content-left{
            flex: 0 0 57px;
            width: 57px;
            .food-icon{
              display: inline-block;
              width: 57px;
              height: 57px;
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
          .content-right{
            flex: 1;
            margin: 2px 0 0 10px;
            .food-title{
              font-size: 14px;
              color: rgb(7,17,27);
              line-height: 14px;
              font-weight: 700;
              margin-bottom: 8px;
            }
            .food-description,.sell-msg{
              font-size: 10px;
              color: rgb(147,157,159);
              line-height: 10px;
              margin-bottom: 8px;
            }
            .sell-msg{
              span{
                margin-right: 12px;
              }
            }
            .price{
              line-height: 24px;
              font-weight: 700;
              .new-price{
                font-size: 14px;
                color: red;
              }
              .old-price{
                font-size: 10px;
                color: rgb(147,153,159);
                text-decoration:line-through;
              }
            }
          }
        }
        .cart-control{
          position: absolute;
          right: 0;
          bottom: 4px;
          font-size: 10px;
          display: table;
          line-height: 24px;
        }
      }
    }
  }
</style>
