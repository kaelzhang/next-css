const cssLoaderConfig = require('./css-loader-config')

const factory = ({
  postCssLoaderPath,
  cssLoaderPath,
  ignoreLoaderPath
} = {}) => (nextConfig = {}) => Object.assign({}, nextConfig, {
  webpack (config, options) {
    if (!options.defaultLoaders) {
      // istanbul ignore next
      throw new Error(
        'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
      )
    }

    const {dev, isServer} = options
    const {cssModules, cssLoaderOptions, postcssLoaderOptions} = nextConfig

    options.defaultLoaders.css = cssLoaderConfig(config, {
      extensions: ['css'],
      cssModules,
      cssLoaderOptions,
      postcssLoaderOptions,
      dev,
      isServer,
      postCssLoaderPath,
      cssLoaderPath,
      ignoreLoaderPath
    })

    config.module.rules.push({
      test: /\.css$/,
      issuer (issuer) {
        if (issuer.match(/pages[\\/]_document\.js$/)) {
          throw new Error(
            'You can not import CSS files in pages/_document.js, use pages/_app.js instead.'
          )
        }
        return true
      },
      use: options.defaultLoaders.css
    })

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, options)
    }

    return config
  }
})

module.exports = factory()
module.exports.options = factory
