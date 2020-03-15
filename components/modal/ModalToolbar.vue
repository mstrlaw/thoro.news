<template>
  <div class="dialog-header">
    <div class="controls">
      <div class="info tag is-dark">
        <Icon :icon="'label-outline'" />
        <span class="context">{{ theme }}</span>
      </div>
      <div class="metrics">
        <div
          v-tooltip.bottom="{
            content: `
            <b>${ articles } articles</b> out of <b>${ sources } sources</b>
            <br/>
            <small>This value displays the source diversity: the ratio between the volume<br>
            of articles and sources. The closer it is to 1 the highest the diversity.</small>`,
            html: true
          }"
          class="tag"
        >
          <Icon :icon="'newspaper'" />
          <span class="context">&nbsp;<b>{{ articleRatio }}</b></span>
        </div>
        <div
          v-tooltip.bottom="'Average Sentiment'"
          class="tag"
        >
          <Icon :icon="sentimentIcon" />
          <span class="context">&nbsp;<b>{{ sentiment }}</b></span>
        </div>
      </div>
      <div class="cluster-controls">
        <a
          :data-article="article._id"
          href="#"
          class="action prev"
          title="Previous cluster"
          @click.prevent="navigateClusters('prev')"
        >
          <!-- @click.prevent="navigate('prev', article._id)" -->
          <Icon :icon="'chevron-left'" />
          <span class="context">Prev</span>
        </a>
        <!--span class="action">{{ indexPreview }}</span-->
        <a
          :data-article="article._id"
          href="#"
          class="action next"
          title="Next cluster"
          @click.prevent="navigateClusters('next')"
        >
          <span class="context">Next</span> &nbsp;
          <Icon :icon="'chevron-right'" />
        </a>
      </div>
    </div>
    <a
      href="#"
      class="close"
      @click.prevent="closeDialog"
    >
      <span />
      <span />
      <span />
    </a>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'ModalToolbar',
  props: {
    clusterId: {
      type: String,
      default: ''
    },
    article: {
      type: Object,
      default: () => {
        return {}
      }
    },
    theme: {
      type: String,
      default: ''
    },
    articles: {
      type: Number,
      default: 0
    },
    sources: {
      type: Number,
      default: 0
    },
    sentiment: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    maxDays: 7
  }),
  computed: {
    ...mapGetters({
      scrollPos: 'scrollPosition',
      dialogState: 'modal/dialogState',
      indexPreview: 'modal/indexPreview'
    }),
    sentimentIcon() {
      if (this.sentiment > 0.5) {
        return 'arrow-up'
      } else if (this.sentiment < 0.5) {
        return 'arrow-down'
      } else if (this.sentiment === 0.5) {
        return 'minus'
      }
    },
    articleRatio() {
      return Math.round(this.sources / this.articles * 100) / 100
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
  methods: {
    handleKeyNavigation(e) {
      // let id

      switch (e.keyCode) {
        // Right key
        case 37:
          // id = document
          //   .getElementsByClassName('action prev')[0]
          //   .getAttribute('data-article')
          // this.navigate('prev', id)
          this.navigateClusters('prev', this.clusterId)
          break

        // Left key
        case 39:
          // id = document
          //   .getElementsByClassName('action next')[0]
          //   .getAttribute('data-article')
          // this.navigate('next', id)
          this.navigateClusters('next', this.clusterId)
          break

        // Excape key
        case 27:
          this.closeDialog()
          break
      }
    },
    navigate(direction, articleId) {
      this.$store
        .dispatch('modal/navigateAdjacentArticle', {
          direction: direction,
          currentArticleId: articleId
        })
        .then(() => {
          document.getElementsByClassName('dialog-body')[0].scrollIntoView()
        })
    },
    navigateClusters(direction) {
      const cluster = this.$store.getters.getAdjacentCluster({
        direction: direction,
        id: this.clusterId
      })

      if (typeof cluster !== 'undefined') {
        this.openClusterDialog(cluster)
      }
    },
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
    closeDialog() {
      document.getElementsByTagName('body')[0].classList.remove('open-modal')
      window.scrollTo(0, this.scrollPos)

      this.$store.dispatch('modal/saveDialogState', false)
      this.$store.dispatch('modal/saveClusterTweets', [])
      this.$store.dispatch('modal/saveClusterTrendData', [])
      this.$store.commit('modal/resetSelectedCluster')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/_variables.scss';

.dialog-header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 3.25em;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAGUlEQVQIW2NkYGD4z8DAwMiABFA4MHEKBQFmoAEGdnHj3wAAAABJRU5ErkJggg==);
    background-repeat: repeat;
    z-index: -1;
    opacity: 0.3;
  }

  .controls {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: $gray-lighter;
    transition: background-color .2s;

    .info,
    a,
    span.action {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 3.25rem;
      height: 3.25rem;
      padding: .7em;

      .context {
        font-weight: 600;
        margin-bottom: 3px;
        margin-left: .5em;
        @media #{$xsmall} {
          display: none;
        }
      }
    }
    .info {
      align-items: center;
    }
    span.action {
      display: flex;
    }
    a {
      color: $blue-dark;
      &.prev {
        .context {
          margin-right: .5em;
        }
      }
      &.next {
        .context {
          margin-left: .5em;
        }
      }
      &:hover {
        background-color: $gray-light;
        transition: background-color .2s;
      }
    }
    .info,
    .tag {
      font-size: 1em;
      margin: .5em 0 .5em .5em;
      width: auto;
      height: 2.5rem;
    }
  }

  .close {
    cursor: pointer;
    display: block;
    height: 3.25rem;
    position: relative;
    width: 3.25rem;
    background-color: $gray-dark;
    padding: 1.25em;
    transition: background-color .2s;

    &:hover {
      background-color: $gray-light;
      transition: background-color .2s;
    }
    span {
      background-color: $blue-dark;
      display: block;
      height: 2px;
      left: calc(50% - 8px);
      position: absolute;
      transform-origin: center;
      width: 16px;
      &:nth-child(1) {
        top: calc(50% - 6px);
        transform: translateY(5px) rotate(45deg);
      }
      &:nth-child(2) {
        top: calc(50% - 1px);
        opacity: 0;
      }
      &:nth-child(3) {
        top: calc(50% + 4px);
        transform: translateY(-5px) rotate(-45deg);
      }
    }
  }
}
.cluster-controls {
  display: flex;
  margin-left: auto;
}
</style>
