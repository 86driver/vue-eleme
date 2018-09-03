<template>
  <div class="star-wrapper" :class="starType">
    <div v-if="score">
      <!-- 全星个数 -->
      <span v-for="(star,index) in scoreStar" :key="index" class="star span-common"></span>
      <!-- 是否显示半星 -->
      <span :class="{starHalf:starHalf}" v-if="starHalf" class="span-common"></span>
      <!-- 是否显示黑色星星 -->
      <span v-if="starOff">
        <span class="span-common" v-for="(star,index) in starOff" :key="index" :class="{starOff: starOff}"></span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'star',
    props: {
      score: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      scoreStar () {
        // 返回全星个数
        return Math.floor(this.score)
      },
      starHalf () {
        // 是否显示半星
        let decimal = this.score * 10 % 10
        if (decimal >= 5) {
          return true
        } else {
          return false
        }
      },
      starOff () {
        // 显示黑色星星个数,减去0.1的原因是避免出现4.5分的情况出现一个黑星星
        let rest = Math.round(5 - this.score - 0.1)
        return rest
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/min.less';
  .star-48{
    .span-common{
      display: inline-block;
      background-size: 20px 20px;
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .star{
      .bg-image('star48_on');
    }
    .starHalf{
      display: inline-block;
      .bg-image('star48_half');
    }
    .starOff{
      .bg-image('star48_off');
    }
  }
  .star-36{
    vertical-align: text-top;
    .span-common{
      display: inline-block;
      background-size: 15px 15px;
      width: 15px;
      height: 15px;
      margin-right: 3px;
    }
    .star{
      .bg-image('star36_on');
    }
    .starHalf{
      .bg-image('star36_half');
    }
    .starOff{
      .bg-image('star36_off');
    }
  }
  .star-24{
    vertical-align: text-top;
    .span-common{
      display: inline-block;
      background-size: 10px 10px;
      width: 10px;
      height: 10px;
      margin-right: 3px;
    }
    .star{
      .bg-image('star24_on');
    }
    .starHalf{
      .bg-image('star24_half');
    }
    .starOff{
      .bg-image('star24_off');
    }
  }
</style>
