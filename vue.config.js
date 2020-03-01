
const TerserPlugin = require('terser-webpack-plugin')  // 用于在生成环境剔除debuger和console
const CompressionPlugin = require("compression-webpack-plugin"); // gzip压缩,优化http请求,提高加载速度
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 代码分析工具 
const path = require('path');
const resolve = dir => {
  return path.join(__dirname, dir);
};

const env = process.env.NODE_ENV
let target = process.env.VUE_APP_URL  // development和production环境是不同的

const cdn = {
  // 开发环境
  dev: {
      css: [],
      js: [
      ]
  },
  // 生产环境
  build: {
      css: [
        'https://cdn.bootcss.com/element-ui/2.11.1/theme-chalk/index.css',
        'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
      ],
      js: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vue-router/3.1.2/vue-router.min.js',
        'https://cdn.bootcss.com/vuex/2.3.1/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
        'https://cdn.bootcss.com/vue-i18n/8.13.0/vue-i18n.min.js',
        'https://cdn.bootcss.com/element-ui/2.11.1/index.js',
        'https://cdn.bootcss.com/echarts/3.8.5/echarts.min.js',
        'https://cdn.bootcss.com/Mock.js/1.0.1-beta3/mock-min.js',
        'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
        'https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js'
      ]
  }
}


module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/permission/" : "/",
  outputDir: './dist',
  assetsDir:'static',
  filenameHashing:true, 
  lintOnSave: false,
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8808
  },
   // webpack相关配置
  chainWebpack: (config) => {
    config.entry.app = ['./src/main.js']
    config.resolve.alias
      .set('@', resolve('src'))
      .set('cps', resolve('src/components'))

    config.performance
      .set('hints', false)
    config.plugins.delete("prefetch");
    config.plugins.delete('preload');
    config.optimization.minimize(true);
    config.optimization.splitChunks({
        chunks: 'all'
    })   
    //压缩图片
    config.module
    .rule('images')
    .use('image-webpack-loader')
    .loader('image-webpack-loader')
    .options({
        disable: true, 
        quality: '65-80',
        speed: 4
    })
    .end()
    // 项目文件大小分析
    config.plugin('webpack-bundle-analyzer')
    .use(new BundleAnalyzerPlugin({
      openAnalyzer: false,   // 是否打开默认浏览器
      analyzerPort:8777
    }))
    config
    .plugin('html')
    .tap(args => {
      if (process.env.NODE_ENV === 'production') {
          args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
          args[0].cdn = cdn.dev
      }
      return args
    })
  },
  configureWebpack:config => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === 'production') {
      // 忽略生产环境打包的文件
      config.externals = {
        "vue": "Vue",
        "vue-router": "VueRouter",
        "vuex": "Vuex",
        "vue-i18n": "VueI18n",
        "axios": "axios",
        'element-ui': 'ELEMENT',
        'echarts':'echarts',
        'mockjs':'Mock',
        'nprogress':'NProgress',
        'js-cookie':'Cookies'
      }
      // 去除console来减少文件大小，效果同'UglifyJsPlugin'
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, 
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          }
        }
      })
      // 开启gzip压缩
      config.plugins.push(new CompressionPlugin({
        algorithm: 'gzip',
        test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"), // 匹配文件扩展名
        threshold: 5120, // 对超过5k的数据进行压缩
        minRatio: 0.8,
        cache: true, // 是否需要缓存
        deleteOriginalAssets:false  // true删除源文件(不建议);false不删除源文件
      }))

    } else {
   

    }
  },

  pluginOptions: {

  }
}

