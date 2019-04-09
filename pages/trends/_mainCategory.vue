<template>
  <div class="page">
    <div :class="{ 'is-empty': isEmpty }" class="container is-widescreen">
      <div class="cards-wrapper">
        <Card
          v-for="cluster in clusters"
          :cluster-data="cluster"
          :trigger-load="loadTrigger"
          :key="cluster._id"
        />
      </div>
      <!--div v-if="isEmpty" class="empty-message">
        <h2>Nothing for today yet.</h2>
        <h5>Check <a href="#" class="has-text-link" @click.prevent="reloadTopics()"><u>yesterday's trends</u></a></h5>
      </div-->
    </div>
  </div>
</template>

<script>
import Card from '@/components/card/Card'

import moment from 'moment'
import { themeWordCloud } from '@/mixins/themeWordCloud'
import { mapGetters } from 'vuex'

import { debounce } from 'lodash'
const debounceTimeout = 50

export default {
  name: 'CategoryTrends',
  components: {
    Card
  },
  mixins: [themeWordCloud],
  data() {
    return {
      loadTrigger: false,
      username: this.$store.getters.getUserName
    }
  },
  computed: {
    ...mapGetters({
      sortOption: 'topicSortOption'
    }),
    isEmpty() {
      return this.clusters.length === 0
    }
  },
  watch: {
    sortOption() {
      this.reloadTopics({
        date: this.$store.getters.selectedDate,
        topic: 'all',
        options: {
          sort: this.sortOption
        }
      })
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.triggerLoads)
  },
  async mounted() {
    window.addEventListener('scroll', this.triggerLoads)

    this.$store.dispatch(
      'saveCurrentCategory',
      this.$router.currentRoute.params.mainCategory
    )
    this.$store.dispatch('saveDashboardType', 'trends')
    this.$store.commit('setDashboardActions', true)
    this.$store.commit('setShowOrderAction', true)
    this.$store.commit('setBreadcrumbs', false)
    this.$store.commit('setShowDataActions', false)

    await this.loadTopics({
      date: this.$store.getters.selectedDate,
      topic: this.$router.currentRoute.params.mainCategory,
      options: {
        sort: this.$store.getters.topicSortOption
      }
    })
  },
  methods: {
    triggerLoads: debounce(function () {
      this.loadTrigger = !this.loadTrigger
    }, debounceTimeout),
    reloadTopics() {
      this.$store
        .dispatch(
          'changeSelectedDate',
          moment()
            .startOf('day')
            .format('YYYY-MM-DD')
        )
        .then(() => {
          this.loadTopics({
            date: this.$store.getters.selectedDate,
            topic: this.$router.currentRoute.params.mainCategory,
            options: {
              sort: this.$store.getters.topicSortOption
            }
          })
        })
    }
  }
}
</script>
