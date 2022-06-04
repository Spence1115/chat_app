const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    process.env.REACT_APP_GRAPHQL_PATH,
    createProxyMiddleware({
      target: process.env.REACT_APP_BACKEND_PATH,
      changeOrigin: true,
    })
  )
}
