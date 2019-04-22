<template>
  <div class="container">
    <footer class="simple-footer">
      <!--div class="footer-links">
        <nuxt-link
          :to="{ name: 'sources' }"
          class="highlighted link blue"
          v-text="'Sources'"
        />
        <nuxt-link
          :to="{ name: 'about' }"
          class="highlighted link blue"
          v-text="'About'"
        />
      </div-->
      <div class="status push-left-auto push-right-25">
        <span v-tooltip.position-top="appMessage">
          <Icon :class="appClass" :icon="'checkbox-blank-circle'" />&nbsp;App
        </span>
        <span v-tooltip.position-top="getterMessage">
          <Icon
            :class="getterClass"
            :icon="'checkbox-blank-circle'"
          />&nbsp;Getter
        </span>
        <span v-tooltip.position-top="cruncherMessage">
          <Icon
            :class="cruncherClass"
            :icon="'checkbox-blank-circle'"
          />&nbsp;Cruncher
        </span>
      </div>
      <span>Thoro News — {{ currentYear }}</span>
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
      cruncherMessage: ''
    }
  },
  computed: {
    currentYear() {
      return moment().format('YYYY')
    }
  },
  mounted() {
    this.loadStatus()
  },
  methods: {
    loadStatus() {
      console.log('load')
      // this.$axios
      //   .post('https://api.uptimerobot.com/v2/getMonitors', {
      //     api_key: process.env.UPTIME_ROBOT_KEY,
      //     format: 'json'
      //   })
      //   .then(res => {
      //     // console.log(res)
      //     if (typeof res.data.monitors !== 'undefined') {
      //       res.data.monitors.map(monitor => {
      //         const status = monitor.status
      //         let className = 'has-text-light'
      //         let message = 'Getting status..'

      //         if (status === 2) {
      //           className = 'has-text-success'
      //           message = 'Running'
      //         }
      //         if (status === 8) {
      //           className = 'has-text-warning'
      //           message = 'Intermittent'
      //         }
      //         if (status === 9) {
      //           className = 'has-text-danger'
      //           message = 'Down'
      //         }

      //         switch (monitor.friendly_name) {
      //           case 'APP':
      //             this.appClass = className
      //             this.appMessage = message
      //             break
      //           case 'GETTER':
      //             this.getterClass = className
      //             this.getterMessage = message
      //             break
      //           case 'CRUNCHER':
      //             this.cruncherClass = className
      //             this.cruncherMessage = message
      //             break
      //         }
      //       })
      //     }
      //   })
    }
  }
}
</script>
