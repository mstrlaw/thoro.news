const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')

module.exports = async ({ config, mode }) => {

  config.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../')
  })

  config.module.rules.push({
    test: /\.vue$/,
    loader: 'storybook-addon-vue-info/loader',
    enforce: 'post'
  })

  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT)
    }
  }))

  config.resolve.alias = merge(
    config.resolve.alias, 
    {
      '@': path.dirname(path.resolve(__dirname))
    }
  )

  return config
}
