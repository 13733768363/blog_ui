import login from './modules/login'
import blog from './modules/blog'
import tag from './modules/tag'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    blog,
    tag
  }
})