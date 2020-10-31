module.exports = {
  stories: ['../stories/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules[3].use[1].options = {
      ...config.module.rules[3].use[1].options,
      modules: true,
    }

    config.resolve.modules.push(process.cwd() + '/node_modules')
    config.resolve.modules.push(process.cwd() + '/src')

    // this is needed for working w/ linked folders
    config.resolve.symlinks = false

    return config
  },
}
