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
  scrollPosition: 0,
  currentDay: moment().startOf('day').toISOString(),
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
  maxDays: 30
})
