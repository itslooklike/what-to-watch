import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware'
import { apiUrl } from '~/utils/config'

const proxy = createProxyMiddleware('/api', {
  target: apiUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/wtw',
  },
  onProxyReq: fixRequestBody,
})

export default proxy
