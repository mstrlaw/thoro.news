<template>
  <div
    id="searchResults"
    :class="{ visible: searchResults.length > 0 || emptyResults }"
    class="search-results"
  >
    <div v-if="!emptyResults" class="headlines m-0 p-0">
      <div class="result-stats">
        <h4 class="subtitle">{{ searchResults.length }} results</h4>
      </div>
      <div v-for="result in searchResults" :key="result._id" class="result">
        <span class="headline">
          <a :href="result.url" target="_blank" class="highlighted link blue">
            {{ result.title }}&nbsp;
            <i class="mdi mdi-open-in-new" />
          </a>
        </span>
        <div class="d-flex">
          <span class="source-content">
            <small>
              <time
                v-tooltip.bottom="
                  formatDate(result.articlePublishDate, 'MMM. Do, YYYY HH:mm')
                "
                :datetime="result.articlePublishDate"
                v-text="publishDate(result.articlePublishDate)"
              />
              by
              <nuxt-link
                :to="{
                  name: 'sources-domain',
                  params: { domain: result.domain }
                }"
                :class="'highlighted link red'"
                v-text="result.domain"
              />
            </small>
          </span>
          <span
            v-if="result.mainCategory.length > 0"
            class="tag category is-capitalized push-left-auto"
            v-text="articleCategory(result)"
          />
        </div>
      </div>
    </div>
    <div v-else>No results found for {{ searchQuery }}</div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'NavigationResults',
  props: {
    searchQuery: {
      type: String,
      default: ''
    },
    searchResults: {
      type: Array,
      default: () => {
        return []
      }
    },
    emptyResults: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    resultDate(date) {
      return moment(date).format('MMM. Do, YYYY')
    },
    publishDate(date) {
      return moment(date).from(moment())
    },
    formatDate(date, format) {
      return moment(date).format(format)
    },
    articleCategory(article) {
      return article.mainCategory.length > 0
        ? article.mainCategory[0].label
        : 'Unknown'
    }
  }
}
</script>
