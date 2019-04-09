<template>
  <div :class="extraClass" class="chart-wrapper">
    <canvas
      :id="chartId"
      class="chart"
    />
  </div>
</template>

<script>
import moment from 'moment'
import Chart from 'chart.js'

export default {
  name: 'LineChart',
  props: {
    /**
      * Used to reference the canvas for chart initialization
    */
    chartId: {
      type: String,
      default: 'lineChart'
    },
    /**
      * Used to pass arbitrary classes to the chart's wrapper element
    */
    extraClass: {
      type: String,
      default: ''
    },
    /**
      * Specifies how many days should be accounted when preparing the chart's series' data
    */
    maxDays: {
      type: Number,
      default: 7
    },
    /**
      * The data to be plotted
    */
    chartData: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
      * Regular chart.js options to style/manipulated the chart
    */
    chartOptions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
      * Used to indicate we want to load the article's data of series' points when hovered
    */
    loadArticles: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chartInstance: null,
      localData: [],
      localOptions: []
    }
  },
  watch: {
    chartData() {
      this.initChart()
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      if (this.chartData.length > 0) {
        this.prepareChartData()
      } else if (this.chartInstance) {
        this.localData = []
        this.chartInstance.destroy()
      }
    },
    prepareChartData() {
      const startDate = moment().subtract(this.maxDays, 'days')
      const days = this.maxDays

      const sourceData = []
      const articleData = []
      const dataLabels = []

      const articleIDs = []

      let maxY = 0

      for (let i = 0; i <= days; i++) {
        const date = startDate.format('DD-MM-YYYY')

        const dayData = this.chartData.filter(item => {
          return item.day === date
        })

        dataLabels.push(date)

        if (dayData.length > 0) {
          const source = dayData[0].sourcesCount
          const article = dayData[0].articlesCount

          if (source > maxY) {
            maxY = source
          }
          if (article > maxY) {
            maxY = article
          }

          sourceData.push(source)
          articleData.push(article)

          articleIDs.push(dayData[0].articles)
        } else {
          sourceData.push(0)
          articleData.push(0)
          articleIDs.push([])
        }

        startDate.add(1, 'days')
      }

      this.localData = {
        maxY: maxY,
        data: {
          labels: dataLabels,
          datasets: [
            {
              label: 'Articles',
              data: articleData,
              articles: articleIDs,
              fill: false,
              borderColor: '#383aa7',
              backgroundColor: '#383aa7',
              dataType: 'articles',
              pointHitRadius: 20
            },
            {
              label: 'Sources',
              data: sourceData,
              fill: false,
              borderColor: '#ffbbb2',
              backgroundColor: '#ffbbb2',
              dataType: 'sources',
              pointHitRadius: 20
            }
          ]
        }
      }

      this.prepareChartOptions()

      this.drawChart()
    },
    prepareChartOptions() {
      if (this.chartOptions.chartType === 'sources') {
        this.localOptions = this.chartOptions

        this.localOptions.tooltips.callbacks = {
          label: tooltipItem => {
            const datasets = this.localData.data.datasets

            if (
              this.loadArticles &&
              datasets[tooltipItem.datasetIndex].dataType === 'articles'
            ) {
              this.handleHover(
                'loadArticles',
                datasets[tooltipItem.datasetIndex].articles[tooltipItem.index]
              )
            }

            return tooltipItem.yLabel > 0
              ? datasets[tooltipItem.datasetIndex].label +
                  ': ' +
                  tooltipItem.yLabel
              : datasets[tooltipItem.datasetIndex].label + ': 0'
          }
        }
      }
    },
    drawChart() {
      const ctx = document.getElementById(this.chartId)

      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: this.localData.data,
        options: this.localOptions
      })
    },
    // API Call to load more articles' data when hovering a point
    handleHover(type, data) {
      switch (type) {
        case 'loadArticles':
          if (data.length > 0) {
            this.$store
              .dispatch('getArticle', { articleId: data })
              .then(res => {
                const articles = res.data.sort((a, b) => {
                  return (
                    new Date(b.articlePublishDate) -
                    new Date(a.articlePublishDate)
                  )
                })

                this.$emit('loadedData', {
                  type: 'articles',
                  data: articles
                })
              })
          } else {
            this.$emit('loadedData', {
              type: 'articles',
              data: []
            })
          }
          break
      }
    }
  }
}
</script>
