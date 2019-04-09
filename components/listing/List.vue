<template>
  <div v-if="articles" :class="extraClasses" class="card list-wrapper">
    <div v-if="source !== ''" class="top-section">
      <div class="topics">
        <span v-if="source === 'medium'" class="topic">
          <Icon :icon="'medium'" /> Medium
        </span>
      </div>
    </div>
    <h4
      v-if="source === 'medium'"
      class="subtitle is-size-6 has-text-grey push-bottom-10"
    >
      Trending on
      <a href="http://medium.com" target="_blank" class="highlighted link blue">
        medium.com&nbsp;
        <small><Icon :icon="'open-in-new'"/></small>
      </a>
    </h4>
    <table class="table is-fullwidth article-list is-hoverable">
      <tbody>
        <tr v-for="article in articles" :key="article._id">
          <ListItem :article="article" />
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    Empty
  </div>
</template>

<script>
import ListItem from '@/components/listing/items/ListItem'

export default {
  name: 'List',
  components: {
    ListItem
  },
  props: {
    /**
      * Set of options to sepecify which data to load from the API
    */
    options: {
      type: [Object, Array],
      default: () => {
        return {}
      }
    },
    /**
      * Additional class names we wish to use to style the component
    */
    extraClasses: {
      type: String,
      default: ''
    },
    /**
      * The source of data we're listing. Possible values: empty (default), 'medium' or 'twitter'.
    */
    source: {
      type: String,
      default: ''
    },
    /**
      * Indicates if data should load once the component is mounted.
    */
    autoLoadArticles: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      articles: []
    }
  },
  // watch: {
  //   options() {
  //     if (!this.autoLoadArticles) {
  //       this.articles = this.options
  //     }
  //   }
  // },
  mounted() {
    if (this.autoLoadArticles) {
      this.loadArticles()
    } else {
      this.articles = this.options
    }
  },
  methods: {
    loadArticles(options) {
      this.$store
        .dispatch('GET_ARTICLE', {
          articleId: [],
          options: this.options
        })
        .then(res => {
          this.articles = res.data
        })
    }
  }
}
</script>

<style lang="scss">
.article-list {
  background: transparent;
  .article-item {
    padding: 0.5em 0;
    a {
      &:hover {
        color: black;
      }
    }
  }
}
</style>
