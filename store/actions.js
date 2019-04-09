/* eslint-disable no-empty-pattern, no-return-await */

const serialize = options => {
  let str = ''
  for (const k in options) {
    if (str !== '') {
      str += '&'
    }
    str += k + '=' + encodeURIComponent(options[k])
  }
  return str
}

export default {
  /**
    * Store app auth state
  **/
  updateAuth({ commit }, data) {
    commit('setAuth', data)
  },
  /**
    * UX/APP States & Data
  **/
  //  App
  saveScrollPosition({ commit }, value) {
    commit('setScrollPosition', value)
  },
  changeSelectedDate({ commit }, value) {
    commit('setDate', value)
  },
  saveCurrentCategory({ commit }, value) {
    commit('setCurrentCategory', value)
  },
  saveDashboardType({ commit }, value) {
    commit('setDashboardType', value)
  },
  //  Navigation
  setNavigationState({ commit }, value) {
    commit('setNavState', value)
  },
  //  Modal dialog
  setDialogState({ commit }, value) {
    commit('setDialogState', value)
  },
  saveTopicSortOption({ commit }, option) {
    commit('setTopicSortOption', option)
  },
  saveClusterArticles({ commit }, articles) {
    commit('setClusterArticles', articles)
  },
  saveSelectedCluster({ commit }, data) {
    commit('setSelectedCluster', data)
  },
  saveClusterTweets({ commit }, tweets) {
    commit('setClusterTweets', tweets)
  },
  saveSelectedArticle({ commit, state }, article) {
    const currentIndex = state.clusterArticles.findIndex(item => {
      return item._id === article._id
    })
    commit('setCurrentArticleIndex', currentIndex)
    commit('setSelectedArticle', article)
  },
  setClusterTrendData({ commit }, data) {
    commit('setClusterTrendData', data)
  },
  navigateAdjacentArticle({ commit, state }, params) {
    const currentIndex = state.clusterArticles.findIndex(article => {
      return article._id === params.currentArticleId
    })

    if (params.direction === 'prev') {
      const newIndex = currentIndex - 1
      if (newIndex >= 0) {
        commit('switchCurrentArticle', state.clusterArticles[newIndex])
        commit('setCurrentArticleIndex', newIndex)
      }
    }
    if (params.direction === 'next') {
      const newIndex = currentIndex + 1
      if (newIndex < state.clusterArticles.length) {
        commit('switchCurrentArticle', state.clusterArticles[newIndex])
        commit('setCurrentArticleIndex', newIndex)
      }
    }
    return state.sortOption
  },
  // Chart
  saveMaxDays({ commit }, value) {
    commit('setMaxDays', value)
  },
  /**
    API CALLS
  **/
  // Articles
  async GET_ARTICLE({ getters }, { articleId, options }) {
    let url = `${process.env.API_ENDPOINT}/api/article/${articleId}`
    if (options) {
      url += '?' + serialize(options)
    }
    return await this.$axios.get(url, {
      headers: { Authorization: `${getters.auth.type} ${getters.auth.token}` }
    })
  },
  // Topics
  async GET_TOPICS({ getters }, data) {
    const d = data.date
    const t = data.topic === 'world' ? 'all' : data.topic
    const s = typeof data.subtopic === 'undefined' ? 'all' : data.subtopic
    const o = JSON.stringify(data.options)

    return await this.$axios.get(
      `${process.env.API_ENDPOINT}/api/topics/${d}/${t}/${s}/${o}`,
      {
        headers: { Authorization: `${getters.auth.type} ${getters.auth.token}` }
      }
    )
  },
  async GET_TOPIC_DATA({ getters }, data) {
    const topic = data.topic
    // let t = (data.topic === 'world' ? 'all' : data.topic)
    const o = JSON.stringify(data.options)
    return await this.$axios.get(
      `${process.env.API_ENDPOINT}/api/stats/frequency/${topic}/${o}`,
      {
        headers: { Authorization: `${getters.auth.type} ${getters.auth.token}` }
      }
    )
  },
  // Crypto
  async GET_CRYPTO_QUOTE({}, symbol) {
    const url = `https://coincap.io/page/${symbol}`
    return await this.$axios.$get(url)
  },
  // Twitter
  async GET_TWEETS({ getters }, queryParam) {
    const url = `${process.env.API_ENDPOINT}/api/tweets/${queryParam}`
    return await this.$axios.get(url, {
      headers: { Authorization: `${getters.auth.type} ${getters.auth.token}` }
    })
  },
  // Search
  async searchArticle({ getters }, { query, options }) {
    let url = `${process.env.API_ENDPOINT}/api/search/${query}`
    // console.log('options')
    // console.log(options)
    if (options) {
      url += '?' + serialize(options)
    }
    // console.log(url)
    return await this.$axios.$get(url, {
      headers: { Authorization: `${getters.auth.type} ${getters.auth.token}` }
    })
  }
}
