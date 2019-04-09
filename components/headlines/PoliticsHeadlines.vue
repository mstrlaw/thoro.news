<template>
  <div>
    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'U.S. Politics'"
          :category="'politics'"
          :subcategory="'us-politics'"
          :limit="50"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'E.U. Politics'"
          :category="'politics'"
          :subcategory="'european-politics'"
          :limit="50"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeadlinesSection from '@/components/headlines/HeadlinesSection'

export default {
  name: 'PoliticsHeadlines',
  components: {
    HeadlinesSection
  }
}
</script>
