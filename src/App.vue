<template>
  <div id="app">
    <v-header></v-header>
    <div class="main-wrapper">
      <div class="goods-wrapper">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="ratings-wrapper">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="seller-wrapper">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header'
  export default {
    name: 'App',
    components: {
      'v-header': header
    }
  }
</script>

<style lang="less">
  @import './assets/font/iconfont.css';
  .main-wrapper{
    height: 40px;
    line-height: 40px;
    display: flex;
    text-align: center;
    align-items:center;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    .goods-wrapper,.ratings-wrapper,.seller-wrapper{
      flex: 1;
      line-height: 14px;
      font-size: 14px;
      a{
        color: rgb(77,85,93);
        &.active{
          color: rgb(240,20,20);
        }
      }
    }
  }
</style>
