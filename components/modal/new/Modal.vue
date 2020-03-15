<template>
  <div
    :class="{ 'isVisible': dialogState }"
    class="c-Modal"
  >
    <ModalToolbar
      :cluster-id="selectedCluster._id"
      :article="article"
      :theme="clusterTheme"
      :articles="articles.length"
      :sources="sources.length"
      :sentiment="avgSentiment"
    />

    <div
      ref="modalBody"
      class="c-ModalBody"
    >
      <div
        ref="articlesPanel"
        class="c-ModalSection__mainSection"
      >
        <div class="c-ModalSection--topSection">
          <div class="tag is-dark"><Icon :icon="'newspaper'" />&nbsp;&nbsp;<b>Articles</b></div>
        </div>
        <div
          :class="articlesWrapperClassObject"
          class="c-ModalSection__mainSection--articlesWrapper"
        >
          <ArticleItem
            v-for="(article, index) in articles"
            :key="index"
            :article="article"
            :title="article.title"
            :description="article.description"
            :domain="article.domain"
            :url="article.url"
            :url-to-media="article.urlToMedia"
            :article-publish-date="article.articlePublishDate"
            :bias="article.bias"
            :factual="article.factual"
          />
          <div class="c-ModalSection__mainSection--action">
            <a
              v-if="collapsedArticles"
              href="#"
              class="cta button is-small is-primary shadow"
              @click.prevent="expandArticles"
            >
              View all {{ articles.length }} articles
            </a>
          </div>
        </div>
        <div
          v-if="!isMobile"
          class="c-Social"
        >
          <TwitterList :tweets="clusterTweets" />
        </div>
      </div>
      <div
        ref="dataPanel"
        class="c-ModalSection"
      >
        <!--div class="c-ModalSection__subNav">
          <a
            href="#"
            class="c-ModalSection__subNavPill isActive"
          >Analysis</a>
          <a
            href="#"
            class="c-ModalSection__subNavPill"
          >Twitter</a>
        </div-->
        <div class="c-ModalSection__panel isActive">
          <div class="c-Charts">
            <div class="c-Charts--mainChart">
              <div class="tag is-dark"><b>Trend</b></div>
              <VueApexCharts
                :options="trendChartOptions"
                :series="trendSeries"
                type="area"
                height="100"
              />
            </div>
            <div class="c-Charts--secondaryChart">
              <div class="tag is-dark"><b>Categories</b></div>
              <VueApexCharts
                :options="categoryChartOptions"
                :series="categorySeries"
                height="300"
                type="donut"
              />
            </div>

            <div
              ref="dimentionElement"
              class="c-Charts--secondaryChart"
            >
              <div
                v-tooltip.top="{
                  content: '<div class=\'tooltip-content\'>Political and factual analysis by <a class=\'has-text-info\' href=\'https://mediabiasfactcheck.com/\' target=\'_blank\'>Media Bias Fact Check</a>.<br>Values refer to outlets and may not reflect particular articles.</div>',
                  html: true,
                  autoHide: false,
                  trigger: 'hover',
                  classes: ['interact']
                }"
                class="tag is-dark"
              >
                <b>Leaning/Bias</b>&nbsp;
                <Icon :icon="'question-circle'" />
              </div>
              <VueApexCharts
                :options="biasChartOptions"
                :series="biasSeries"
                height="300"
                type="radar"
              />
            </div>
          </div>
          <div class="c-Sources">
            <SourceItem
              v-for="source in sources"
              :key="source.domain"
              :source="source"
            />
          </div>
        </div>
        <div
          v-if="isMobile"
          class="c-Social--mobile"
        >
          <TwitterList :tweets="clusterTweets" />
        </div>
        <!--div
          ref="socialMediaPanel"
          class="c-ModalSection__panel"
        >
          <TwitterList :tweets="clusterTweets" />
        </div-->
      </div>

      <!--div class="extra-content">
        <TwitterList :tweets="clusterTweets" />
      </div-->
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ModalToolbar from '@/components/modal/ModalToolbar'
import ModalHeader from '@/components/modal/ModalHeader'
// import ModalBody from '@/components/modal/ModalBody'
import ArticleItem from '@/components/modal/new/ArticleItem'
import SourceItem from '@/components/modal/new/SourceItem'

import ModalChart from '@/components/modal/ModalChart'
import TwitterList from '@/components/listing/TwitterList'

import { BREAKPOINTS } from '@/utilities/breakpoints'

import { mapGetters } from 'vuex'

const MAPPED_BIAS_SHORTNAME = {
  'C': 'Center',
  'RC': 'Right Center',
  'R': 'Right',
  'PS': 'Pro-Science',
  'FN': 'Fake News',
  'U': 'Unknown',
  'CO': 'Conspiracy',
  'S': 'Satire',
  'L': 'Left',
  'LC': 'Left Center'
}

const chartColors = ['#26276F', '#404189', '#595AA2', '#7374BC', '#8C8DD5', '#A5A6EE', '#BFC0FF', '#D9DAFF', '#F2F3FF']

export default {
  name: 'Modal',
  components: {
    VueApexCharts: () => process.client ? import('vue-apexcharts') : Promise.resolve({ render: h => h('div') }),
    ModalToolbar,
    ModalHeader,
    ArticleItem,
    SourceItem,
    // ModalBody,
    ModalChart,
    TwitterList
  },
  props: {
    tweets: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: () => ({
    isMobile: false,
    collapsedArticles: false,
    //  Articles data
    avgSentiment: 0.5,
    sources: [],
    categories: {},
    ngramControl: [],
    tmpNgramData: {},
    crunchedNgrams: false,
    //  Trend Chart
    trendChartOptions: {
      markers: {
        size: 4,
        colors: chartColors,
        strokeColor: '#FFF',
        strokeWidth: 2,
        offsetX: 0,
        offsetY: 0,
        shape: 'circle',
        radius: 0,
        hover: {
          size: undefined,
          sizeOffset: 2
        }
      },
      grid: {
        padding: {
          top: 25,
          left: -42,
          right: -42
        }
      },
      yaxis: {
        min: -1
      },
      chart: {
        width: '100%',
        sparkline: {
          enabled: true
        }
      },
      stroke: {
        width: 2,
        curve: 'smooth'
      },
      labels: ['Articles', 'Sources'],
      tooltip: {
        theme: 'dark',
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          const values = []
          const elements = []
          series.map(item => {
            values.push(item[dataPointIndex])
          })

          values.forEach((item, index) => {
            elements.push(`
              <div class="c-Charts--serieWrapper">
                <div class="c-Charts--serie">
                  <div class="c-Charts--seriesColor" style="background-color:${chartColors[index]}"></div>
                  <span>${w.globals.seriesNames[index]}: <b>${item}</b></span>
                </div>
              </div>`)
          })

          return `<div class="c-Charts---tooltip">
            <div class="c-Charts--tooltipLabel">${w.config.series[0].data[dataPointIndex].x}</div>
            ${elements.join('')}
          </div>`
        }
      },
      colors: ['#26276F', '#BFC0FF']
    },
    trendSeries: [],
    //  Bias Chart
    biasSeries: [],
    biasMaxScale: 0,
    //  Categories Chart
    categorySeries: [],
    categoryChartOptions: {
      chart: {
        width: '100%'
      },
      labels: [],
      colors: chartColors,
      legend: {
        position: 'bottom'
      },
      tooltip: {
        followCursor: false,
        theme: 'dark',
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          return `<div class="c-Charts---tooltip">
              <div class="c-Charts--serieWrapper">
                <div class="c-Charts--serie">
                  <div class="c-Charts--seriesColor" style="background-color:${chartColors[seriesIndex]}"></div>
                  <span>${w.config.labels[seriesIndex]}: <b>${series[seriesIndex]} articles</b></span>
                </div>
              </div>
            </div>`
        }
      }
    }
  }),
  computed: {
    ...mapGetters({
      dialogState: 'modal/dialogState',
      articles: 'modal/clusterArticles',
      article: 'modal/selectedArticle',
      selectedCluster: 'modal/selectedCluster',
      clusterTweets: 'modal/clusterTweets',
      clusterTrendData: 'modal/clusterTrendData'
    }),
    clusterTheme() {
      return this.selectedCluster.mainTheme[0]
    },
    sentimentIcon() {
      if (this.avgSentiment > 0.5) {
        return 'arrow-up'
      } else if (this.avgSentiment < 0.5) {
        return 'arrow-down'
      } else if (this.avgSentiment === 0.5) {
        return 'minus'
      }
    },
    biasChartOptions() {
      return {
        chart: {
          width: '100%',
          toolbar: {
            show: false
          }
        },
        xaxis: {
          labels: {
            formatter: function (value) {
              return MAPPED_BIAS_SHORTNAME[value]
            }
          }
        },
        yaxis: {
          max: this.biasMaxScale,
          tickAmount: this.biasMaxScale,
          labels: {
            formatter: value => {
              return Math.round(value)
            }
          }
        },
        plotOptions: {
          radar: {
            polygons: {
              strokeColor: '#e9e9e9',
              fill: {
                colors: ['#f8f8f8', '#fff']
              }
            }
          }
        },
        markers: {
          size: 4,
          colors: chartColors,
          strokeColor: '#FFF',
          strokeWidth: 2
        },
        colors: ['#26276F', '#BFC0FF'],
        labels: [
          'C',
          'RC',
          'R',
          'PS',
          'FN',
          'U',
          'CO',
          'S',
          'L',
          'LC'
        ],
        tooltip: {
          theme: 'dark',
          custom: ({ series, seriesIndex, dataPointIndex, w }) => {
            const shortname = w.config.labels[dataPointIndex]

            return `<div class="c-Charts---tooltip">
              <div class="c-Charts--serieWrapper">
                <div class="c-Charts--serie">
                  <span>${MAPPED_BIAS_SHORTNAME[shortname]} (${shortname}): <b>${series[seriesIndex][dataPointIndex]}</b></span>
                </div>
              </div>
            </div>`
          }
        }
      }
    },
    articlesWrapperClassObject() {
      return {
        isCollapsed: this.collapsedArticles
      }
    }
  },
  watch: {
    dialogState(isVisible) {
      if (isVisible) {
        this.scrollToTop()
      }
    },
    articles(articles) {
      this.crunchArticleData(articles)
      this.scrollToTop()
    },
    clusterTrendData(data) {
      const startDate = moment().subtract(7, 'days')
      const days = 7

      const sourceData = []
      const articleData = []
      const articleIDs = []

      let maxY = 0

      for (let i = 0; i <= days; i++) {
        const date = startDate.format('DD-MM-YYYY')
        const dateLabel = startDate.format('DD MMM YYYY')

        const dayData = data.filter(item => {
          return item.day === date
        })

        if (dayData.length > 0) {
          const source = dayData[0].sourcesCount
          const article = dayData[0].articlesCount

          if (source > maxY) {
            maxY = source
          }
          if (article > maxY) {
            maxY = article
          }

          maxY += 1

          sourceData.push({
            x: dateLabel,
            y: source
          })
          articleData.push({
            x: dateLabel,
            y: article
          })

          articleIDs.push(dayData[0].articles)
        } else {
          sourceData.push({
            x: dateLabel,
            y: 0
          })
          articleData.push({
            x: dateLabel,
            y: 0
          })

          articleIDs.push([])
        }

        startDate.add(1, 'days')
      }

      this.trendChartOptions.yaxis.max = maxY

      this.trendSeries = [
        ...[],
        {
          name: 'Articles',
          data: articleData
        },
        {
          name: 'Sources',
          data: sourceData
        }
      ]
    }
  },
  created() {
    if (process.client) {
      window.addEventListener('resize', this.triggerResponsiveChanges)
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener('resize', this.triggerResponsiveChanges)
    }
  },
  mounted() {
    this.triggerResponsiveChanges()
  },
  methods: {
    activePanel(panel) {
      return panel === this.selectedPanel
    },
    crunchArticleData(articles) {
      const biasData = {
        center: 0,
        'right-center': 0,
        right: 0,
        'pro-science': 0,
        'fake-news': 0,
        'unknown': 0,
        conspiracy: 0,
        satire: 0,
        left: 0,
        leftcenter: 0
      }
      const biasSeriesData = []

      this.biasMaxScale = 0
      this.biasSeries = []
      this.categorySeries = []
      this.categories = {}

      const sources = []

      let avgSentiment = 0

      articles.map(article => {
        //  Sentiment
        avgSentiment += article.sentiment

        if (typeof biasData[article.bias] !== 'undefined') {
          biasData[article.bias] += 1
        }

        //  Sources
        const index = sources.findIndex(item => {
          return item.domain === article.domain
        })

        if (index < 0) {
          sources.push({
            domain: article.domain,
            count: 1,
            sentiment: Math.round(article.sentiment * 100) / 100,
            bias: article.bias,
            articles: [{
              _id: article._id,
              title: article.title,
              articlePublishDate: article.articlePublishDate,
              url: article.url,
              sentiment: Math.round(article.sentiment * 100) / 100
            }]
          })
        } else {
          sources[index].count += 1

          sources[index].sentiment = Math.round((sources[index].sentiment + article.sentiment) / sources[index].count * 100) / 100

          sources[index].articles.push({
            _id: article._id,
            title: article.title,
            articlePublishDate: article.articlePublishDate,
            url: article.url,
            sentiment: Math.round(article.sentiment * 100) / 100
          })
        }

        //  Categories
        if (article.mainCategory.length > 0) {
          if (typeof this.categories[article.mainCategory[0].label] !== 'undefined') {
            this.categories[article.mainCategory[0].label] += 1
          } else {
            this.categories[article.mainCategory[0].label] = 1
          }
        } else if (typeof this.categories.other !== 'undefined') {
          this.categories.other += 1
        } else {
          this.categories.other = 1
        }
      })

      for (const key in biasData) {
        biasSeriesData.push(biasData[key])
        if (biasData[key] > this.biasMaxScale) {
          this.biasMaxScale = biasData[key]
        }
      }

      this.biasSeries.splice(0, 1, { name: 'Articles', 'data': biasSeriesData })

      //  Sentiment Average
      this.avgSentiment = Math.round(avgSentiment / articles.length * 100) / 100

      //  Prepare category data for chart
      const tmp = []
      const tmpCat = JSON.parse(JSON.stringify(this.categoryChartOptions))

      for (const key in this.categories) {
        tmp.push(key.charAt(0).toUpperCase() + key.slice(1))
        this.categorySeries.push(this.categories[key])
      }

      tmpCat.labels = tmp

      this.categoryChartOptions = tmpCat

      //  Update article sources list
      sources.sort((a, b) => { return b.count - a.count })
      this.sources = sources
    },
    expandArticles() {
      this.collapsedArticles = false
    },
    triggerResponsiveChanges() {
      if (window.innerWidth <= BREAKPOINTS.SMALL) {
        this.isMobile = true
        this.collapsedArticles = true
      } else {
        this.isMobile = false
        this.collapsedArticles = false
      }
    },
    scrollToTop() {
      this.$refs.modalBody.scrollTop = 0
      this.$refs.articlesPanel.scrollTop = 0
      this.$refs.dataPanel.scrollTop = 0
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/_variables.scss';

.c-Modal {
  position: fixed;
  top: 0;
  right: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  background: $dark-trans;
  transition: opacity .5s;
  z-index: -1;

  &.isVisible {
    opacity: 1;
    transition: opacity .5s;
    z-index: 100;
  }

  @media #{$medium} {
    padding-left: 0;

    &--body {
      background: $dark;
    }
  }
}

.c-ModalBody {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  background: $gray-light;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.c-ModalSection {
  position: relative;
  display: block;
  width: 50%;
  max-height: 100%;
  overflow: auto;
  background: $gray-dark;

  &:first-of-type {
    border-right: 1px solid $gray-dark;
  }

  &--topSection {
    padding: 1em 1em 0;
    background: $gray-light;
  }

  &__mainSection {
    @extend .c-ModalSection;
    position: relative;
    padding: .5em 0 .5em .5em;
    // background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAGUlEQVQIW2NkYGD4z8DAwMiABFA4MHEKBQFmoAEGdnHj3wAAAABJRU5ErkJggg==);
    // background-repeat: repeat;

    &--action {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: .5em 1em;
      bottom: 0;
      background: $white;
      width: 100%;
      box-shadow: 0px -10px 15px 0px rgba(255,255,255,1);
    }

    @media #{$medium} {
      &--articlesWrapper {
        &.isCollapsed {
          overflow: hidden;
          max-height: 450px;
          overflow: hidden;
        }
      }
    }
    @media #{$small} {
      padding: .5em;
    }
  }

  &__subNav {
    position: absolute;
    top: 0;
    display: flex;
    padding: .5em .5em 0 .5em;
    background: $gray-dark;
    border-bottom: 1px solid $gray-dark;
    width: 100%;
    z-index: 1;
  }

  &__subNavPill {
    padding: .5em 1em;

    &.isActive {
      background: $gray-light;
    }
  }

  &__panel {
    display: none;
    &.isActive {
      display: block;
    }
  }

  @media #{$small} {
    width: 100%;
    max-height: initial;
  }
}

.c-Metrics {
  display: flex;
  position: relative;
  justify-content: space-between;
  z-index: 10;

  &--metric {
    padding: 1em;
    margin: .5em 1em;
    background: $white;
    width: 100%;
  }
  &--metricValue{
    margin-bottom: 5px;
  }
  &--metricLabel{
    color: $gray-dark;
  }
}

.c-Charts {
  display: flex;
  flex-wrap: wrap;
  // padding: 2.75em .5em 0 .5em;
  padding: .5em;

  &--mainChart,
  &--secondaryChart {
    padding: 1em;
    border-bottom: 1px solid $gray-dark;
    background: $gray-light;
  }

  &--mainChart {
    width: 100%;
  }

  &--secondaryChart {
    width: 50%;
    &:nth-of-type(3n) {
      border-left: 1px solid $gray-dark;
    }
    @media #{$medium} {
      width: 100%;
    }
  }

  &---tooltip {
    display: block;
    background: $dark;
    color: $white;
    border-radius: 4px;
    padding: 5px 10px;
  }

  &--serieWrapper {
    display: block;
  }

  &--serie {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &--seriesColor {
    display: inline-block;
    height: 10px;
    width: 10px;
    border: 1px solid $white;
    margin-right: 5px;
    border-radius: 50%;
  }

  &--tooltipLabel {
    font-weight: bold;
    margin-bottom: .5em;
  }
}

.c-Social {
  margin-top: .5em;

  &--mobile {
    @extend .c-Social;
    padding: 0 .5em;
  }
}

.c-Sources {
  background: $gray-dark;
  padding: 0 .5em;
}

.sources, .keywords{
  z-index: 10;
}

.sources{
  position: relative;
}

</style>
