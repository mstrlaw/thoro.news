<template>
  <div class="body-header">
    <div
      :style="{
        'background-image': 'url(' + article.urlToMedia + ')',
        transform: 'translateY(-' + yPos + 'px)'
      }"
      class="image"
    />
  </div>
</template>

<script>
export default {
  name: 'Modalheader',
  props: {
    article: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      yPos: 0,
      dialogInnerContentEl: null
    }
  },
  computed: {
    dialogState() {
      return this.$store.getters.dialogState
    }
  },
  mounted() {
    if (process.browser) {
      this.dialogInnerContentEl = document.getElementsByClassName(
        'inner-dialog'
      )[0]
      this.dialogInnerContentEl.addEventListener('scroll', this.applyParallax)
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.applyParallax)
  },
  methods: {
    applyParallax() {
      if (process.browser && this.dialogState) {
        this.yPos = this.dialogInnerContentEl.scrollTop * 0.2
      }
    }
  }
}
</script>
