<template>
  <div
    class="c-WordCloud"
  >
    <div class="c-WordCloud__slideWrapper">
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
        .dispatch('api/GET_ARTICLE', { articleId: clusterData.articles })
        .then(res => {
          const articles = res.data.sort((a, b) => {
            return (
              new Date(b.articlePublishDate) - new Date(a.articlePublishDate)
            )
          })

          this.$store.dispatch('modal/saveClusterArticles', articles)
          this.$store.dispatch('modal/saveSelectedArticle', articles[0])
          this.$store.dispatch('modal/saveSelectedCluster', clusterData)
          this.$store.dispatch('saveScrollPosition', window.pageYOffset)
          this.$store.dispatch('modal/saveDialogState', true)

          this.$store
            .dispatch('api/GET_TWEETS', clusterData.mainTheme[0])
            .then(res => {
              this.$store.dispatch('modal/saveClusterTweets', res.data)
            })
            .catch(err => {
              console.log(err)
            })
        })

      this.getChartData(clusterData)
    },
    getChartData(clusterData) {
      this.$store
        .dispatch('api/GET_TOPIC_DATA', {
          topic: clusterData.mainTheme[0],
          options: {
            minDate: moment()
              .subtract(this.maxDays, 'days')
              .toISOString()
          }
        })
        .then(res => {
          if (res.data.length > 0) {
            this.$store.dispatch('modal/saveClusterTrendData', res.data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSwipeLeft() {
      console.log('SWITPED!')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_variables.scss';

.c-WordCloud{

  &__slideWrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
    padding: 10px 5px;
  }

  .tag{
    margin: 0 4px 4px 0;
    &.is-huge{
      font-size: 1.25rem;
    }
    &:last-child(){
      margin-right: auto;
    }
  }

  @media #{$small} {
    position: relative;
    display: block;
    height: 65px;
    overflow: auto;
    width: 100%;

    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;

    &__slideWrapper {
      position: absolute;
      flex-wrap: initial;
      width: 100vw;
    }
  }
}

</style>
