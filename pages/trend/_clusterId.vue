<template>
  <div class="data-page">
    <div class="top-section push-bottom-25">
      <div class="actions ml-0">
        <DateRangeDropdown />

        <div class="action">
          <label class="checkbox">
            <input v-model="displayArticles" type="checkbox" />
            Load Articles
          </label>
        </div>
      </div>
    </div>

    <div class="columns">
      <div
        :class="displayArticles ? 'is-three-quarters' : 'is-full'"
        class="column"
      >
        <div class="chart-container w-100">
          <LineChart
            :chart-id="'mentionsChart'"
            :extra-class="'h-450'"
            :max-days="maxDays"
            :chart-data="clusterTrendData"
            :chart-options="chartOptions"
            :load-articles="displayArticles"
            @loadedData="listArticles"
          />
        </div>
      </div>

      <div :class="displayArticles ? '' : 'd-none'" class="column">
        <div class="c-Card list-wrapper scrollable">
          <div
            :class="expandedArticles ? 'expanded-list' : ''"
            class="list-container"
          >
            <div class="top-section">
              <div class="topics">
                <span
                  rel="noreferrer"
                  class="topic"
                  v-text="`${articleData.length} Articles`"
                />
              </div>
              <div class="actions">
                <a
                  href="#"
                  class="button is-light"
                  @click.prevent="toggleExpandArticles"
                >
                  <Icon v-if="expandedArticles" :icon="'collapse'" />
                  <Icon v-else :icon="'expand'" />
                </a>
              </div>
            </div>

            <div class="list-content">
              <table
                v-if="articleData.length > 0"
                class="table is-fullwidth article-list is-hoverable"
              >
                <tbody>
                  <tr v-for="article in articleData" :key="article._id">
                    <td :class="article.domain" class="article-item">
                      <div class="headline">
                        <a
                          v-tooltip.top-start="{
                            content: description(article),
                            classes: ['text-preview']
                          }"
                          :href="article.url"
                          class="subtitle highlighted link blue"
                          target="_blank"
                          v-html="articleTitle(article, true)"
                        />
                      </div>
                      <div>
                        <small>
                          <time
                            v-tooltip.bottom="
                              formatDate(
                                article.articlePublishDate,
                                'MMM. Do, YYYY HH:mm'
                              )
                            "
                            :datetime="article.articlePublishDate"
                            v-text="publishDate(article.articlePublishDate)"
                          />
                          by
                          <nuxt-link
                            :to="{
                              name: 'sources-domain',
                              params: { domain: article.domain }
                            }"
                            :class="'highlighted link red'"
                            v-text="article.domain"
                          />
                        </small>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else class="w-100 text-center push-top-10">
                <h6>Hover the Articles line to preview here</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart'
import ListItem from '@/components/listing/items/ListItem'
import DateRangeDropdown from '@/components/inputs/dropdowns/DateRangeDropdown'
import { formatters } from '@/mixins/formatters'
import moment from 'moment'

export default {
  name: 'Data',
  layout: 'loggedLayout',
  components: {
    LineChart,
    ListItem,
    DateRangeDropdown
  },
  mixins: [formatters],
  data() {
    return {
      /*
        Options UI
      */
      // Dropdowns & UI states
      displayArticles: true,
      articleData: [],
      expandedArticles: false,

      /*
        Chart data
      */
      chartOptions: {
        chartType: 'sources',
        animate: false,
        maintainAspectRatio: false,
        elements: {
          point: { radius: 0 },
          line: { tension: 0.4 } // Control bezier curve strength
        },
        legend: { position: 'bottom' },
        tooltips: {
          mode: 'point',
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              display: true
            }
          ]
        }
      }
    }
  },
  computed: {
    clusterTrendData() {
      return this.$store.getters.clusterTrendData
    },
    selectedCluster() {
      return this.$store.getters.selectedCluster
    },
    mainTheme() {
      return this.selectedCluster.mainTheme[0]
    },
    maxDays() {
      return this.$store.getters.maxDays
    }
  },
  watch: {
    maxDays() {
      this.getChartData()
    }
  },
  mounted() {
    this.$store.dispatch('setDialogState', false)

    this.$store.dispatch('saveDashboardType', 'wall')

    this.$store.commit('setDashboardActions', false)
    this.$store.commit('setShowOrderAction', false)
    this.$store.commit('setBreadcrumbs', false)
    this.$store.commit('setShowDataActions', true)

    if (this.selectedCluster.mainTheme[0].length > 0) {
      this.getChartData()
    } else {
      this.$store
        .dispatch('GET_TOPIC', {
          id: this.$router.currentRoute.params.clusterId
        })
        .then(res => {
          this.$store.dispatch('saveSelectedCluster', res.data)
          this.getChartData()
        })
    }
  },
  methods: {
    getChartData() {
      this.$store
        .dispatch('GET_TOPIC_DATA', {
          topic: this.mainTheme,
          options: {
            minDate: moment()
              .subtract(this.maxDays, 'days')
              .toISOString()
          }
        })
        .then(res => {
          if (res.data.length > 0) {
            this.$store.dispatch('setClusterTrendData', res.data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    listArticles(articles) {
      this.articleData = articles.data
    },
    publishDate(date) {
      return moment(date).from(moment())
    },
    formatDate(date, format) {
      return moment(date).format(format)
    },
    description(article) {
      return article.description
    },
    toggleExpandArticles() {
      this.expandedArticles = !this.expandedArticles
    }
  }
}
</script>
