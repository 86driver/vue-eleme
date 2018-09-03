<template>
    <div class="cart-control">
      <transition name="move">
        <!-- decreaseCount方法需要阻止冒泡，否则会和 toggleSelectFoods方法事件冲突-->
        <div class="count-decrease" @click.stop="decreaseCount" v-show="food.count>0">
          <i class="iconfont icon-jian"></i>
        </div>
      </transition>
      <div class="count" v-show="food.count">{{food.count}}</div>
      <!-- addCount方法需要阻止冒泡，否则会和 toggleSelectFoods方法事件冲突-->
      <div class="count-add" @click.stop="addCount">
        <i class="iconfont icon-addition"></i>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  export default {
      name: 'cartControl',
      props: {
        food: {
          type: Object
        }
      },
      methods: {
        addCount (event) {
          // 设置是否选择商品标志，以供selectFoods使用
          Vue.set(this.food, 'selectFlag', true)
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1)
          } else {
            this.food.count++
          }
          this.$emit('add', event.target)
        },
        decreaseCount () {
          this.food.count--
          if (this.food.count === 0) {
            this.food.selectFlag = false
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  .cart-control{
    .iconfont{
      color: dodgerblue;
    }
    .count-decrease{
      display: table-cell;
      vertical-align: middle;
      &.move-enter-active, &.move-leave-active{
        transition: all 0.4s linear;
        opacity: 1;
      }
      &.move-enter, &.move-leave-active{
        opacity: 0;
        transform: translate3d(24px, 0, 0);
      }
    }
    .count{
      padding: 0 12px;
      color: rgb(147,157,159);
      display: table-cell;
      vertical-align: middle;
    }
    .count-add{
      display: table-cell;
      vertical-align: middle;
    }
  }
</style>
