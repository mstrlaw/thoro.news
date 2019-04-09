<template>
  <div class="page">
    <div class="container is-widescreen" />
  </div>
</template>

<script>
export default {
  name: 'Realtime',
  layout: 'loggedLayout',
  created() {
    this.$router.push({
      name: 'realtime-mainCategory',
      params: { mainCategory: 'world' }
    })
  }
}
</script>
