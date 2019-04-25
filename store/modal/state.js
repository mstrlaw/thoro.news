export default () => ({
  dialogState: false,
  clusterArticles: [],
  clusterTweets: [],
  indexPreview: '',
  currentArticleIndex: 0,
  selectedArticle: {
    title: 'Loading main headline...',
    url: 'http://example.com',
    domain: 'loading..',
    matchedWords: []
  },
  selectedCluster: {
    mainTheme: ['']
  },
  clusterTrendData: []
})
