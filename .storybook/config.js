import Vue from 'vue'
import Vuex from 'vuex'
import { configure, addDecorator, addParameters } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withInfo, setDefaults } from 'storybook-addon-vue-info'
import thoroTheme from './thoroTheme';


import VTooltip from 'v-tooltip'

import Icon from '@/components/Icon.vue'
import Logo from '@/components/svg/Logo.vue'

import '@/assets/css/app.scss';

addParameters({
  options: {
    theme: thoroTheme,
  },
})


addDecorator(
  withInfo({
    header: false, // Global configuration for the info addon across all stories.
  })
)
setDefaults({
  source: false
})

Vue.component('Icon', Icon)
Vue.component('Logo', Logo)


Vue.use(VTooltip)

Vue.use(Vuex)

Vue.component('nuxt-link', {
  props:   ['to'],
  methods: {
    log() {
      action('link target')(this.to)
    },
  },
  template: '<a href="#" @click.prevent="log()"><slot>NuxtLink</slot></a>',
})

Vue.component('no-ssr', {
  functional: true,
  render (createElement, context) {
    return context.children
  }
})

function loadStories() {
  const req = require.context('../components', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
