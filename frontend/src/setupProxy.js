const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://mapoapi.aman.ved.yt',
            changeOrigin: true,
        })
    );
};