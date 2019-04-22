<template>
  <div :class="{ 'is-active': rangeDropdownState }" class="dropdown">
    <div class="dropdown-trigger">
      <button
        class="button is-primary is-inverted shadow"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        data-dropdown="rangeDropdownState"
        @click.prevent="toggleDropdown($event)"
      >
        <Icon :icon="'calendar'" />&nbsp;Range: {{ maxDays }} days
      </button>
    </div>
    <div id="dropdown-menu" class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a
          :class="{ 'is-active': isActiveRange(7) }"
          class="dropdown-item"
          data-range="7"
          @click.prevent="changeRange($event)"
          v-text="'7 Days'"
        />
        <a
          :class="{ 'is-active': isActiveRange(30) }"
          class="dropdown-item"
          data-range="30"
          @click.prevent="changeRange($event)"
          v-text="'30 Days'"
        />
        <a
          :class="{ 'is-active': isActiveRange(60) }"
          class="dropdown-item"
          data-range="60"
          @click.prevent="changeRange($event)"
          v-text="'60 Days'"
        />
        <a
          :class="{ 'is-active': isActiveRange(365) }"
          class="dropdown-item"
          data-range="365"
          @click.prevent="changeRange($event)"
          v-text="'1 Year'"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DateRangeDropdown',
  data() {
    return {
      rangeDropdownState: false
    }
  },
  computed: {
    maxDays() {
      return this.$store.getters.maxDays
    }
  },
  methods: {
    toggleDropdown(e) {
      this[e.target.getAttribute('data-dropdown')] = !this[ e.target.getAttribute('data-dropdown') ]
    },
    changeRange(e) {
      const maxDays = parseInt(e.target.getAttribute('data-range'))
      if (maxDays !== this.maxDays) {
        this.$store.dispatch('modal/saveClusterTrendData', [])
        this.rangeDropdownState = false
        this.$store.dispatch('saveMaxDays', maxDays)
      }
    },
    isActiveRange(range) {
      return range === this.maxDays
    }
  }
}
</script>
