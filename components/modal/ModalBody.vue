<template>
  <div>
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
  </div>
</template>

<script>
import moment from 'moment'
import { stringUtils } from '@/mixins/stringUtils'
import { formatters } from '@/mixins/formatters'

export default {
  name: 'ModalBody',
  mixins: [stringUtils, formatters],
  props: {
    article: {
      type: Object,
      default: () => {
        return {}
      }
    },
    hasMedia: {
      type: [String, Boolean],
      default: false
    }
  },
  methods: {
    publishDate(date) {
      return moment(date).format('DD MMM \'YY')
    }
  }
}
</script>
