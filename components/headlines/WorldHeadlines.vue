<template>
  <div>
    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Business'"
          :category="'business'"
          :trigger-load="triggerLoad"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Politics'"
          :category="'politics'"
          :trigger-load="triggerLoad"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Society'"
          :category="'society'"
          :trigger-load="triggerLoad"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Tech'"
          :category="'technology'"
          :trigger-load="triggerLoad"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Entertainment'"
          :category="'entertainment'"
          :trigger-load="triggerLoad"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeadlinesSection from '@/components/headlines/HeadlinesSection'

export default {
  name: 'WorldHeadlines',
  components: {
    HeadlinesSection
  },
  props: {
    triggerLoad: {
      type: Boolean,
      default: false
    }
  }
}
</script>
