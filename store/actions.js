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
  saveTopicSortOption({ commit }, option) {
    commit('setTopicSortOption', option)
  },
  // Chart
  saveMaxDays({ commit }, value) {
    commit('setMaxDays', value)
  }
}
