export default {
  dialogState: state => {
    return state.dialogState
  },
  selectedArticle: state => {
    return state.selectedArticle
  },
  selectedCluster: state => {
    return state.selectedCluster
  },
  clusterArticles: state => {
    return state.clusterArticles
  },
  clusterTweets: state => {
    return state.clusterTweets
  },
  clusterTrendData: state => {
    return state.clusterTrendData
  },
  indexPreview: state => {
    return `${state.currentArticleIndex + 1}/${state.clusterArticles.length}`
  }
}
