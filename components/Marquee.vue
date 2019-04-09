<template>
  <div class="marquee-container">
    <no-ssr>
      <div :class="socketStatus" class="socker-status">
        <span class="button is-loading" />
      </div>
      <div class="marquee-wrap">
        <div
          v-if="marqueeType === 'LATEST_ARTICLES'"
          :style="{ 'animation-duration': animationDuration }"
          class="marquee"
        >
          <a
            v-tooltip.bottom="{
              content: item.description,
              classes: ['text-preview']
            }"
            v-for="item in items"
            :key="item._id"
            :href="item.url"
            target="_blank"
            class="item"
          >
            <small> {{ publishDate(item.date) }}&nbsp;</small>
            <b>{{ item.title }}</b>
            <small>
              &nbsp;{{ item.domain }}&nbsp;
              <Icon :icon="'open-in-new'" />
            </small>
          </a>
        </div>
        <div
          v-if="marqueeType === 'INDEX_DATA'"
          :style="{ 'animation-duration': animationDuration }"
          class="marquee"
        >
          <span
            v-for="item in items"
            :key="item._id"
            target="_blank"
            class="item"
          >
            <small> {{ item.name }}&nbsp;</small>
            <b>{{ parseFloat(item.open).toFixed(2) }}</b>
          </span>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import io from 'socket.io-client'
import moment from 'moment'

export default {
  name: 'Marquee',
  props: {
    marqueeType: {
      type: String,
      default: 'LATEST_ARTICLES'
    },
    socketData: {
      type: Object,
      default: () => {
        return {
          socket: null,
          socketUrl: process.env.API_ENDPOINT
        }
      }
    }
  },
  data() {
    return {
      socketLocalState: this.socketData,
      localSocket: this.socketData.socket,
      socketStatus: 'connecting',
      animationDuration: '200s',
      items: []
    }
  },
  created() {
    this.localSocket = io(this.socketData.socketUrl)
  },
  mounted() {
    if (process.browser) {
      this.localSocket.on('connect', () => {
        this.socketStatus = ''
        // this.$toast.success('Socket Connected')
      })

      this.localSocket.on('connect_error', () => {
        this.socketStatus = 'error'
      })

      this.localSocket.on('reconnecting', () => {
        this.socketStatus = 'reconnect'
        // this.$toast.info('Socket Reconnecting')
      })
    }
    this.localSocket.on(this.marqueeType, data => {
      this.items = data
      this.animationDuration = data.length * 10 + 's'
    })
  },
  destroyed() {
    try {
      this.localSocket.disconnect()
    } catch (err) {
      console.log('Error disconnecting socket')
      console.log(err)
    }
  },
  methods: {
    publishDate(date) {
      return moment(date).from(moment())
    }
  }
}
</script>
