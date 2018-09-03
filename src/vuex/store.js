import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const ERR_OK = 0 // 返回状态
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    seller: {},
    goods: [],
    ratings: []
  },
  mutations: {
    getSeller (state, response) {
      state.seller = response
    },
    getGoods (state, response) {
      state.goods = response
    },
    getRatings (state, response) {
      state.ratings = response
    }
  },
  actions: {
    commitSeller ({commit}) {
      axios.get('/api/seller')
        .then(response => {
          if (response.data.errno === ERR_OK) {
            commit('getSeller', response.data.data)
          }
        })
        .catch(function (error) {
          if (error) {
            alert('网络出错！')
          }
        })
    },
    commitGoods ({commit}) {
      axios.get('/api/goods')
        .then(response => {
          if (response.data.errno === ERR_OK) {
            commit('getGoods', response.data.data)
          }
        })
        .catch(function (error) {
          if (error) {
            alert('网络出错！')
          }
        })
    },
    commitRatings ({commit}) {
      axios.get('/api/ratings')
        .then(response => {
          if (response.data.errno === ERR_OK) {
            commit('getRatings', response.data.data)
          }
        })
        .catch(function (error) {
          if (error) {
            alert('网络出错！')
          }
        })
    }
  }
})
