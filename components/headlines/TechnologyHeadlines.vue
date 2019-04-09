<template>
  <div>
    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Tech Giants'"
          :category="'technology'"
          :subcategory="'tech-giants'"
          :limit="50"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Consumer Electronics'"
          :category="'technology'"
          :subcategory="'consumer electronics'"
          :limit="50"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Cyber Security'"
          :category="'technology'"
          :subcategory="'security'"
          :limit="50"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Privacy'"
          :category="'technology'"
          :subcategory="'privacy'"
          :limit="50"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Artificial Intelligence'"
          :category="'technology'"
          :subcategory="'artificial-intelligence'"
          :limit="50"
        />
      </div>
    </div>

    <!--div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Virtual Reality'"
          :category="'technology'"
          :subcategory="'virtual-reality'"
        />
      </div>
    </div-->

    <div class="columns">
      <div class="column">
        <HeadlinesSection
          :title="'Blockchain'"
          :category="'technology'"
          :subcategory="'blockchain'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeadlinesSection from '@/components/headlines/HeadlinesSection'

export default {
  name: 'TechnologyHeadlines',
  components: {
    HeadlinesSection
  }
}
</script>
