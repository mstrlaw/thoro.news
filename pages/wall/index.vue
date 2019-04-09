<template>
  <div class="page">
    <div class="container is-widescreen" />
  </div>
</template>

<script>
export default {
  name: 'MainFeed',
  created() {
    this.$router.push({ name: 'index' })
  }
}
</script>
