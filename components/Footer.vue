<template>
  <div class="container">
    <footer class="simple-footer">
      <div class="footer-links">
        <div class="tag">
          <b>{{ sourcesCount }} Sources</b>
        </div>
        <span>&nbsp;</span>
        <div class="tag">
          <b>{{ articlesCount }} Articles</b>
        </div>
        <!--nuxt-link
          :to="{ name: 'sources' }"
          class="highlighted link blue"
          v-text="'Sources'"
        />
        <nuxt-link
          :to="{ name: 'about' }"
          class="highlighted link blue"
          v-text="'About'"
        /-->

      </div>
      <div class="status push-left-auto push-right-25">
        <span v-tooltip.position-top="appMessage">
          <Icon :class="appClass" :icon="'checkbox-blank-circle'" />
          &nbsp;App&nbsp;
        </span>
        <span v-tooltip.position-top="getterMessage">
          <Icon
            :class="getterClass"
            :icon="'checkbox-blank-circle'"
          />&nbsp;Getter&nbsp;
        </span>
        <span v-tooltip.position-top="cruncherMessage">
          <Icon
            :class="cruncherClass"
            :icon="'checkbox-blank-circle'"
          />&nbsp;Cruncher&nbsp;
        </span>
      </div>
      <span>Thoro News 2018 — {{ currentYear }}</span>
    </footer>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Footer',
  data() {
    return {
      appClass: '',
      appMessage: '',
      getterClass: '',
      getterMessage: '',
      cruncherClass: '',
      cruncherMessage: '',
      sourcesCount: 0,
      articlesCount: 0
    }
  },
  computed: {
    currentYear() {
      return moment().format('YYYY')
    }
  },
  mounted() {
    this.loadStatus()
    this.loadStats()
  },
  methods: {
    loadStatus() {
      this.$axios
        .post('https://api.uptimerobot.com/v2/getMonitors', {
          api_key: process.env.UPTIME_ROBOT_KEY,
          format: 'json'
        })
        .then(res => {
          if (typeof res.data.monitors !== 'undefined') {
            res.data.monitors.map(monitor => {
              const status = monitor.status
              let className = 'has-text-light'
              let message = 'Getting status..'

              if (status === 2) {
                className = 'has-text-success'
                message = 'Running'
              }
              if (status === 8) {
                className = 'has-text-warning'
                message = 'Intermittent'
              }
              if (status === 9) {
                className = 'has-text-danger'
                message = 'Down'
              }

              switch (monitor.friendly_name) {
                case 'APP':
                  this.appClass = className
                  this.appMessage = message
                  break
                case 'GETTER':
                  this.getterClass = className
                  this.getterMessage = message
                  break
                case 'CRUNCHER':
                  this.cruncherClass = className
                  this.cruncherMessage = message
                  break
              }
            })
          }
        })
    },
    loadStats() {
      this.$axios
        .get('https://api.thoro.news/api/stats/badges/sources.json')
        .then(res => {
          this.sourcesCount = res.data.message
        })

      this.$axios
        .get('https://api.thoro.news/api/stats/badges/articles.json')
        .then(res => {
          this.articlesCount = res.data.message
        })
    }
  }
}
</script>
