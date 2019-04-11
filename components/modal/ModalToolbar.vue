<template>
  <div class="dialog-header">
    <div class="controls">
      <h3 class="info tag">
        <Icon :icon="'label-outline'" />
        <span class="context">{{ theme }}</span>
      </h3>
      <a
        :data-article="article._id"
        href="#"
        class="action prev"
        title="Previous article"
        @click.prevent="navigate('prev', article._id)"
      >
        <Icon :icon="'chevron-left'" />
        <span class="context">Prev</span>
      </a>
      <span class="action">{{ indexPreview }}</span>
      <a
        :data-article="article._id"
        href="#"
        class="action next"
        title="Next article"
        @click.prevent="navigate('next', article._id)"
      >
        <span class="context">Next</span> &nbsp;
        <Icon :icon="'chevron-right'" />
      </a>
    </div>
    <a
      href="#"
      class="close"
      @click.prevent="closeDialog"
    >
      <span />
      <span />
      <span />
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ModalToolbar',
  props: {
    article: {
      type: Object,
      default: () => {
        return {}
      }
    },
    theme: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      scrollPos: 'scrollPosition',
      dialogState: 'dialogState',
      indexPreview: 'indexPreview'
    })
  },
  watch: {
    dialogState() {
      if (this.dialogState) {
        window.addEventListener('keydown', this.handleKeyNavigation)
      } else {
        window.removeEventListener('keydown', this.handleKeyNavigation)
      }
    }
  },
  methods: {
    handleKeyNavigation(e) {
      let id

      switch (e.keyCode) {
        // Right key
        case 37:
          id = document
            .getElementsByClassName('action prev')[0]
            .getAttribute('data-article')
          this.navigate('prev', id)
          break

        // Left key
        case 39:
          id = document
            .getElementsByClassName('action next')[0]
            .getAttribute('data-article')
          this.navigate('next', id)
          break

        // Excape key
        case 27:
          this.closeDialog()
          break
      }
    },
    navigate(direction, articleId) {
      this.$store
        .dispatch('navigateAdjacentArticle', {
          direction: direction,
          currentArticleId: articleId
        })
        .then(() => {
          document.getElementsByClassName('dialog-body')[0].scrollIntoView()
        })
    },
    closeDialog() {
      this.$store.dispatch('setDialogState', false)
      this.$store.dispatch('saveClusterTweets', [])
      this.$store.dispatch('setClusterTrendData', [])
      this.$store.commit('resetSelectedCluster')

      setTimeout(() => {
        window.scrollTo(0, this.scrollPos)
      }, 0)
    }
  }
}
</script>
