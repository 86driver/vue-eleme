<template>
  <!-- 因为vue生命周期的加载问题，所以这里设置一个v-if -->
  <div class="box" v-if="sellerSupports">
    <ul :class="{ animate:animate }">
      <li v-for="(item,index) in initSupports" :key='index'>
        <span class="activityIcon" :class="iconMap[item.type]"></span>
        <span class="description">{{item.description}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'scroll',
    data () {
      return {
        iconMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        // css3动画开关
        animate: false
      }
    },
    created () {
      // 分发vuex的action方法
      this.$store.dispatch('commitSeller')
      setInterval(this.scroll, 2500)
    },
    computed: {
      /* 深拷贝从vuex传过来的数据
         原因：
              因为在 JavaScript 中对象和数组是通过引用传入的，
              所以对于一个数组或对象类型来说，
              在子组件中改变这个对象或数组本身将会影响到父组件的状态 */
      sellerSupports () {
        // 获取vuex state中的数据
        return this.$store.state.seller.supports
      },
      initSupports () {
        // 深拷贝数组
        let privateSupports = this.sellerSupports.slice(0)
        return privateSupports
      }
    },
    methods: {
      scroll () {
        this.animate = true
        setTimeout(() => {
          // 上下轮播
          this.initSupports.push(this.initSupports[0])
          this.initSupports.shift()
          this.animate = false
        }, 500)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/min.less';
  .box{
    height: 18px;
    overflow: hidden;
    position: relative;
    ul{
      li{
        height: 18px;
        .activityIcon{
          display: inline-block;
          background-size: 12px 12px;
          width: 12px;
          height: 12px;
          vertical-align: top;
        }
        .description{
          display: inline-block;
          vertical-align: top;
        }
      }
    }
  }
  .animate{
    transition: all 0.5s;
    margin-top: -18px;
  }
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
  .roll{
    transition: 1s ease;
  }
  .rollStop{
    transition: 0.1s;
  }
</style>
