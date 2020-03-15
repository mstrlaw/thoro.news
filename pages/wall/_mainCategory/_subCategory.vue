<template>
  <div class="page">

    <div class="container">
      <div class="column">
        <div class="o-PageHeader">
          <h4 v-text="`Headlines for ${ selectedDay }`" />
        </div>
      </div>
    </div>

    <div class="container">
      <div class="column">
        <div class="c-Card">
          <div class="top-section">
            <div class="topics">
              <span class="topic">
                <Icon :icon="'chart-line-variant'" />&nbsp;
                <span class="topic-label" v-text="'Trending'" />
              </span>
            </div>
          </div>
          <ThemeCloud :themes="themeCloud" />
        </div>
      </div>
    </div>

    <div class="container">
      <div class="column">
        <div class="cards-wrapper">
          <Card
            v-for="(cluster, index) in featuredClusters"
            :key="cluster._id"
            :cluster-data="cluster"
            :should-load-data="shouldLoadData"
            :main-section="index === 0"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Card from '@/components/card/Card'
import ThemeCloud from '@/components/themeCloud/ThemeCloud'
import List from '@/components/listing/List'
import { themeWordCloud } from '@/mixins/themeWordCloud'
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'
import moment from 'moment'

const debounceTimeout = 50

export default {
  name: 'MainFeed',
  components: {
    Card,
    List,
    ThemeCloud
  },
  mixins: [themeWordCloud],
  data() {
    return {
      clusters: [],
      featuredClusters: [],
      topic: this.$router.currentRoute.params.mainCategory,
      subtopic: this.$router.currentRoute.params.subCategory,
      shouldLoadData: false,
      APIOptions: {
        domain: 'medium.com',
        sortField: 'articlePublishDate',
        category: this.$router.currentRoute.params.mainCategory,
        subcategory: '',
        sortOrder: -1,
        limit: 10
      }
    }
  },
  computed: {
    ...mapGetters({
      sortOption: 'topicSortOption',
      currentCategory: 'currentCategory'
    }),
    selectedDay() {
      return moment(this.$store.getters.selectedDate).format('Do MMM. YYYY')
    }
  },
  watch: {
    sortOption() {
      this.reloadClusters()
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.triggerLoad)
  },
  mounted() {
    window.addEventListener('scroll', this.triggerLoad)
    if (this.clusters.length > 0) {
      this.setThemeCloud()
    }
  },
  methods: {
    triggerLoad: debounce(function () {
      this.shouldLoadData = !this.shouldLoadData
    }, debounceTimeout),
    reloadClusters() {
      this.$store.dispatch('api/GET_TOPICS', {
        date: this.$store.getters.selectedDate,
        topic: this.topic,
        subtopic: this.subtopic,
        options: {
          sort: this.sortOption
        }
      }).then(res => {
        this.clusters = res.data
        this.featuredClusters = res.data.slice(0, 21)
        this.setThemeCloud()
      })
    }
  },
  async asyncData({ store, params }) {
    store.dispatch('saveCurrentCategory', params.mainCategory)
    store.dispatch('saveDashboardType', 'wall')
    store.commit('setDashboardActions', true)
    store.commit('setShowOrderAction', true)
    store.commit('setBreadcrumbs', false)
    store.commit('setShowDataActions', false)

    const res = await store.dispatch('api/GET_TOPICS', {
      date: store.getters.selectedDate,
      topic: params.mainCategory,
      subtopic: params.subCategory,
      options: {
        sort: 'score'
      }
    })

    store.commit('saveClusters', res.data)

    return {
      clusters: res.data,
      featuredClusters: res.data.slice(0, 21)
    }
  }
}
</script>
