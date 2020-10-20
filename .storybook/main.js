// .storybook/main.js

const path = require('path')

// Export a function. Accept the base config as the only param.
module.exports = {
  stories: ['../stories/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: ['style-loader', 'css-loader', 'postcss-loader'],
    //   include: path.resolve(__dirname, '../'),
    // })

    config.module.rules[3].use[1].options = {
      importLoaders: 1,
      modules: true,
    }


    console.log(config.module.rules[3].use[1])
    // Return the altered config
    return config
  },
}
