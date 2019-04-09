<template>
  <div>
    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Economy'"
          :category="'business'"
          :subcategory="'economy'"
          :limit="50"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Investment'"
          :category="'business'"
          :subcategory="'investment'"
          :limit="50"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Crypto'"
          :category="'business'"
          :subcategory="'cryptocurrency'"
          :limit="50"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeadlinesSection from '@/components/headlines/HeadlinesSection'

export default {
  name: 'BusinessHeadlines',
  components: {
    HeadlinesSection
  }
}
</script>
