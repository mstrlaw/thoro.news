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
import { mapGetters } from 'vuex'

export default {
  middleware: ['navigation'],
  components: {
    Navigation,
    Modal,
    Footer
  },
  data: () => ({
    isMobile: false
  }),
  head() {
    return {
      bodyAttrs: {
        class: `has-navbar-fixed-top ${this.dialogClass}`
      }
    }
  },
  computed: {
    ...mapGetters({
      dialogState: 'modal/dialogState'
    }),
    dialogClass() {
      return this.dialogState ? 'open-modal' : ''
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
