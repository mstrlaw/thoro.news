<template>
  <div class="theme-cloud">
    <a
      v-for="theme in themes"
      :key="theme.key"
      :class="theme.class"
      :cluster="theme.clusterID"
      href="#"
      class="tag is-dark"
      rel="noreferrer"
      @click.prevent="openClusterDialog(theme.clusterData)"
    >
      {{ theme.label }}
    </a>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ThemeCloud',
  props: {
    themes: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      articles: 0,
      maxDays: 7
    }
  },
  methods: {
    openClusterDialog(clusterData) {
      this.$store
        .dispatch('GET_ARTICLE', { articleId: clusterData.articles })
        .then(res => {
          const articles = res.data.sort((a, b) => {
            return (
              new Date(b.articlePublishDate) - new Date(a.articlePublishDate)
            )
          })

          this.$store.dispatch('saveClusterArticles', articles)
          this.$store.dispatch('saveSelectedArticle', articles[0])
          this.$store.dispatch('saveSelectedCluster', clusterData)
          this.$store.dispatch('saveScrollPosition', window.pageYOffset)
          this.$store.dispatch('setDialogState', true)

          this.$store
            .dispatch('GET_TWEETS', clusterData.mainTheme[0])
            .then(res => {
              this.$store.dispatch('saveClusterTweets', res.data)
            })
            .catch(err => {
              console.log(err)
            })
        })

      this.getChartData(clusterData)
    },
    getChartData(clusterData) {
      this.$store
        .dispatch('GET_TOPIC_DATA', {
          topic: clusterData.mainTheme[0],
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
    }
  }
}
</script>
