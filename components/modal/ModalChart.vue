<template>
  <div class="card chart-container">
    <!--div class="top-section">
      <div class="topics">
        <span class="topic">
          <Icon :icon="'bullhorn'" />&nbsp;Mentions
        </span>
      </div>
    </div-->
    <!--h4 class="subtitle is-size-6 has-text-grey push-bottom-10">
      Clusters for "{{ theme }}" in the past 7 days
    </h4-->

    <LineChart
      :chart-id="'mentionsChart'"
      :extra-class="'h-150'"
      :chart-data="clusterTrendData"
      :chart-options="chartOptions"
      :load-articles="false"
    />
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart'

export default {
  name: 'ModalChart',
  components: {
    LineChart
  },
  props: {
    theme: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chartOptions: {
        chartType: 'sources',
        animate: false,
        maintainAspectRatio: false, // my new default options
        elements: { point: { radius: 0 } },
        legend: { display: false },
        title: {
          display: true,
          lineHeight: 0,
          padding: 1,
          position: 'bottom'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 80,
            bottom: 5
          }
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                min: -2
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    clusterTrendData() {
      return this.$store.getters['modal/clusterTrendData']
    }
  }
}
</script>
