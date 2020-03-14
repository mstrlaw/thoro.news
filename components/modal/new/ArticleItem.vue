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
        class="c-ArticleItem__media"
      />
      <div
        v-else
        class="c-ArticleItem__noMedia"
      >
        <Icon :icon="'image-off'" />
      </div>
    </div>
    <div class="c-ArticleItem__body">
      <div class="c-ArticleHeader">
        <a
          v-if="isMobile"
          :href="url"
          class="c-ArticleHeader--titleLink"
        >
          <span v-html="articleTitle(article)" />
          <Icon :icon="'open-in-new'" />
        </a>
        <p
          v-else
          class="c-ArticleHeader--title"
          v-html="articleTitle(article)"
        />
        <a
          v-if="!isMobile"
          :href="url"
          class="cta button is-small is-white shadow"
          target="_blank"
        >&nbsp;Read&nbsp;<Icon :icon="'open-in-new'" />
        </a>
      </div>
      <div class="c-ArticleDescription">
        <p>{{ trimmedDescription }}</p>
      </div>
      <div class="c-ArticleItem__meta">
        <small class="c-ArticleItem__metaData c-ArticleItem__source">
          <Icon :icon="'newspaper'" />
          {{ domain }}
        </small>
        <small class="c-ArticleItem__metaData c-ArticleItem__bias">
          <div
            v-tooltip.top="`Bias: ${biasLongName(bias)}`"
            class="tag"
          >
            {{ biasShortName(bias) }}
          </div>
        </small>
        <small class="c-ArticleItem__metaData">
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
import { BREAKPOINTS } from '@/utilities/breakpoints'

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
  data: () => ({
    displayMedia: true,
    isMobile: false
  }),
  computed: {
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
    triggerResponsiveChanges() {
      if (window.innerWidth <= BREAKPOINTS.SMALL) {
        this.displayMedia = false
        this.isMobile = true
      } else {
        this.displayMedia = true
        this.isMobile = false
      }
    }
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

  &__media,
  &__noMedia {
    width: 120px;
    height: auto;
    min-height: 120px;
    min-width: 120px;
    margin-right: .5em;
  }

  &__media {
    display: block;
    background-size: cover;
    border-radius: 2px;
  }

  &__noMedia {
    display: flex;
    align-items: center;
    background: #FFF;
    .mdi {
      margin: 0 auto;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }

  &__meta,
  &__metaData {
    display: flex;
    align-items: center;
    margin-right: .5em;
  }

  &__meta {
    margin-top: auto;
    @media #{$small} {
      margin-top: .5em;
    }
  }

  &__metaData {
    .mdi {
      margin-right: .2em;
    }
    @media #{$small} {
      &:last-of-type {
        margin-left: auto;
      }
    }
  }

  &__source,
  &__bias {
    font-weight: bold;
  }
  &__bias {
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

  &--title,
  &--titleLink {
    font-size: 1.2em;
    font-weight: bold;
    line-height: 1.1em;
  }
  &--titleLink {
    color: darken($blue, 10%);
    padding-bottom: .5em;
    &:hover {
      color: $blue;
    }
  }
}
</style>
