module.exports = {
  mode: 'universal',
  /**
    Meta
  **/
  head: {
    title: 'Thoro News Aggregator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'A smart news curator that lets you stay ahead of the curve.'
      },
      { name: 'apple-mobile-web-app-capable', content: 'yes' }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicons/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicons/favicon-16x16.png'
      },
      {
        rel: 'mask-icon',
        href: '/favicons/safari-pinned-tab.svg',
        color: '#5bbad5'
      },
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: '/favicons/favicon.ico'
      }
    ]
  },
  /**
    Progress Bar
  **/
  loading: {
    color: '#209CEE',
    height: '4px'
  },
  /**
    Styles
  **/
  css: [
    '@/assets/css/app.scss'
  ],
  /**
    Plugins
  **/
  plugins: [
    '@/plugins/logo',
    '@/plugins/mdi',
    '@/plugins/v-tooltip',
    '@/plugins/rollbar',
    { src: '@/plugins/init', ssr: false },
    { src: '@/plugins/ga', ssr: false },
    { src: '@/plugins/hotjar', ssr: false },
    { src: '@/plugins/vue-hammerjs', ssr: false }
  ],
  /**
    Toast config
  **/
  toast: {
    position: 'bottom-right',
    duration: 5000
  },
  /**
    Router config
  **/
  router: {
    middleware: 'check-auth'
  },
  /**
    Modules
  **/
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/pwa',
    '@nuxtjs/moment',
    '@nuxtjs/ngrok'
  ],
  /**
    PWA config
  **/
  manifest: {
    lang: 'en',
    name: 'Thoro News',
    short_name: 'Thoro',
    description:
      'Thoro is an unbiased news aggregator scouring throusands of daily articles and delivering them in a consumable way.',
    start_url: '/',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    icons: [
      {
        src: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://fonts.googleapis.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern: 'https://fonts.gstatic.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      }
    ]
  },
  /**
    Build config
  **/
  build: {
    babel: {
      plugins: ['lodash']
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  },
  render: {
    http2: { push: true }
  }
}
