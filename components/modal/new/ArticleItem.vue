<template>
  <div class="c-ArticleItem">
    <div
      v-if="displayMedia"
    >
      <div
        v-if="hasMedia"
        :style="{
          'background-image': 'url(' + cleanMediaURL + ')',
        }"
        class="c-ArticleItem--media"
      />
      <div
        v-else
        class="c-ArticleItem--noMedia"
      >
        <Icon :icon="'image-off'" />
      </div>
    </div>
    <div class="c-ArticleItem--body">
      <div class="c-ArticleHeader">
        <p
          class="c-ArticleHeader--title"
          v-html="articleTitle(article)"
        />
        &nbsp;
        <a
          :href="url"
          class="cta button is-small is-white shadow"
          target="_blank"
        >Read&nbsp;<Icon :icon="'open-in-new'" />
        </a>
      </div>
      <div class="c-ArticleDescription">
        <p>{{ trimmedDescription }}</p>
      </div>
      <div class="c-ArticleItem--meta">
        <small class="c-ArticleItem--metaData c-ArticleItem--source">
          <Icon :icon="'newspaper'" />
          {{ domain }}
        </small>
        <small class="c-ArticleItem--metaData c-ArticleItem--bias">
          <div
            v-tooltip.top="`Bias: ${biasLongName(bias)}`"
            class="tag"
          >
            {{ biasShortName(bias) }}
          </div>
        </small>
        <small class="c-ArticleItem--metaData">
          <Icon :icon="'clock-outline'" />
          <time
            v-tooltip.top="formatDate(articlePublishDate, 'MMM. Do, YYYY HH:mm')"
            :datetime="articlePublishDate"
            v-text="publishDate(articlePublishDate)"
          />
        </small>

      </div>
    </div>
  </div>
</template>

<script>
import { formatters } from '@/mixins/formatters'

export default {
  name: 'ArticleItem',
  mixins: [
    formatters
  ],
  props: {
    article: {
      type: Object,
      required: true,
      default: () => ({})
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    domain: {
      type: String,
      default: '',
      required: true
    },
    articlePublishDate: {
      type: String,
      default: '',
      required: true
    },
    url: {
      type: String,
      default: '',
      required: true
    },
    urlToMedia: {
      type: String,
      default: '',
      required: true
    },
    bias: {
      type: String,
      default: ''
    },
    factual: {
      type: String,
      default: ''
    }
  },
  computed: {
    displayMedia() {
      return true
    },
    hasMedia() {
      if (
        this.urlToMedia !== '' &&
        typeof this.urlToMedia !== 'undefined'
      ) {
        //  Avoid tracking pixels
        if (this.urlToMedia.indexOf('rss-pixel') < 0) {
          return this.urlToMedia
        } else {
          return false
        }
      } else {
        return false
      }
    },
    cleanMediaURL() {
      return encodeURI(this.urlToMedia)
    },
    trimmedDescription() {
      return this.description.length > 150 ? `${this.description.slice(0, 147)}...` : this.description
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import '@/assets/css/_variables.scss';

.c-ArticleItem {
  display: flex;
  width: 100%;
  padding: 1em;
  border-bottom: 1px solid #EEE;
  transition: background 0.3s cubic-bezier(.25,.8,.25,1);
  background: $gray-light;

  &:last-of-type {
    margin-bottom: 3.4em;
    @media #{$small} {
      margin-bottom: 0;
    }
  }

  &--media,
  &--noMedia {
    width: 120px;
    height: auto;
    min-height: 120px;
    min-width: 120px;
    margin-right: .5em;
  }

  &--media {
    display: block;
    background-size: cover;
    border-radius: 2px;
  }

  &--noMedia {
    display: flex;
    align-items: center;
    background: #FFF;
    .mdi {
      margin: 0 auto;
    }
  }

  &--body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }

  &--meta,
  &--metaData {
    display: flex;
    align-items: center;
    margin-right: .5em;
  }

  &--meta {
    margin-top: auto;
  }

  &--metaData {
    .mdi {
      margin-right: .2em;
    }
  }

  &--source,
  &--bias {
    font-weight: bold;
  }
  &--bias {
    .tag {
      max-width: 24px;
      background-color: $gray-dark;
      &:hover {
        cursor: help;
      }
    }
  }
}

.c-ArticleHeader {
  display: flex;
  justify-content: space-between;

  &--title {
    font-size: 1.2em;
    font-weight: bold;
    line-height: 1.1em;
  }
}
</style>
