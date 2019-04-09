import moment from 'moment'

export default () => ({
  /*
    AUTH
  */
  auth: {
    type: '',
    token: ''
  },
  userName: '',
  userToken: false,
  userRole: false,
  /*
    UX
  */
  appLoading: true,
  navState: false,
  dialogState: false,
  scrollPosition: 0,
  currentDay: moment().startOf('day').toISOString(),
  dashboardType: 'wall',
  currentCategory: 'world',
  showDashboardActions: true,
  showOrderAction: true,
  showDataActions: true,
  breadcrumbs: false,
  redirectUrl: '',
  /*
    CHARTS
  */
  maxDays: 30,
  /*
    CLUSTER
  */
  sortOption: 'score',
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
