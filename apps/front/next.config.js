const withPlugins = require('next-compose-plugins')
const withLinaria = require('next-linaria')

const withSVGr = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

const nextConfig = {
  env: {
    CMS_URL: process.env.CMS_URL,
  },
}

const config = withPlugins([[withSVGr], [withLinaria]], nextConfig)

module.exports = config
