import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import actions from '@/store/actions'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import state from '@/store/state'

let store = new Vuex.Store({
  actions: actions,
  getters: getters,
  mutations: mutations,
  state: state
})

//  Bind axios to Store as we don't have access to Nuxt's $axios module here
store.$axios = axios

//  Set the auth token (pre-generated). TODO: find a way to improve this
store.commit('setAuth', {
  type: 'Bearer',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJhcGkiLCJpYXQiOjE1NTQyOTYzNjMsImV4cCI6MTU1Njg4ODM2M30.ggOYoLDoC5bf0vDHdo8Xqu42aFy25GBu5AFySUsWJmY'
})

export default store
