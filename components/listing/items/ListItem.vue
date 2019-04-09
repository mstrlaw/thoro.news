<template>
  <td v-if="source === 'twitter'" class="article-item">
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="article.user.profile_image_url_https" class="is-rounded" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <div class="headline">
            <a
              :href="'https://twitter.com/i/web/status/' + article.id_str"
              class="subtitle highlighted link yellow"
              target="_blank"
            >
              {{ article.text }}&nbsp;
              <small><Icon :icon="'open-in-new'"/></small>
            </a>
          </div>
          <div>
            <small>
              <time
                v-tooltip.bottom="
                  formatDate(article.created_at, 'MMM. Do, YYYY HH:mm')
                "
                :datetime="article.created_at"
              />
              {{ publishDate(article.created_at) }} by
              <a
                :href="'https://twitter.com/@' + article.user.screen_name"
                target="_blank"
                class="highlighted link pink center-flex"
              >
                {{ article.user.name }}&nbsp;
                <Icon
                  v-if="article.user.verified"
                  :icon="'check-decagram'"
                  :class="'has-text-info'"
                />
              </a>
            </small>
          </div>
        </div>
      </div>
    </article>
  </td>
  <td v-else :class="article.domain" class="article-item">
    <div v-if="article.domain === 'medium.com'">
      <div class="headline">
        <a
          :href="article.url"
          class="subtitle highlighted link red"
          target="_blank"
        >
          {{ article.title }}&nbsp;
          <small><Icon :icon="'open-in-new'"/></small>
        </a>
      </div>
      <div>
        <small>
          <time
            v-tooltip.bottom="
              formatDate(article.articlePublishDate, 'MMM. Do, YYYY HH:mm')
            "
            :datetime="article.articlePublishDate"
            v-text="publishDate(article.articlePublishDate)"
          />
        </small>
      </div>
    </div>
    <div v-else>
      <div class="headline">
        <a
          v-tooltip.top-start="{
            content: description(article),
            classes: ['text-preview']
          }"
          :href="article.url"
          class="subtitle highlighted link blue"
          target="_blank"
          v-html="articleTitle(article, true)"
        />
      </div>
      <span class="tag is-light category is-capitalized">{{
        articleCategory
      }}</span>
      <div>
        <small>
          <time
            v-tooltip.bottom="
              formatDate(article.articlePublishDate, 'MMM. Do, YYYY HH:mm')
            "
            :datetime="article.articlePublishDate"
            v-text="publishDate(article.articlePublishDate)"
          />
          by
          <nuxt-link
            :to="{ name: 'sources-domain', params: { domain: article.domain } }"
            :class="'highlighted link red'"
            v-text="article.domain"
          />
        </small>
      </div>
    </div>
  </td>
</template>

<script>
import moment from 'moment'
import { formatters } from '@/mixins/formatters'

export default {
  name: 'ListItem',
  mixins: [formatters],
  props: {
    source: {
      type: String,
      default: ''
    },
    article: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    articleCategory() {
      if (this.article.mainCategory.length > 0) {
        return this.article.mainCategory[0].label
      } else {
        return 'N/A'
      }
    }
  },
  methods: {
    publishDate(date) {
      return moment(date).from(moment())
    },
    formatDate(date, format) {
      return moment(date).format(format)
    },
    description(article) {
      return article.description
    }
  }
}
</script>
