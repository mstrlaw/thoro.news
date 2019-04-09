import { storiesOf } from '@storybook/vue'
import Navigation from '@/components/navigation/Navigation'
import store from '@/.storybook/store'


storiesOf('Navigation', module)
  .add(
    'Regular',
    () => ({
      components: { Navigation },
      template: `<Navigation />`,
      store: store,
    }),
    {
      info: `
        # Usage
        Displays the app's sections navigation and order filter dropdown.
        \`\`\`js
        <Navigation />
        \`\`\`
      `
    }
  )

