<template>
  <div class="tool-bar">

    <Menu />

    <div class="inner-section">
      <div class="ux-controls w-100">
        <div class="field">
          <div class="control">
            <nuxt-link
              :to="{ name: 'index' }"
              class="logo"
            >
              <div class="logo-wrapper no-bg">
                <Logo />
              </div>
            </nuxt-link>
          </div>
        </div>
        <a href="" class="button menu-toggle" @click.prevent="toggleMenu">
          <Icon :icon="'menu'" />
          <b>&nbsp;Menu</b>
        </a>

        <div v-if="breadcrumbs">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li
                v-for="breadcrumb in breadcrumbs"
                :key="breadcrumb.name"
                :class="{ 'is-active': breadcrumb.active }"
              >
                <nuxt-link :to="{ name: breadcrumb.name }">{{
                  breadcrumb.label
                }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div v-if="showDashboardActions" class="d-flex push-left-auto">
          <!--div
            :class="{ 'has-addons has-query': hasQueryTerm }"
            class="field search-field"
          >
            <div
              :class="{ 'is-loading': loadingResults }"
              class="control has-icons-left"
            >
              <input
                v-model="searchQuery"
                class="input"
                type="text"
                placeholder="Search"
              />
              <span class="icon is-small is-left">
                <Icon :icon="'magnify'" />
              </span>
            </div>
            <div v-if="hasQueryTerm" class="control">
              <a href="#" class="button" @click.prevent="clearSearch">
                <Icon :icon="'close-circle-outline'" />
              </a>
            </div>
          </div-->

          <!--div class="field has-addons">
            <div class="control">
              <nuxt-link
                :to="{
                  name: 'wall-mainCategory',
                  params: { mainCategory: currentCategory }
                }"
                :active-class="'is-primary'"
                :class="['button', { 'is-primary': homeOrWall() }]"
                title="Change to dashboard view"
              >
                <span class="icon is-small">
                  <Icon :icon="'view-dashboard'" />
                </span>
              </nuxt-link>
            </div>
            <div class="control">
              <nuxt-link
                :to="{
                  name: 'trends-mainCategory',
                  params: { mainCategory: currentCategory }
                }"
                :active-class="'is-primary'"
                class="button"
                title="Change to cluster view"
              >
                <span class="icon is-small">
                  <Icon :icon="'view-stream'" />
                </span>
              </nuxt-link>
            </div>
            <div class="control">
              <nuxt-link
                :to="{
                  name: 'realtime-mainCategory',
                  params: { mainCategory: currentCategory }
                }"
                :active-class="'is-primary'"
                class="button"
                title="Change to real-time view"
              >
                <span class="icon is-small">
                  <Icon :icon="'flash-circle'" />
                </span>
              </nuxt-link>
            </div>
          </div-->

          <div
            v-if="showOrderAction"
            :class="{ 'is-active': openFilter }"
            class="dropdown is-right"
          >
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                title="Change order"
                @click.prevent="toggleOrderFilter"
              >
                <span class="icon is-small">
                  <Icon :icon="'filter-variant'" />
                </span>
              </button>
            </div>
            <div id="dropdown-menu" class="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a
                  :class="{ 'is-active': isActiveFilter('score') }"
                  href="#"
                  class="dropdown-item"
                  title="Order by hottest topics"
                  @click.prevent="changeSort('score')"
                >
                  <Icon :icon="'fire'" />&nbsp;Hottest
                </a>

                <a
                  :class="{ 'is-active': isActiveFilter('lastArticleDate') }"
                  href="#"
                  class="dropdown-item"
                  title="Order by latest/trending topics"
                  @click.prevent="changeSort('lastArticleDate')"
                >
                  <Icon :icon="'clock-outline'" />&nbsp;Latest
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <NavigationResults
      :search-query="searchQuery"
      :search-results="searchResults"
      :empty-results="emptyResults"
    />
  </div>
</template>

<script>
import moment from 'moment'
import Menu from '@/components/navigation/Menu'
import NavigationResults from '@/components/navigation/NavigationResults'
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
const debounceTimout = 300

export default {
  name: 'Navigation',
  components: {
    Menu,
    NavigationResults
  },
  data() {
    return {
      date: moment().format('DD MMM \'YY'),
      openFilter: false,
      loadingResults: false,
      emptyResults: false,
      searchQuery: '',
      searchResults: []
    }
  },
  computed: {
    ...mapGetters({
      sortOption: 'topicSortOption',
      currentCategory: 'currentCategory',
      showDashboardActions: 'showDashboardActions',
      showOrderAction: 'showOrderAction',
      showDataActions: 'showDataActions',
      breadcrumbs: 'breadcrumbs'
    }),
    isActive() {
      return this.$store.getters.navigationState
    },
    currentDate() {
      return moment(this.$store.getters.currentDay).format('MMM. Do, YYYY')
    },
    hasQueryTerm() {
      return this.searchQuery.length > 0
    }
  },
  watch: {
    searchQuery() {
      if (this.searchQuery.trim().length > 0) {
        this.performSearch(this.searchQuery.trim())
      } else {
        this.clearSearch()
      }
    }
  },
  methods: {
    homeOrWall() {
      return (
        this.$router.currentRoute.name === 'wall-mainCategory' ||
        this.$router.currentRoute.name === 'index'
      )
    },
    toggleMenu() {
      this.$store.dispatch('setNavigationState', !this.isActive)
    },
    toggleOrderFilter() {
      this.openFilter = !this.openFilter
    },
    changeSort(sortOption) {
      this.$store.dispatch('saveTopicSortOption', sortOption)
      this.toggleOrderFilter()
      window.scrollTo(0, this.scrollPos)
    },
    isActiveFilter(sortOption) {
      return this.$store.getters.topicSortOption === sortOption
    },
    clearSearch() {
      this.loadingResults = false
      this.emptyResults = false
      this.searchQuery = ''
      this.searchResults = []
    },
    performSearch: debounce(function (query) {
      if (query.length > 2) {
        this.loadingResults = true
        this.$store.dispatch('api/searchArticle', { query: query }).then(res => {
          this.loadingResults = false
          document.getElementById('searchResults').scrollTo(0, 0)

          if (res.data.length > 0) {
            this.emptyResults = false
            this.searchResults = res.data
          } else {
            this.emptyResults = true
          }
        })
      }
    }, debounceTimout)
  }
}
</script>
