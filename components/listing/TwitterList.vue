<template>
  <div v-if="tweets" class="c-Card list-wrapper">
    <div class="top-section">
      <div class="tag is-dark"><Icon :icon="'twitter'" />&nbsp;&nbsp;<b>Twittersphere</b></div>
    </div>
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
