// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve("__dirname, '../dist'"),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,   //修改为false变为不打包.map文件
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8083,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/apiList': {           //设定以/api开头指向代理目标target,ajax路径url = "/apiList/XXX"
            target: 'http://localhost:3000',  
            changeOrigin: true,
            pathRewrite: {      //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段,测试无效apiList做了生产判定去添加
              '^/apiList': ''
            }
        }
    },
    //其中 '/api' 为匹配项，target 为被请求的地址
    //因为在 ajax 的 url 中加了前缀 '/api'，而原本的接口是没有这个前缀的
    //所以需要通过 pathRewrite 来重写地址，将前缀 '/api' 转为 '/'
    //如果本身的接口地址就有 '/api' 这种通用前缀，就可以把 pathRewrite 删掉

    // var url="/GdsBase/GoodList";     //成功接口
    // proxyTable: {
    //     '/apiList': {           //设定以/api开头指向代理目标target,ajax路径url = "/apiList/XXX"
    //         target: 'http://localhost:14480/',  
    //         changeOrigin: true,
    //         pathRewrite: {      //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
    //           '^/apiList': '/'
    //         }
    //     }
    // },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
