import moment from 'moment'

export default {
  /*
    AUTH
  */
  auth: state => {
    return state.auth
  },
  userRole: state => {
    return state.auth.role
  },
  username: state => {
    return state.auth.username
  },
  isAdmin: state => {
    return state.auth.role === 'admin'
  },
  isUser: state => {
    return state.auth.role === 'user'
  },
  /*
    UX
  */
  navigationState: state => {
    return state.navState
  },
  dialogState: state => {
    return state.dialogState
  },
  scrollPosition: state => {
    return state.scrollPosition
  },
  currentDay: state => {
    return state.currentDay
  },
  selectedDate: state => {
    return moment(state.currentDay)
      .startOf('day')
      .format('YYYY-MM-DD')
  },
  currentCategory: state => {
    return state.currentCategory
  },
  currentDashboard: state => {
    return state.dashboardType
  },
  showDashboardActions: state => {
    return state.showDashboardActions
  },
  showOrderAction: state => {
    return state.showOrderAction
  },
  showDataActions: state => {
    return state.showDataActions
  },
  breadcrumbs: state => {
    return state.breadcrumbs
  },
  appLoading: state => {
    return state.appLoading
  },
  redirectUrl: state => {
    return state.redirectUrl
  },
  /*
    CHARTS
  */
  maxDays: state => {
    return state.maxDays
  },
  /*
    CLUSTER
  */
  topicSortOption: state => {
    return state.sortOption
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
