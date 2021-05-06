const path = require('path')

const LINARIA_EXTENSION = '.linaria.module.css'

function traverse(rules) {
  for (let rule of rules) {
    if (typeof rule.loader === 'string' && rule.loader.includes('css-loader')) {
      if (
        rule.options &&
        rule.options.modules &&
        typeof rule.options.modules.getLocalIdent === 'function'
      ) {
        let nextGetLocalIdent = rule.options.modules.getLocalIdent
        rule.options.modules.getLocalIdent = (context, _, exportName, options) => {
          if (context.resourcePath.includes(LINARIA_EXTENSION)) {
            return exportName
          }
          return nextGetLocalIdent(context, _, exportName, options)
        }
      }
    }
    if (typeof rule.use === 'object') {
      traverse(Array.isArray(rule.use) ? rule.use : [rule.use])
    }
    if (Array.isArray(rule.oneOf)) {
      traverse(rule.oneOf)
    }
  }
}

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.resolve.alias['~'] = path.resolve(__dirname, '../src')

    // START>> patch for linaria
    traverse(config.module.rules)

    config.module.rules.push({
      test: /\.(tsx|ts|js|mjs|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('linaria/loader'),
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
            extension: LINARIA_EXTENSION,
          },
        },
      ],
    })

    // END>> patch for linaria

    // START>> patch for SVG
    // https://github.com/boopathi/react-svg-loader/issues/197
    const indexOfRuleToRemove = config.module.rules.findIndex((rule) =>
      rule.test.toString().includes('svg')
    )

    config.module.rules.splice(indexOfRuleToRemove, 1, {
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
      loader: require.resolve('file-loader'),
      options: {
        name: 'static/media/[name].[hash:8].[ext]',
        esModule: false,
      },
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    // END>> patch for SVG

    return config
  },
}
