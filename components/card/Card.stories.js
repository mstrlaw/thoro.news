import { storiesOf } from '@storybook/vue'

import Card from '@/components/card/Card'
import store from '@/.storybook/store'
import { articles, clusterData } from '@/fixtures/storiesData'

store.dispatch('saveClusterArticles', articles)
store.dispatch('saveSelectedArticle', articles[0])
store.dispatch('saveSelectedCluster', clusterData)

const generateInfo = (variation) => {
  return `
    # Usage
    Displays a cluster or articles for a given theme
    \`\`\`js
    <Card
      :cluster-data="clusterData"
      :trigger-load="shouldLoadData"
      :main-section="isMainSection"
    />
    \`\`\`


    ### ${ variation === 'default' ? 'Default Variation' : 'Main Variation' }
    
    ${
      variation === 'default'
      ? 
      `Regular Card variation will have a 50% width regarding it's parent element.`
      :
      `Main Card variation will have 100% width regarding it's parent element and list secondary headlines using *flex*.`
    }
  `
}

//  Actually create story for the list
storiesOf('Card', module)
  // .addDecorator(listWrapper)
  .add(
    'Default',
    () => ({
      components: { Card },
      template: `<Card
        :cluster-data="clusterData"
        :trigger-load="shouldLoadData"
        :main-section="isMainSection"
      />`,
      store: store,
      data: () => ({
        clusterData: clusterData,
        isMainSection: false,
        shouldLoadData: true
      })
    }),
    {
      info: generateInfo('default')
    }
  )
  .add(
    'Main',
    () => ({
      components: { Card },
      template: `<Card
        :cluster-data="clusterData"
        :trigger-load="shouldLoadData"
        :main-section="isMainSection"
      />`,
      store: store,
      data: () => ({
        clusterData: clusterData,
        isMainSection: true,
        shouldLoadData: true
      })
    }),
    {
      info: generateInfo('main')
    }
  )
