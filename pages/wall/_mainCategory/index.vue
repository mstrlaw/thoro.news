<template>
  <div class="page">
    <div class="container">
      <div class="columns push-top-5">
        <!-- main column -->
        <div class="column is-8-tablet is-9-widescreen">
          <div class="header">
            <h4 v-text="`Trending Headlines for ${ selectedDay }`" />
          </div>
          <div class="cards-wrapper">
            <Card
              v-for="(cluster, index) in featuredClusters"
              :key="cluster._id"
              :cluster-data="cluster"
              :should-load-data="shouldLoadData"
              :main-section="index === 0"
            />
            <!--div class="section-cta">
              <nuxt-link
                :to="{
                  name: 'trends-mainCategory',
                  params: { mainCategory: currentCategory }
                }"
                href="#"
                class="button is-primary shadow"
                v-text="'View more'"
              />
            </div-->
          </div>
        </div>
        <!-- right side column -->
        <div class="column">
          <div class="card">
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
          <!--div class="card push-top-10">
            <List
              :source="'medium'"
              :options="APIOptions"
            />
          </div-->
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
      this.$store.dispatch('GET_TOPICS', {
        date: this.$store.getters.selectedDate,
        topic: this.topic,
        options: {
          sort: this.sortOption
        }
      }).then(res => {
        this.clusters = res.data
        this.featuredClusters = res.data.slice(0, 7)
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

    const res = await store.dispatch('GET_TOPICS', {
      date: store.getters.selectedDate,
      topic: params.mainCategory,
      options: {
        sort: store.getters.topicSortOption
      }
    })

    return {
      clusters: res.data,
      featuredClusters: res.data.slice(0, 7)
    }
  }
}
</script>
