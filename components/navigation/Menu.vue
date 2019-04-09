<template>
  <div
    :class="{ 'show-nav': isActive }"
    class="nav-wrapper"
    @click.prevent="toggleMenu"
  >
    <nav class="menu-nav" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <span class="has-text-black">Sections</span>

        <div class="section-wrapper">
          <nuxt-link
            :to="{
              name: `${dashboardType}-mainCategory`,
              params: { mainCategory: 'world' }
            }"
            class="navbar-item"
          >
            WORLD <Icon :icon="'checkbox-blank-circle'" />
          </nuxt-link>
        </div>

        <div class="section-wrapper">
          <nuxt-link
            :to="{
              name: `${dashboardType}-mainCategory`,
              params: { mainCategory: 'business' }
            }"
            class="navbar-item"
          >
            BUSINESS <Icon :icon="'checkbox-blank-circle'" />
          </nuxt-link>
        </div>

        <div class="section-wrapper">
          <nuxt-link
            :to="{
              name: `${dashboardType}-mainCategory`,
              params: { mainCategory: 'politics' }
            }"
            class="navbar-item"
          >
            POLITICS <Icon :icon="'checkbox-blank-circle'" />
          </nuxt-link>
          <nav v-if="dashboardType !== 'realtime'" class="sub-menu">
            <div class="navbar-menu">
              <nuxt-link
                :to="{
                  name: `${dashboardType}-mainCategory-subCategory`,
                  params: {
                    mainCategory: 'politics',
                    subCategory: 'us-politics'
                  }
                }"
                class="navbar-item"
              >
                U.S. POLITICS<Icon :icon="'checkbox-blank-circle'" />
              </nuxt-link>
              <nuxt-link
                :to="{
                  name: `${dashboardType}-mainCategory-subCategory`,
                  params: {
                    mainCategory: 'politics',
                    subCategory: 'european-politics'
                  }
                }"
                class="navbar-item"
              >
                E.U. POLITICS<Icon :icon="'checkbox-blank-circle'" />
              </nuxt-link>
            </div>
          </nav>
        </div>

        <div class="section-wrapper">
          <nuxt-link
            :to="{
              name: `${dashboardType}-mainCategory`,
              params: { mainCategory: 'technology' }
            }"
            class="navbar-item"
          >
            TECH <Icon :icon="'checkbox-blank-circle'" />
          </nuxt-link>
        </div>

        <nav class="sub-menu">
          <div class="bottom-menu">
            <hr />
            <div v-if="isLogged">
              <a class="navbar-item has-icon">
                <Icon :icon="'settings'" />&nbsp;Preferences
              </a>
              <a class="navbar-item has-icon" @click="logout">
                <Icon :icon="'exit-to-app'" />&nbsp;Logout
              </a>
            </div>
            <!--div v-else>
              <span class="has-text-black">About</span>
              <a class="navbar-item">
                Mission
              </a>
              <a class="navbar-item">
                Services
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr>
              <nuxt-link
                :to="{ path: '/login' }"
                class="navbar-item button is-inverted is-outlined text-center"
                v-text="'Login'"
              />
              <a class="navbar-item button is-primary has-text-white text-center push-top-5">
                Create Account
              </a>
            </div-->
            <div class="footer-link center">
              <nuxt-link
                :to="{ name: 'terms' }"
              >
                <small>Terms of Service</small>
              </nuxt-link>
              &nbsp;
              <nuxt-link
                :to="{ name: 'privacy' }"
              >
                <small>Privacy</small>
              </nuxt-link>
              <br />
              <small>THORO News — {{ currentYear }}</small>
            </div>
          </div>
        </nav>
      </div>
    </nav>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import moment from 'moment'

export default {
  name: 'Menu',
  data() {
    return {
      isLarge: true
    }
  },
  computed: {
    isActive() {
      return this.$store.getters.navigationState
    },
    dashboardType() {
      return this.$store.getters.currentDashboard
    },
    currentYear() {
      return moment().format('YYYY')
    },
    isLogged() {
      if (this.$store.getters.isUser) {
        return true
      }
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.resizeNav)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.resizeNav)
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch('setNavigationState', !this.isActive)
    },
    resizeNav() {
      if (process.browser) {
        if (window.scrollY >= 60) {
          this.isLarge = false
        } else {
          this.isLarge = true
        }
      }
    },
    async logout() {
      Cookie.remove('auth')
      this.$store.dispatch('updateAuth', false)
      await this.$store
        .dispatch('getClientToken')
        .then(res => {
          this.$store.commit('setAuth', res.data)

          this.$axios.setHeader(
            'Authorization',
            `${res.data.type} ${res.data.token}`
          )

          Cookie.remove('auth')
          Cookie.set('auth', { token: res.data.token, type: res.data.type })

          this.$router.push({ path: '/' })
        })
        .catch(err => {
          console.log('ERROR refreshing token')
          console.log(err)
        })
    }
  }
}
</script>
