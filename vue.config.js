const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/mixins.less'),
        path.join(__dirname, './src/assets/styles/variables.less')
      ]
    }
  },
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  },
  // 这个是给webpack-dev-server开启可IP和域名访问权限。
  chainWebpack: config => {
    config.devServer.disableHostCheck(true)
  }
}
// vue add style-resources-loader
