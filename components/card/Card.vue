<template>
  <div
    :id="clusterData._id"
    :class="{
      loading: !loadedCluster,
      'main-section': mainSection,
      cluster: !mainSection
    }"
    class="card"
  >
    <div class="top-section">
      <div class="topics">
        <a href="#" rel="noreferrer" class="topic" @click.prevent>
          <Icon :icon="'label-outline'" />
          &nbsp;
          <span class="topic-label">{{ mainTheme }}</span>
        </a>
      </div>
    </div>

    <h3 class="title-content">
      <a
        href="#"
        rel="noreferrer"
        class="title has-text-left highlighted link blue"
        @click.prevent="openDialog(mainArticle._id)"
      >
        {{ mainArticle.title }}
      </a>
    </h3>

    <div class="source-content">
      <span
        v-tooltip.bottom="
          formatDate(mainArticle.articlePublishDate, 'MMM. Do, YYYY HH:mm')
        "
      >
        <time
          :datetime="mainArticle.articlePublishDate"
          v-text="publishDate(mainArticle.articlePublishDate)"
        />
      </span>
      by
      <nuxt-link
        :to="{ name: 'sources-domain', params: { domain: mainArticle.domain } }"
        :class="'highlighted link red'"
        v-text="mainArticle.domain"
      />
    </div>

    <ul class="headlines">
      <li v-for="article in articleHighlights" :key="article._id">
        <span class="headline">
          <a
            href="#"
            rel="noreferrer"
            class="highlighted link blue"
            @click.prevent="openDialog(article._id)"
          >
            {{ article.title }}
          </a>
        </span>
        <span class="source-content">
          <small>
            <time
              v-tooltip.bottom="
                formatDate(article.articlePublishDate, 'MMM. Do, YYYY HH:mm')
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
        </span>
      </li>
    </ul>
    <div class="footer card-bottom">
      <div class="cta-area">
        <a
          href="#"
          class="cta button is-white shadow"
          @click.prevent="openDialog(mainArticle._id)"
          v-text="'Explore'"
        />
      </div>
      <div class="stats">
        <span class="stat-item">
          {{ articlesCount }} articles by
          <span
            v-tooltip.top="{
              content: formatSources(clusterData.sources),
              html: true
            }"
            class="highlighted link red"
            v-text="`${sourcesCount} sources`"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import inView from 'element-in-view'

export default {
  name: 'Card',
  props: {
    /**
      *  The data pertaining to the article cluster
    */
    clusterData: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    /**
      *  Whether this Card should be treated as main one
    */
    mainSection: {
      type: Boolean,
      default: false
    },
    /**
      *  Whether this Card should be treated as main one
    */
    shouldLoadData: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loadedCluster: false,
      articlesCount: 0,
      sourcesCount: 0,
      articles: 0,
      eventRef: null,
      articleHighlights: [
        {
          _id: '1',
          title: 'loading',
          articlePublishDate: new Date(),
          domain: 'loading'
        },
        {
          _id: '2',
          title: 'loading',
          articlePublishDate: new Date(),
          domain: 'loading'
        },
        {
          _id: '3',
          title: 'loading',
          articlePublishDate: new Date(),
          domain: 'loading'
        }
      ],
      mainArticle: {
        title: 'Loading main headline...',
        url: 'http://example.com',
        domain: 'loading..'
      },
      mainTheme: 'loading...',
      maxDays: 7
    }
  },
  watch: {
    shouldLoadData() {
      this.loadArticles()
    }
  },
  mounted() {
    // Dispatch initial load for in-view articles
    // Remaining loads will be triggered by parent template scroll
    if (
      inView(document.getElementById(this.clusterData._id)) &&
      !this.loadedCluster
    ) {
      this.loadArticles()
    }

    this.articlesCount = this.clusterData.articles.length
    this.sourcesCount = this.clusterData.sourcesCount
    this.mainTheme = this.clusterData.mainTheme[0]
  },
  methods: {
    /*
      Actions
    */
    openDialog(articleId) {
      const article = this.articles.filter(item => {
        return item._id === articleId
      })

      this.$store.dispatch('modal/saveClusterArticles', this.articles)
      this.$store.dispatch('modal/saveSelectedArticle', article[0])

      this.$store.dispatch('modal/saveSelectedCluster', this.clusterData)

      this.$store.dispatch('saveScrollPosition', window.pageYOffset)
      this.$store.dispatch('modal/saveDialogState', true)

      this.$store
        .dispatch('GET_TWEETS', this.clusterData.mainTheme[0])
        .then(res => {
          this.$store.dispatch('modal/saveClusterTweets', res.data)
        })
        .catch(err => {
          console.log(err)
        })

      this.getChartData()
    },
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
            this.$store.dispatch('modal/saveClusterTrendData', res.data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /*
      Format
    */
    publishDate(date) {
      return moment(date).from(moment())
    },
    formatDate(date, format) {
      return moment(date).format(format)
    },
    formatSources(sources) {
      return sources.join('<br>')
    },
    /*
      Fetch articles for given cluster
    */
    loadArticles() {
      if (
        inView(document.getElementById(this.clusterData._id)) &&
        !this.loadedCluster
      ) {
        this.$store
          .dispatch('GET_ARTICLE', { articleId: this.clusterData.articles })
          .then(res => {
            this.articles = res.data.sort((a, b) => {
              return (
                new Date(b.articlePublishDate) - new Date(a.articlePublishDate)
              )
            })

            this.mainArticle = this.articles[0]

            const a = this.articles.slice()
            a.shift()

            this.articleHighlights = a.splice(0, 3)

            this.loadedCluster = true
          })
      }
    }
  }
}
</script>
