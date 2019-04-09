<template>
  <div class="page">
    <div class="container w-100">
      <List :options="listOptions" :extra-classes="'w-100'" />
    </div>
  </div>
</template>

<script>
import List from '@/components/listing/List'

export default {
  name: 'SourceList',
  layout: 'wallLayout',
  components: {
    List
  },
  data() {
    return {
      username: this.$store.getters.getUserName,
      articles: [],
      listOptions: {
        domain: this.$router.currentRoute.params.domain,
        sortField: 'articlePublishDate',
        sortOrder: -1,
        limit: 100
      }
    }
  },
  mounted() {
    this.$store.dispatch('setDialogState', false)
    this.$store.commit('setDashboardActions', false)
    this.$store.commit('setShowOrderAction', false)
    this.$store.commit('setShowDataActions', false)

    this.$store.commit('setBreadcrumbs', [
      {
        label: 'News Sources',
        name: 'sources',
        active: false
      },
      {
        label: this.$router.currentRoute.params.domain,
        name: '',
        active: true
      }
    ])
  }
}
</script>
