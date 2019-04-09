<template>
  <div class="page">
    <div class="container is-widescreen" />
  </div>
</template>

<script>
export default {
  name: 'CategoryTrends',
  layout: 'loggedLayout',
  created() {
    this.$router.push({
      name: 'trends-mainCategory',
      params: { mainCategory: 'world' }
    })
  }
}
</script>
