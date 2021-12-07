const path = require('path')

module.exports = {
  outputDir: './build',
  //方式一
  // configureWebpack:{
  //   resolve:{
  //     alias:{
  //       views:'@/views'
  //     }
  //   }
  // },

  //方式二
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@':path.resolve(__dirname,'src'),
  //     views:'@/views'
  //   }
  // }

  //方式三
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('views', '@/views')
  }
}
