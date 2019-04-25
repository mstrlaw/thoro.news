export default {
  /*
   ** User
   */
  setUserName(state, username) {
    state.userName = username
  },
  setUserToken(state, token) {
    state.userToken = token
  },
  setUserRole(state, role) {
    state.userRole = role
  },
  /* Auth */
  logout(state) {
    state.userName = ''
    state.token = false
    state.userRole = false
  },
  /*
    UX
  */
  setNavState(state, value) {
    state.navState = value
  },
  setDialogState(state, value) {
    state.dialogState = value
  },
  setScrollPosition(state, value) {
    state.scrollPosition = value
  },
  setDate(state, value) {
    state.selectedDate = value
  },
  setCurrentCategory(state, value) {
    state.currentCategory = value
  },
  setDashboardType(state, value) {
    state.dashboardType = value
  },
  setDashboardActions(state, value) {
    state.showDashboardActions = value
  },
  setShowOrderAction(state, value) {
    state.showOrderAction = value
  },
  setShowDataActions(state, value) {
    state.showDataActions = value
  },
  setBreadcrumbs(state, value) {
    state.breadcrumbs = value
  },
  setAppLoading(state, value) {
    state.appLoading = value
  },
  setRedirect(state, value) {
    state.redirectUrl = value
  },
  setTopicSortOption(state, option) {
    state.sortOption = option
  },
  /*
    CHARTS
  */
  setMaxDays(state, value) {
    state.maxDays = value
  }
}
