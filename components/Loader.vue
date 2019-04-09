<template>
  <div v-if="appLoading" class="page-loader">
    <div class="load-wrapper">
      <div class="loader"><span /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  computed: {
    appLoading() {
      return this.$store.getters.appLoading
    }
  }
}
</script>
