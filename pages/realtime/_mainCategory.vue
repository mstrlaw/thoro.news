<template>
  <div class="page">
    <div class="container w-100">
      <List
        :options="listOptions"
        :extra-classes="'w-100'"
      />
    </div>
  </div>
</template>

<script>
import List from '@/components/listing/List'

export default {
  name: 'RealtimeFeed',
  layout: 'wallLayout',
  components: {
    List
  },
  data() {
    return {
      username: this.$store.getters.getUserName,
      articles: [],
      listOptions: {
        category: this.$router.currentRoute.params.mainCategory,
        subcategory: '',
        sortField: 'articlePublishDate',
        sortOrder: -1,
        limit: 25
      }
    }
  },
  mounted() {
    this.$store.dispatch(
      'saveCurrentCategory',
      this.$router.currentRoute.params.mainCategory
    )
    this.$store.dispatch('saveDashboardType', 'realtime')
    this.$store.commit('setDashboardActions', true)
    this.$store.commit('setShowOrderAction', false)
    this.$store.commit('setBreadcrumbs', false)
    this.$store.commit('setShowDataActions', false)
  }
}
</script>
