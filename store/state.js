import moment from 'moment'

export default () => ({
  /*
    AUTH
  */
  userName: '',
  userToken: false,
  userRole: false,
  /*
    UX
  */
  appLoading: true,
  navState: false,
  scrollPosition: 0,
  currentDay: moment().subtract(1, 'day').startOf('day').toISOString(),
  dashboardType: 'wall',
  currentCategory: 'world',
  showDashboardActions: true,
  showOrderAction: true,
  showDataActions: true,
  breadcrumbs: false,
  redirectUrl: '',
  sortOption: 'score',
  /*
    CHARTS
  */
  maxDays: 30,
  /*
    CLUSTERS
  */
  clusters: []
})
