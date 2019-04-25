export default {
  //  Modal dialog
  saveDialogState({ commit }, value) {
    commit('setDialogState', value)
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
  saveClusterTrendData({ commit }, data) {
    commit('setClusterTrendData', data)
  },
  navigateAdjacentArticle({ commit, state }, params) {
    console.log('navigateAdjacentArticle')
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
  }
}
