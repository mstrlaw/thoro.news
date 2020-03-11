<template>
  <div
    :class="{ 'open': isOpen }"
    class="c-SourceItem"
  >
    <div
      class="c-SourceItem--header"
      @click.prevent="toggleArticles"
    >
      <span
        class="c-SourceItem--source"
        target="_blank"
      >
        {{ source.domain }}&nbsp;
        <Icon :icon="isOpen ? 'chevron-up' : 'chevron-down'" />
      </span>

      <div class="c-SourceItem--sourceMeta">
        <div
          v-tooltip.top="'Sentiment'"
          class="tag is-light"
        >
          <Icon :icon="sentimentIcon(source.sentiment)" />&nbsp;
          {{ source.sentiment }}
        </div>
        <div
          v-tooltip.top="'Articles'"
          class="tag is-light"
        >
          <Icon :icon="'note-outline'" />&nbsp;
          {{ source.articles.length }}
        </div>
        <div
          v-tooltip.top="`Bias: ${biasLongName(source.bias)}`"
          class="tag is-light"
        >
          {{ biasShortName(source.bias) }}
        </div>
      </div>
    </div>

    <div class="c-SourceItem--articles">
      <div
        v-for="article in source.articles"
        :key="article._id"
        class="c-SourceItem--article"
      >
        <a
          :href="article.url"
          target="_blank"
          class="c-SourceItem--title"
        >
          {{ article.title }}&nbsp;
          <Icon :icon="'open-in-new'" />
        </a>

        <div class="c-SourceItem--meta">
          <small class="tag is-light">
            <Icon :icon="'clock-outline'" />
            <time
              v-tooltip.top="formatDate(article.articlePublishDate, 'MMM. Do, YYYY HH:mm')"
              :datetime="article.articlePublishDate"
              v-text="publishDate(article.articlePublishDate)"
            />
          </small>
          <small class="tag is-light" >
            <Icon :icon="sentimentIcon(article.sentiment)" />&nbsp;
            {{ article.sentiment }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatters } from '@/mixins/formatters'

export default {
  name: 'SourceItem',
  mixins: [
    formatters
  ],
  props: {
    source: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleArticles() {
      this.isOpen = !this.isOpen
    },
    sentimentIcon(value) {
      if (value > 0.5) {
        return 'arrow-up'
      } else if (value < 0.5) {
        return 'arrow-down'
      } else if (value === 0.5) {
        return 'minus'
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/_variables.scss';

.c-SourceItem {
  $parent: &;
  text-decoration: none;
  width: 100%;

  &:last-of-type {
    margin-bottom: 3.5em;
  }

  &:nth-of-type(2n) {
    #{$parent}--header {
      background-color: $gray-lighter;
    }
  }

  &:hover {
    #{$parent}--header {
      cursor: pointer;
      background-color: darken($gray-lighter, 5%);
      transition: background-color .2s;
    }
  }

  &.open{
    box-shadow: inset 0px 1px 0px 0px rgba(225,230,244,1),
                inset 0px -1px 0px 0px rgba(225,230,244,1),
                inset 1px 0px 0px 0px rgba(225,230,244,1),
                inset -1px 0px 0px 0px rgba(225,230,244,1);
    #{$parent}--header {
      background-color: $gray-lighter;
    }
    #{$parent}--articles {
      display: block;
      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: $gray-dark;
        margin-top: .75em;
      }
    }
  }

  &--header {
    padding: 15px;
  }

  &--header {
    display: flex;
    justify-content: space-between;
    background-color: $gray-light;
    transition: background-color .2s;
  }

  &--source {
    display: flex;
    align-items: center;
    font-weight: bold;
  }

  &--sourceMeta {
    display: flex;
    .tag {
      margin-left: .5em;
    }
  }

  &--articles {
    display: none;
    padding: .5em .5em .5em 1.5em;
    background-color: $gray-lighter;
  }

  &--article {
    margin-bottom: .3em;
  }

  &--title {
    display: inline;
    margin-bottom: 0.5em;

    &:hover {
      color: $dark;
    }
  }

  &--meta {
    display: flex;
    align-items: center;
    padding-top: .5em;
    .tag {
      margin-right: .5em;
    }
  }
}
.source, .word{

  .articles{

    .article-link{
      text-decoration: none;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>
