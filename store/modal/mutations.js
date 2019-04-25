export default {
  setDialogState(state, value) {
    state.dialogState = value
  },
  setClusterArticles(state, articles) {
    state.clusterArticles = articles
  },
  setClusterTweets(state, tweets) {
    state.clusterTweets = tweets
  },
  setSelectedArticle(state, article) {
    state.selectedArticle = article
  },
  setSelectedCluster(state, cluster) {
    state.selectedCluster = cluster
  },
  setClusterTrendData(state, data) {
    state.clusterTrendData = data
  },
  setCurrentArticleIndex(state, value) {
    state.currentArticleIndex = value
  },
  switchCurrentArticle(state, newArticle) {
    state.selectedArticle = newArticle
  },
  resetSelectedCluster(state) {
    state.selectedCluster = { mainTheme: [''] }
  }
}
