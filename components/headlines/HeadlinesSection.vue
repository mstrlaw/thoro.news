<template>
  <section
    ref="headlineSection"
    class="headline-section"
  >
    <div class="header">
      <h4>{{ title }}</h4>
    </div>

    <div class="headlines-body">
      <div
        v-for="(article, index) in articles"
        :key="article._id"
        :class="{ 'main-headline': index === 0 }"
        class="headline"
      >
        <!--nuxt-link :to="{ name:'sources-domain', params:{ domain: article.domain } }" :class="'highlighted link red'">{{ article.domain }}</nuxt-link-->
        <h3
          v-tooltip.top-start="{
            content: article.description,
            classes: ['text-preview']
          }"
          v-if="index === 0"
        >
          <a
            :href="article.url"
            rel="noreferrer"
            target="_blank"
            class="title has-text-left highlighted link blue"
          >
            {{ article.title }}&nbsp;
            <small><Icon :icon="'open-in-new'"/></small>
          </a>
        </h3>
        <h5
          v-tooltip.top-start="{
            content: article.description,
            classes: ['text-preview']
          }"
          v-else
        >
          <a
            :href="article.url"
            rel="noreferrer"
            target="_blank"
            class="has-text-left highlighted link blue"
          >
            {{ article.title }}&nbsp;
            <small><Icon :icon="'open-in-new'"/></small>
          </a>
        </h5>
        <span
          v-tooltip.bottom="
            formatDate(article.articlePublishDate, 'MMM. Do, YYYY HH:mm')
          "
        >
          <time
            :datetime="article.articlePublishDate"
            v-text="publishDate(article.articlePublishDate)"
          />
        </span>
        by
        <nuxt-link
          :to="{ name: 'sources-domain', params: { domain: article.domain } }"
          :class="'highlighted link red'"
          v-text="article.domain"
        />
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import inView from 'element-in-view'

export default {
  name: 'HeadlinesSection',
  props: {
    title: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      required: true,
      default: 'all'
    },
    subcategory: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 4
    },
    triggerLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      articles: [],
      loadedArticles: false
    }
  },
  watch: {
    triggerLoad() {
      if (inView(this.$refs.headlineSection) && !this.loadedArticles) {
        console.log('triggered headline loading')
        this.loadArticles()
      }
    }
  },
  methods: {
    loadArticles() {
      this.loadedArticles = true
      this.$store
        .dispatch('getArticle', {
          articleId: [],
          options: {
            category: this.category,
            subcategory: this.subcategory,
            sortField: 'articlePublishDate',
            sortOrder: -1,
            limit: this.limit
          }
        })
        .then(res => {
          this.articles = res.data
        })
    },
    publishDate(date) {
      return moment(date).from(moment())
    },
    formatDate(date, format) {
      return moment(date).format(format)
    }
  }
}
</script>
