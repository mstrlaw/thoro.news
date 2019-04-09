<template>
  <div :class="{ visible: dialogState }" class="dialog-modal">
    <div class="dialog-header">
      <div class="controls">
        <h3 class="info tag">
          <Icon :icon="'label-outline'" />
          <span class="context">{{ mainTheme }}</span>
        </h3>
        <a
          :data-article="article._id"
          href="#"
          class="action prev"
          title="Previous article"
          @click.prevent="navigate('prev', article._id)"
        >
          <Icon :icon="'chevron-left'" />
          <span class="context">Prev</span>
        </a>
        <span class="action">{{ indexPreview }}</span>
        <a
          :data-article="article._id"
          href="#"
          class="action next"
          title="Next article"
          @click.prevent="navigate('next', article._id)"
        >
          <span class="context">Next</span> &nbsp;
          <Icon :icon="'chevron-right'" />
        </a>
      </div>
      <a href="#" class="close" @click.prevent="closeDialog">
        <span />
        <span />
        <span />
      </a>
    </div>
    <div :class="{ 'has-media': hasMedia }" class="inner-dialog">
      <div class="dialog-body">
        <div class="body-header">
          <div
            :style="{
              'background-image': 'url(' + article.urlToMedia + ')',
              transform: 'translateY(-' + yPos + 'px)'
            }"
            class="image"
          />
        </div>
        <div class="info-wrapper">
          <h1 class="title is-size-2">{{ article.title }}</h1>
          <div class="info">
            <div>
              Published by
              <strong>
                <nuxt-link
                  :to="{
                    name: 'sources-domain',
                    params: { domain: article.domain }
                  }"
                  :class="{ underlined: hasMedia, link: !hasMedia }"
                  class="source highlighted blue"
                  v-text="article.domain"
                />
              </strong>
              on
              <time
                :datetime="article.articlePublishDate"
                v-text="publishDate(article.articlePublishDate)"
              />
            </div>
          </div>
        </div>

        <div class="content">
          <p v-html="articleDescription(article)" />
          <div class="w-100 text-center">
            <a
              :href="article.url"
              class="button is-primary shadow is-hidden-mobile is-hidden-tablet-only"
              target="_blank"
            >
              Read Original&nbsp;
              <Icon :icon="'open-in-new'" />
            </a>
            <a
              :href="article.url"
              class="button is-primary is-inverted shadow is-hidden-desktop"
              target="_blank"
            >
              Read Original&nbsp;
              <Icon :icon="'open-in-new'" />
            </a>
          </div>
        </div>

        <div class="extra-content">
          <div class="card chart-container">
            <div class="top-section">
              <div class="topics">
                <span class="topic">
                  <Icon :icon="'bullhorn'" />&nbsp;Mentions
                </span>
              </div>
            </div>
            <h4 class="subtitle is-size-6 has-text-grey push-bottom-10">
              Clusters for "{{ mainTheme }}" in the past 7 days
            </h4>

            <LineChart
              :chart-id="'mentionsChart'"
              :extra-class="'h-150'"
              :chart-data="clusterTrendData"
              :chart-options="chartOptions"
              :load-articles="false"
            />
          </div>

          <TwitterList :tweets="clusterTweets" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import TwitterList from '@/components/listing/TwitterList'
import LineChart from '@/components/charts/LineChart'
import { mapGetters } from 'vuex'
import { stringUtils } from '@/mixins/stringUtils'
import { formatters } from '@/mixins/formatters'
import { themeWordCloud } from '@/mixins/themeWordCloud'

export default {
  name: 'Modal',
  components: {
    TwitterList,
    LineChart
  },
  mixins: [themeWordCloud, stringUtils, formatters],
  props: {
    tweets: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      /**
        * Stores current scroll position when opening the modal to revert back once closed
      */
      yPos: 0,
      dialogInnerContentEl: null,
      chartOptions: {
        chartType: 'sources',
        animate: false,
        maintainAspectRatio: false, // my new default options
        elements: { point: { radius: 0 } },
        legend: { display: false },
        title: {
          display: true,
          lineHeight: 0,
          padding: 1,
          position: 'bottom'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 80,
            bottom: 5
          }
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                // max: this.localData.maxY + 10,
                min: -2
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      dialogState: 'dialogState',
      article: 'selectedArticle',
      scrollPos: 'scrollPosition',
      indexPreview: 'indexPreview',
      selectedCluster: 'selectedCluster',
      clusterTweets: 'clusterTweets',
      clusterTrendData: 'clusterTrendData'
    }),
    mainTheme() {
      return this.selectedCluster.mainTheme[0]
    },
    hasMedia() {
      if (
        this.article.urlToMedia !== '' &&
        typeof this.article.urlToMedia !== 'undefined'
      ) {
        //  Avoid tracking pixels
        if (this.article.urlToMedia.indexOf('rss-pixel') < 0) {
          return this.article.urlToMedia
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  watch: {
    dialogState() {
      if (this.dialogState) {
        window.addEventListener('keydown', this.handleKeyNavigation)
      } else {
        window.removeEventListener('keydown', this.handleKeyNavigation)
      }
    }
  },
  mounted() {
    if (process.browser) {
      this.dialogInnerContentEl = document.getElementsByClassName(
        'inner-dialog'
      )[0]
      this.dialogInnerContentEl.addEventListener('scroll', this.applyParallax)
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.applyParallax)
  },
  methods: {
    /*
      Actions
    */
    handleKeyNavigation(e) {
      let id

      switch (e.keyCode) {
        // Prev
        case 37:
          id = document
            .getElementsByClassName('action prev')[0]
            .getAttribute('data-article')
          this.navigate('prev', id)
          break
        // Next
        case 39:
          id = document
            .getElementsByClassName('action next')[0]
            .getAttribute('data-article')
          this.navigate('next', id)
          break
        // Close
        case 27:
          this.closeDialog()
          break
      }
    },
    navigate(direction, articleId) {
      this.$store
        .dispatch('navigateAdjacentArticle', {
          direction: direction,
          currentArticleId: articleId
        })
        .then(() => {
          document.getElementsByClassName('dialog-body')[0].scrollIntoView()
        })
    },
    closeDialog() {
      this.$store.dispatch('setDialogState', false)
      this.$store.dispatch('saveClusterTweets', [])
      this.$store.dispatch('setClusterTrendData', [])
      this.$store.commit('resetSelectedCluster')

      setTimeout(() => {
        window.scrollTo(0, this.scrollPos)
      }, 0)
    },
    applyParallax() {
      if (process.browser && this.dialogState) {
        this.yPos = this.dialogInnerContentEl.scrollTop * 0.2
      }
    },

    publishDate(date) {
      return moment(date).format('DD MMM \'YY')
    }
  }
}
</script>
