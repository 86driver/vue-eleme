<template>
  <div class="wrapper" ref="wrapper" :class="{'bottom-30':toggleShow}">
    <div class="content">
      <ul>
        <li v-for="(item,index) in items" :key="index" v-show="selectType(item.rateType,item.text)">
          <div>
            <span class="avatar"><img :src="item.avatar" alt=""></span>
          </div>
          <div class="use-msg">
            <div class="username">{{item.username}}</div>
            <div class="date">{{item.rateTime | formatDate}}</div>
            <div>
              <v-star :size="24" :score="item.score" class="v-star"></v-star>
              <span class="deliveryTime" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
            </div>
            <div class="text" v-show="item.text">{{item.text}}</div>
            <div class="recommend">
              <i class="iconfont" :class="icon[item.rateType]"></i>
              <span class="content" v-for="(recommend,index) in item.recommend" :key="index" v-show="item.recommend">{{recommend}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="loading-wrapper" v-show="toggleShow">
      <span v-show="loading" class="loading">
        <img src="../pulldown/loading.gif">
      </span>
      <span v-show="notMore" class="notMore">没有更多数据了</span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import star from '../star/star'
  import {formatDate} from '../../assets/js/date'
  export default {
    name: 'pull',
    data () {
      return {
        items: [],
        // 调用getItem计数
        count: 0,
        toggleShow: false,
        loading: true,
        notMore: false,
        rateType: 100,
        onlyContent: false,
        icon: ['icon-thumb-up', 'icon-thumb-down-outline']
      }
    },
    created () {
      this.$store.dispatch('commitRatings')
      // 初始化this.loadData
      setTimeout(this.loadData, 20)
    },
    computed: {
      ratings () {
        return this.$store.state.ratings
      },
      // 总评论数
      totalRes () {
        let res = []
        this.ratings.forEach((user) => {
          res.push(user)
        })
        return res
      }
    },
    methods: {
      selectType (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.rateType === 100) {
          return true
        } else {
          return type === this.rateType
        }
      },
      getItems (len) {
        if (!this.items.length) {
          this.count = len
          this.items = this.totalRes.slice(0, len)
        } else {
          // slice函数不会截取多余的空白数据
          this.items = this.totalRes.slice(0, this.count + 5)
          this.count += 5
        }
      },
      delay2s () {
        // 模拟加载数据
        if (this.items.length === this.totalRes.length) {
          this.notMore = true
          this.loading = false
          return
        }
        setTimeout(() => {
          this.notMore = false
          this.loading = true
          this.toggleShow = false
          this.loadData()
        }, 1000)
      },
      loadData () {
        this.getItems(5)
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper, {})
            this.scroll.on('touchEnd', (pos) => {
              // 下拉动作 pos.y对应实时纵坐标，copyY对应滑动之前的纵坐标
              if ((pos.y - this.copyY) < -50) {
                this.toggleShow = true
                this.delay2s()
              }
              if ((pos.y - this.copyY) > 50) {
                this.toggleShow = false
              }
              this.copyY = pos.y
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      'v-star': star
    }
  }
</script>

<style lang="less" scoped>
  .v-star{
    display: inline-block;
  }
  .bottom-30{
    bottom: 30px !important
  }
  .wrapper{
    position: fixed;
    top: 440px;
    bottom: 10px;
    overflow: hidden;
    .content{
      li{
        padding: 18px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .avatar{
          float: left;
          display: inline-block;
          width: 28px;
          height: 28px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .use-msg{
          margin-left: 40px;
          .username{
            font-size: 10px;
            color: rgb(7,17,27);
            line-height: 12px;
            display: inline-block;
          }
          .deliveryTime{
            font-size: 10px;
            font-weight: 200;
            color: rgb(147,153,159);
            line-height: 12px;
            vertical-align: text-bottom;
          }
          .text{
            font-size: 12px;
            color: rgb(7,17,27);
            line-height: 18px;
          }
          .date{
            float: right;
          }
          .recommend{
            margin-top: 8px;
            .icon-thumb-up{
              color: rgb(0,160,220);
            }
            .content{
              font-size: 9px;
              color: rgb(147,153,159);
              line-height: 16px;
              display: inline-block;
              padding: 0 12px;
              margin: 0 10px 10px 5px;
              border: 1px solid rgba(7,17,27,0.1);
            }
          }
        }
      }
    }
    .loading-wrapper{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: center;
      .loading{
        display: inline-block;
        width: 20px;
        height: 20px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .notMore{
        display: inline-block;
        line-height: 40px;
        color: rgb(147,153,159);
      }
    }
  }
</style>
