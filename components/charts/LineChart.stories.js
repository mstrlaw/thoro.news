import { storiesOf } from '@storybook/vue'
import { chartOptions, trendData } from '@/fixtures/storiesData'

import LineChart from '@/components/charts/LineChart'

const componentInfo = `
  # Usage
  Plots a dual series line chart displaying a cluster's trend over time. Uses <a href="https://www.chartjs.org/docs/latest/" target="_blank">CHart.js</a>
  \`\`\`js
  <LineChart
    :chart-id="chartId"
    :extra-class="extraClass"
    :chart-data="chartData"
    :chart-options="chartOptions"
    :load-articles="false"
  />
  \`\`\`
`

storiesOf('Line Chart', module)
  .add(
    'Default',
    () => ({
      components: { LineChart },
      template: `<LineChart
        :chart-id="chartId"
        :extra-class="extraClass"
        :chart-data="trendData"
        :chart-options="chartOptions"
        :load-articles="false"
      />`,
      data: () => ({
        chartId: 'fakeChart',
        extraClass: '',
        trendData: trendData,
        chartOptions: chartOptions,
        loadArticles: false
      })
    }),
    {
      info: componentInfo
    }
  )
  .add(
    '150px Height',
    () => ({
      components: { LineChart },
      template: `<LineChart
        :chart-id="chartId"
        :extra-class="extraClass"
        :chart-data="trendData"
        :chart-options="chartOptions"
        :load-articles="false"
      />`,
      data: () => ({
        chartId: 'fakeChart',
        extraClass: 'h-150',
        trendData: trendData,
        chartOptions: chartOptions,
        loadArticles: false
      })
    }),
    {
      info: componentInfo
    }
  )
  .add(
    '450px Height',
    () => ({
      components: { LineChart },
      template: `<LineChart
        :chart-id="chartId"
        :extra-class="extraClass"
        :chart-data="trendData"
        :chart-options="chartOptions"
        :load-articles="false"
      />`,
      data: () => ({
        chartId: 'fakeChart',
        extraClass: 'h-450',
        trendData: trendData,
        chartOptions: chartOptions,
        loadArticles: false
      })
    }),
    {
      info: componentInfo
    }
  )
