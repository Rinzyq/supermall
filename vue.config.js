module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer:{
    disableHostCheck:true
  },
  //修改html-webpack-plugin的值
  chainWebpack:config=>{
    config.plugin('html').tap(args=>{
      args[0].title="购物街";
      return args;
    })
  }
}
  