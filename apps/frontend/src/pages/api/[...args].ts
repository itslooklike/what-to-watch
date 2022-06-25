import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware'
import { apiUrl } from '~/utils/config'

const proxy = createProxyMiddleware('/api', {
  target: apiUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/wtw',
  },

  // @ts-expect-error какая-то ошибка в типах самой либы, в будущем будет версия 3, возможно с ней проблемы устранятся
  onProxyReq: fixRequestBody,
})

export default proxy
