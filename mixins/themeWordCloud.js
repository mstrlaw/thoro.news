/**
  Mixin to generate & order trending cluster terms in a word cloud
**/

const randVal = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

const getRandKey = () => {
  return randVal() + randVal()
}

const themeWordCloud = {
  data() {
    return {
      themeCloud: []
    }
  },
  methods: {
    setThemeCloud() {
      this.themeCloud = []
      let total = 0

      this.clusters.map(el => {
        total += el.themes[0].score
        el.themes[0].clusterID = el._id
        el.themes[0].clusterData = el
        this.themeCloud.push(el.themes[0])
      })
      this.themeCloud = this.themeCloud.sort((a, b) => {
        return b.score - a.score
      })

      this.themeCloud.map(el => {
        el.ratio = Math.round((el.score / total) * 1000) / 100
      })

      this.themeCloud.map(el => {
        el.class = ''
        if (el.ratio >= 0.8) {
          el.class = 'is-huge'
        } else if (el.ratio >= 0.6 && el.ratio < 0.8) {
          el.class = 'is-large'
        } else if (el.ratio >= 0.3 && el.ratio < 0.6) {
          el.class = 'is-medium'
        }
        el.key = getRandKey()
      })

      this.themeCloud = this.themeCloud.sort((a, b) => {
        return b.ratio - a.ratio
      })
    }
  }
}

export { themeWordCloud }
