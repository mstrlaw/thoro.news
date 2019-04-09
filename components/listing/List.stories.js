import { storiesOf } from '@storybook/vue'

import List from '@/components/listing/List'
import store from '@/.storybook/store'

const articlesOptions = {
  category: 'world',
  subcategory: '',
  sortField: 'articlePublishDate',
  sortOrder: -1,
  limit: 25
}

const mediumOptions = {
  domain: 'medium.com',
  sortField: 'articlePublishDate',
  category: 'world',
  subcategory: '',
  sortOrder: -1,
  limit: 10
}

//  Define a wrapper to better view the List
const listWrapper = () => {
  return {
    template: `<div style="max-width: 80vw; padding: 3em; margin: 0 auto;"><story/></div>`
  }
}

const componentInfo = `
  # Usage
  Renders lists of Articles (from generic news sources or from Medium) or Tweets.
  \`\`\`js
  <List
    :source="source"
    :options="options"
  />
  \`\`\`

  ### Props

  ##### @source {string} - Optional
  Changes the List & ListItem component designs depending on passed value.
  \`\`\`text
  Omitted prop - treats list as generic list of articles (default)
  'medium' - applies Medium design variation
  'twitter' - applies Twitter design variation
  \`\`\`

  ##### @options {object}
  Defines which data should be fetched for the source of this List:
  \`\`\`js
  /*
  * @domain {sring} - a specific domain to filter the articles we want
  * @category {sring} - the main category of articles we wish to retrieve
  * @subCategory {sring} - a sub category of articles to retrieve
  * @sortField {sring} - the field we wish to apply sorting
  * @sortOrder {number} - The order (asc, desc) we wish results to be returned
  * @limit {number} - The max number of articles to return
  */
  {
    domain: 'medium.com',
    category: 'world',
    subcategory: '',
    sortField: 'articlePublishDate',
    sortOrder: -1,
    limit: 25
  }
  \`\`\`
`

//  Actually create story for the list
storiesOf('Lists', module)
  .addDecorator(listWrapper)
  .add(
    'Medium Articles',
    () => ({
      components: { List },
      template: `<List
        :source="source"
        :options="options"
      />`,
      store: store,
      data: () => ({
        source: 'medium',
        options: mediumOptions
      })
    }),
    {
      info: componentInfo
    }
  )
  .add(
    'Regular Articles',
    () => ({
      components: { List },
      template: `<List
        :options="options"
      />`,
      store: store,
      data: () => ({
        options: articlesOptions
      })
    }),
    {
      info: componentInfo
    }
  )
