<template>
  <div :class="layoutClassObject">
    <Navigation />
    <nuxt />
    <Footer />
    <Modal />
  </div>
</template>

<script>
import Navigation from '@/components/navigation/Navigation'
import Modal from '@/components/modal/new/Modal'
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
      htmlAttrs: {
        class: `${this.dialogClass}`
      }
      // bodyAttrs: {
      //   class: `has-navbar-fixed-top ${this.dialogClass}`
      // }
    }
  },
  computed: {
    dialogClass() {
      return this.$store.getters['modal/dialogState'] ? 'open-modal' : ''
    },
    layoutClassObject() {
      return {
        'expanded-nav': this.$store.getters.navigationState
      }
    }
  },
  watch: {
    $route: function () {
      this.$store.dispatch('setNavigationState', false)
    }
  }
}
</script>
