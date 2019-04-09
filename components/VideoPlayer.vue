<template>
  <div id="videoPlayer" class="video-player card">
    <div class="top-section">
      <div class="topics w-100">
        <v-popover offset="16" class="topic">
          <a
            href="#"
            class="tooltip-target"
            @click.prevent
          ><Icon :icon="'television'" />&nbsp;Live:
            {{ selectedChannel.name }}</a
            >

          <template slot="popover">
            <ul class="sources-list">
              <li v-for="channel in channels" :key="channel.uri">
                <a
                  v-close-popover
                  :data-name="channel.name"
                  :data-channel="channel.channelId"
                  href="#"
                  class="channel text-white"
                  @click.prevent="changeChannel(channel.channelId)"
                >{{ channel.name }}</a
                >
              </li>
            </ul>
          </template>
        </v-popover>
      </div>
    </div>

    <div class="player-wrapper">
      <div class="player-overlay">
        <div class="controls">
          <a
            href="#"
            class="control"
            title="Click video to pause/play"
            @click.prevent="toggleVideo"
          >
            <Icon v-if="isPlaying" :icon="'pause'" />
            <Icon v-if="!isPlaying" :icon="'play'" />
          </a>
          <a
            id="toggleSound"
            href="#"
            data-current="volume"
            class="control"
            title="Toggle audio on/off"
            @click.prevent="toggleSound"
          >
            <Icon v-if="isMuted" :icon="'volume-off'" />
            <Icon v-if="!isMuted" :icon="'volume-high'" />
          </a>
          <v-popover offset="16" class="control channel push-left-auto">
            <a
              href="#"
              class="tooltip-target"
              @click.prevent
            >Channels<Icon
              :icon="'chevron-up'"
            /></a>

            <template slot="popover">
              <ul class="sources-list">
                <li v-for="channel in channels" :key="channel.uri">
                  <a
                    v-close-popover
                    :data-name="channel.name"
                    :data-channel="channel.channelId"
                    href="#"
                    class="channel text-white"
                    @click.prevent="changeChannel(channel.channelId)"
                  >{{ channel.name }}</a
                  >
                </li>
              </ul>
              <!--a v-close-popover>Close</a-->
            </template>
          </v-popover>
          <!--a id="closePlayer" href="#" class="ml-auto control playerTooltip" title="Close player">
            <i class="fa fa-times-circle" />
          </a>
          <a id="decreasePlayerSize" href="#" class="control playerTooltip" title="Decrease player size">
            <i class="fa fa-minus-circle" />
          </a>
          <a id="increasePlayerSize" href="#" class="control playerTooltip" title="Increase player size">
            <i class="fa fa-plus-circle" />
          </a-->
        </div>
      </div>
      <div id="player" />
    </div>

    <!-- player toggle -->
    <!--div id="playerToggle" class="toggle-player" title="Watch live news"><i class="fas fa-tv fa-lg" /></div-->
  </div>
</template>

<script>
const YTPlayer = require('yt-player')
export default {
  name: 'VideoPlayer',
  data() {
    return {
      player: null,
      muted: true,
      playing: true,
      channels: [
        {
          name: 'Loading..',
          active: true
        }
      ]
    }
  },
  computed: {
    isMuted() {
      return this.muted
    },
    isPlaying() {
      return this.playing
    },
    selectedChannel() {
      return this.channels.filter(item => {
        return item.active === true
      })[0]
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$axios
        .get(process.env.CHANNEL_LIST, {
          headers: {
            'secret-key': process.env.JSON_BIN_KEY
          }
        })
        .then(res => {
          this.channels = res.data
          this.initPlayer()
        })
    },
    initPlayer() {
      this.player = new YTPlayer('#player', {
        controls: false,
        autoplay: true,
        related: false,
        annotations: false
      })

      this.player.mute()

      this.player.load(this.selectedChannel.channelId)

      this.player.play()

      this.player.on('playing', () => {
        // this.$toast.success('OK')
      })
    },
    changeChannel(channelId) {
      const newIndex = this.channels.findIndex(i => i.channelId === channelId)
      for (let i = 0; i < this.channels.length; i++) {
        if (i === newIndex) {
          this.channels[i].active = true
        } else {
          this.channels[i].active = false
        }
      }

      this.player.load(channelId)
      this.player.play()
    },
    toggleVideo() {
      if (this.playing) {
        this.player.pause()
        this.playing = false
      } else {
        this.player.play()
        this.playing = true
      }
    },
    toggleSound() {
      if (this.player.isMuted()) {
        this.muted = false
        this.player.unMute()
      } else {
        this.muted = true
        this.player.mute()
      }
    }
  }
}
</script>
