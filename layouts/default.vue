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
import { BREAKPOINTS } from '@/utilities/breakpoints'
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
      htmlAttrs: {
        class: `${this.dialogClass}`
      },
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
  },
  created() {
    if (process.client) {
      window.addEventListener('resize', this.triggerResponsiveChanges)
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener('resize', this.triggerResponsiveChanges)
    }
  },
  mounted() {
    this.triggerResponsiveChanges()
  },
  methods: {
    triggerResponsiveChanges() {
      if (window.innerWidth <= BREAKPOINTS.SMALL) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    }
  }
}
</script>
