import { storiesOf } from '@storybook/vue'

import Modal from '@/components/modal/Modal'
import store from '@/.storybook/store'

import { articles, clusterData, tweets, trendData } from '@/fixtures/storiesData'

store.dispatch('modal/saveClusterArticles', articles)
store.dispatch('modal/saveSelectedArticle', articles[0])
store.dispatch('modal/saveSelectedCluster', clusterData)
store.dispatch('saveScrollPosition', 0)

store.dispatch('modal/saveClusterTweets', tweets)

store.dispatch('modal/saveClusterTrendData', trendData)

store.dispatch('modal/setDialogState', true)

//  Define a wrapper to better view the List
// const listWrapper = () => {
//   return {
//     template: `<div style="max-width: 80vw; padding: 3em; margin: 0 auto;"><story/></div>`
//   }
// }

const componentInfo = `
  # Usage
  Displays one or several articles pertaining to a particular cluster.
  \`\`\`js
  <Modal />
  \`\`\`


  ### Opening the Modal

  Multiple Components trigger the article's Modal, namely:
  * links within @/components/ThemeCloud.vue
  * links within @/components/Card.vue

  Refer to these components for more details on how the Modal data is retrieved and set.

  ### Modal Data

  The Modal's doesn't take any props.\n
  Because the component lives in @/layouts/default.vue to be used accross all pages, its data is stored as states within the Store.\n
  Relevant data:

  \`\`\`text
  @clusterArticles      {array}:   All articles' data from the current selected cluster;
  @clusterTweets        {array}:   Tweets related to this cluster theme;
  @currentArticleIndex  {number}:  Index of currently selected article;
  @selectedArticle      {object}:  Currently selected article;
  @selectedCluster      {object}:  Currently selected Cluster;
  @clusterTrendData     {object}:  Trend data for current cluster to plot chart;
  \`\`\`

  ### Keyboard Events

  The user can use the Left/Right arrows to navigate between articles as well as the Esc key to close the Modal.
`

//  Actually create story for the list
storiesOf('Modal', module)
  // .addDecorator(listWrapper)
  .add(
    'Articles',
    () => ({
      components: { Modal },
      template: '<Modal />',
      store: store,
      data: () => ({
        yPos: 0,
        dialogInnerContentEl: null,
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
                  // max: this.localData.maxY + 10,
                  min: -2
                }
              }
            ]
          }
        }
      })
    }),
    {
      info: componentInfo
    }
  )
