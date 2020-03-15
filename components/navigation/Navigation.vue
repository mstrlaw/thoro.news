<template>
  <div :class="navigationClassObject">
    <Menu />
    <div class="c-Navigation__innerSection">
      <nuxt-link
        v-if="!isMobile"
        :to="{ name: 'index' }"
        class="logo"
      >
        <div class="c-Navigation__logo">
          <Logo />
        </div>
      </nuxt-link>

      <a
        href="#"
        class="button menu-toggle"
        @click.prevent="toggleMenu"
      >
        <Icon :icon="'menu'" />
        <b>&nbsp;Sections</b>
      </a>

      <nuxt-link
        v-if="isMobile"
        :to="{ name: 'index' }"
        class="logo"
      >
        <div class="c-Navigation__logo">
          <Logo />
        </div>
      </nuxt-link>

      <div class="c-Navigation__rightSection">
        <div
          v-if="showOrderAction"
          :class="{
            'is-active': openFilter,
            'is-right': !isMobile
          }"
          class="dropdown"
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

      <!--div class="ux-controls w-100">
        <div class="field">
          <div class="control">

          </div>
        </div>

        <div v-if="showDashboardActions" class="d-flex push-left-auto">
          <div
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
          </div>

          <div class="field has-addons">
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
          </div>

        </div>
      </div-->
    </div>

    <NavigationResults
      :search-query="searchQuery"
      :search-results="searchResults"
      :empty-results="emptyResults"
    />
  </div>
</template>

<script>
import Menu from '@/components/navigation/Menu'
import NavigationResults from '@/components/navigation/NavigationResults'
import { responsive } from '@/mixins/responsive'
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
const debounceTimout = 300

export default {
  name: 'Navigation',
  components: {
    Menu,
    NavigationResults
  },
  mixins: [ responsive ],
  data: () => ({
    openFilter: false,
    loadingResults: false,
    emptyResults: false,
    searchQuery: '',
    searchResults: []
  }),
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
    hasQueryTerm() {
      return this.searchQuery.length > 0
    },
    navigationClassObject() {
      return [
        'c-Navigation',
        {
          'c-Navigation--mobile': this.isMobile
        }
      ]
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

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.c-Navigation {
  $parent: &;
  position: fixed;
  top: 0;
  left: 0;
  min-height: 3.25rem;
  background: $gray-dark;
  width: 100vw;
  z-index: 99;

  &--mobile {

    #{$parent}__innerSection {
      justify-content: space-between;
      flex-direction: row-reverse;
    }
    #{$parent}__rightSection {
      margin-left: initial;
    }
    #{$parent}__logo {
      transform: translateX(25px);
    }
  }

  &__innerSection {
    position: relative;
    display: flex;
    justify-content: flex-start;
    height: 2.60rem;
    margin: 5px;
    padding: 3px;
    background: $gray-light;
  }

  &__logo {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 35px;
    height: 35px;
    margin-right: .5em;
    background: transparent;
    padding: 0;

  }

  &__rightSection {
    margin-left: auto;
  }

  &__searchResults {
    display: none;
    position: fixed;
    height: 100vh;
    width: 100%;
    top: 52px;
    left: 0;
    right: 0;
    background: $gray-light;
    padding: 15px 15px 60px 15px;
    overflow: auto;

    .result-stats{
      padding: 0 5px;
      border-bottom: 1px solid $gray-dark;
      margin-bottom: 10px;

      > {
        font-weight: 600;
      }
    }

    .result{
      background: $gray-trans;
      padding: 5px;
      border-radius: 4px;
      margin-bottom: 10px;
      &:hover{
        background: $gray-lighter;
      }
    }

    // @media #{$medium} {
    //   padding-left: 15px
    // }

    &.visible{
      display: block;
    }
  }
}

</style>
