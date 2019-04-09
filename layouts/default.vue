<template>
  <div :class="{ 'expanded-nav': activeNav, 'open-dialog': activeDialog }">
    <Navigation />
    <div class="content-area">
      <div class="inner-content">
        <nuxt />
      </div>
    </div>
    <Footer />
    <Modal />
  </div>
</template>

<script>
import Navigation from '@/components/navigation/Navigation'
import Modal from '@/components/modal/Modal'
import Footer from '@/components/Footer'

export default {
  middleware: ['navigation'],
  components: {
    Navigation,
    Modal,
    Footer
  },
  head() {
    return {
      bodyAttrs: {
        class: 'has-navbar-fixed-top'
      }
    }
  },
  computed: {
    activeNav() {
      return this.$store.getters.navigationState
    },
    activeDialog() {
      return this.$store.getters.dialogState
    }
  },
  watch: {
    $route: function () {
      this.$store.dispatch('setNavigationState', false)
    }
  }
}
</script>
