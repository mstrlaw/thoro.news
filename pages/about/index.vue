<template>
  <div class="page">
    <section class="hero is-main is-fullheight is-dark">
      <div class="hero-body">
        <div class="container push-top-50">
          <div class="columns">
            <div class="column">
              <div :style="{ transform: 'translateY(-' + yPos + 'px)' }">
                <h1
                  :class="{ hidden: isHidden }"
                  class="title is-size-2 revealable"
                >
                  Regain control of the information firehose
                </h1>
                <h2
                  :class="{ hidden: isHidden }"
                  class="has-text-left revealable delay-1"
                >
                  Thoro
                  <span
                    data-content="aggregates and identifies trending topics"
                    class="highlighted underlined green"
                  />
                  from hundreds of news sources, giving you a one-stop solution
                  for
                  <span
                    data-content="easily digestible information."
                    class="highlighted underlined red"
                  />
                </h2>
              </div>

              <div class="columns push-top-150">
                <div
                  :class="{ hidden: isHidden }"
                  class="column revealable delay-1"
                >
                  <div :style="{ transform: 'translateY(-' + yPos + 'px)' }">
                    <div class="container">
                      <div class="tile is-ancestor">
                        <div class="tile is-vertical">
                          <div class="tile">
                            <div class="tile is-parent is-vertical pull-top-50">
                              <div
                                :class="{ hidden: isHidden }"
                                class="card notification revealable delay-1"
                              >
                                <header class="card-header">
                                  <img
                                    class="logo"
                                    src="/images/logos/cnn_app_logo.png"
                                    alt="CNN App Logo"
                                  />
                                  <p>CNN</p>
                                  <p class="time">11m ago</p>
                                </header>
                                <div class="content">
                                  <b>Breaking News</b><br />
                                  New York attorney general sues Trump
                                  Foundation.
                                </div>
                              </div>

                              <div
                                :class="{ hidden: isHidden }"
                                class="card notification revealable delay-4"
                              >
                                <header class="card-header">
                                  <img
                                    class="logo white"
                                    src="/images/logos/google_news_app_logo.png"
                                    alt="Google News App Logo"
                                  />
                                  <p>GOOGLE NEWS</p>
                                  <p class="time">15m ago</p>
                                </header>
                                <div class="content">
                                  <b>NPR</b><br />
                                  N.Y. Attorney General files suit against Trump
                                  foundation.
                                </div>
                              </div>
                            </div>

                            <div class="tile is-parent is-vertical">
                              <div
                                :class="{ hidden: isHidden }"
                                class="card notification revealable delay-2"
                              >
                                <header class="card-header">
                                  <img
                                    class="logo"
                                    src="/images/logos/fox_app_logo.png"
                                    alt="Fox News App Logo"
                                  />
                                  <p>FOX NEWS</p>
                                  <p class="time">3m ago</p>
                                </header>
                                <div class="content">
                                  New York AG files lawsuit against Trump
                                  Foundation for alleged 'illegal conduct'.
                                </div>
                              </div>

                              <div
                                :class="{ hidden: isHidden }"
                                class="card notification revealable delay-5"
                              >
                                <header class="card-header">
                                  <img
                                    class="logo"
                                    src="/images/logos/wapo_app_logo.png"
                                    alt="Washington Post App Logo"
                                  />
                                  <p>WASHINGTON POST</p>
                                  <p class="time">3m ago</p>
                                </header>
                                <div class="content">
                                  New York AG files lawsuit against Trump
                                  Foundation for alleged 'illegal conduct'.
                                </div>
                              </div>
                            </div>

                            <div
                              class="tile is-parent is-vertical pull-top-25 is-hidden-mobile"
                            >
                              <div
                                :class="{ hidden: isHidden }"
                                class="card notification revealable delay-3"
                              >
                                <header class="card-header">
                                  <img
                                    class="logo black"
                                    src="/images/logos/huffpost_app_logo.png"
                                    alt="Washington Post App Logo"
                                  />
                                  <p>HUFFINGTON POST</p>
                                  <p class="time">3m ago</p>
                                </header>
                                <div class="content">
                                  New York Attorney General Sues Trump
                                  Foundation For ‘Persistent Illegal Conduct’.
                                </div>
                              </div>

                              <div
                                :class="{ hidden: isHidden }"
                                class="card notification revealable delay-6"
                              >
                                <header class="card-header">
                                  <img
                                    class="logo"
                                    src="/images/logos/guardian_app_logo.jpg"
                                    alt="The Guardian App Logo"
                                  />
                                  <p>THE GUARDIAN</p>
                                  <p class="time">3m ago</p>
                                </header>
                                <div class="content">
                                  Trump and family sued by New York attorney
                                  general over alleged charity violations.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Bracket />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--div class="column">
              <div :class="{ 'hidden': isHidden }" class="mobile-outer-wrapper revealable">
                <div :style="{ transform: 'translateY(-'+yPos+'px)' }" class="mobile-inner-wrapper">
                  <img class="mobile-frame" src="/images/iphone-x.png" alt="App Preview Frame">
                </div>
              </div>
            </div>
            <div class="column">
              <div :class="{ 'hidden': isHidden }" class="headline-wrapper revealable delay-1">
                <h1 :style="{ transform: 'translateY('+yPosAlt+'px)' }" v-html="d" />
              </div>
            </div-->
          </div>
        </div>
      </div>
    </section>

    <Waves />

    <Advantages />

    <div class="push-top-100" />

    <!--section class="hero is-medium is-primary push-top-100 shadow no-hover">
      <div :style="{ transform: 'translateY('+(yPos) * 0.1 +'px)' }" class="hero-body push-top-50">
        <div :style="{ transform: 'translateY('+(yPos-600) * 0.3 +'px)' }" class="container">
          <div class="container has-background-white shadow no-hover radius">
            <div class="columns">
              <div class="column is-10 is-offset-1 has-text-centered">
                <h1 class="title has-text-dark">Start getting your news right</h1>
                <h2 class="subtitle is-4 has-text-dark">Be one of the first to get the app once it goes live.</h2>
                <div class="columns">
                  <div class="column is-8 is-offset-2">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input is-large" type="email" placeholder="Email">
                      <span class="icon is-left">
                        <i class="mdi mdi-email" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Scatter :style="{ transform: 'translateY(-'+(yPosAlt-600) * 0.2 +'px)' }" />
    </section-->
  </div>
</template>

<script>
import Advantages from '@/components/homepage/Advantages'
import Waves from '@/components/svg/Waves'
import Bracket from '@/components/svg/Bracket'
import Scatter from '@/components/svg/Scatter'

export default {
  name: 'About',
  layout: 'basic',
  components: {
    Advantages,
    Waves,
    Bracket,
    Scatter
  },
  data() {
    return {
      d: false,
      yPos: 0,
      yPosAlt: 0,
      isHidden: true
    }
  },
  scrollToTop: true,
  beforeMount() {
    window.addEventListener('scroll', this.applyParallax)
  },
  mounted() {
    this.$store.commit('setBreadcrumbs', false)
    if (process.browser) {
      window.scrollTo(0, 0)
      this.isHidden = false
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.applyParallax)
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive
    },
    applyParallax() {
      if (process.browser) {
        this.yPos = window.scrollY * 0.1
        this.yPosAlt = window.scrollY * 0.4
      }
    }
  }
  // async asyncData({ app }){
  //   return app.$axios.$get(process.env.API_ENDPOINT)
  //           .then((res) => {
  //             return { d: res.data }
  //           })
  //           .catch((error) => {
  //             console.log(error)
  //             return { d: 'Unable to connect to API..' }
  //           })
  // }
}
</script>
