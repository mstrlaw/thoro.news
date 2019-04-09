<template>
  <div v-if="tweets" class="card list-wrapper display-half">
    <div class="top-section">
      <div class="topics">
        <span class="topic">
          <Icon :icon="'twitter'" />&nbsp;&nbsp;Twittersphere
        </span>
      </div>
    </div>
    <h4 class="subtitle is-size-6 has-text-grey push-bottom-10">
      What's said on
      <a
        href="http://twitter.com"
        target="_blank"
        class="highlighted link blue center-flex"
      >
        twitter.com<Icon :icon="'open-in-new'" />
      </a>
    </h4>
    <table class="table is-fullwidth article-list is-hoverable">
      <tbody>
        <tr v-for="tweet in tweets" :key="tweet.id">
          <ListItem :source="'twitter'" :article="tweet" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ListItem from '@/components/listing/items/ListItem'

export default {
  name: 'TwitterList',
  components: {
    ListItem
  },
  props: {
    tweets: {
      type: Array,
      default: () => {
        return []
      }
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
