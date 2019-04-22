<template>
  <div
    :class="{ visible: dialogState }"
    class="dialog-modal"
  >
    <ModalToolbar
      :article="article"
      :theme="clusterTheme"
    />

    <div :class="{ 'has-media': hasMedia }" class="inner-dialog">
      <div class="dialog-body">

        <ModalHeader :article="article" />

        <ModalBody
          :article="article"
          :has-media="hasMedia"
        />

        <div class="extra-content">

          <ModalChart :theme="clusterTheme" />

          <TwitterList :tweets="clusterTweets" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import ModalToolbar from '@/components/modal/ModalToolbar'
import ModalHeader from '@/components/modal/ModalHeader'
import ModalBody from '@/components/modal/ModalBody'

import ModalChart from '@/components/modal/ModalChart'
import TwitterList from '@/components/listing/TwitterList'

import { mapGetters } from 'vuex'
// import { themeWordCloud } from '@/mixins/themeWordCloud'

export default {
  name: 'Modal',
  components: {
    ModalToolbar,
    ModalHeader,
    ModalBody,
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
  computed: {
    ...mapGetters({
      dialogState: 'modal/dialogState',
      article: 'modal/selectedArticle',
      selectedCluster: 'modal/selectedCluster',
      clusterTweets: 'modal/clusterTweets'
    }),
    clusterTheme() {
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
  }
}
</script>
