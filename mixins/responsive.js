import { BREAKPOINTS } from '@/utilities/breakpoints'

const responsive = {
  data: () => ({
    isMobile: false
  }),
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

export { responsive }
