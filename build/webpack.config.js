const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const TerserJSPlugin = require('terser-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const pkg = require('../package.json')

const config = {
  mode: devMode ? 'development' : 'production',
  entry: ['./tools/index.ts'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: devMode ? 'hsu-utils.js' : 'hsu-utils.min.js',
    // RenderPDF 里的 pdfjs 是动态 import，UMD 产物会因此多出一个按需 chunk。
    // 'auto' 让 webpack 运行时从 document.currentScript 推导出 chunk 的基地址，
    // 否则 <script> 直接引 dist/ 时会去站点根目录找那个 chunk 而 404。
    publicPath: 'auto',
    chunkFilename: devMode ? 'hsu-utils.[name].js' : 'hsu-utils.[name].min.js',
    globalObject: 'this',
    library: 'hsu-utils',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, './tsconfig.json')
        }
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {}
  },
  plugins: [
    new webpack.BannerPlugin(
      `\nhsu-utils v${pkg.version} \n\n${pkg.description} \n\n${fs.readFileSync(path.join(process.cwd(), 'LICENSE'))}`
    ),
  ],
  optimization: {
    minimizer: devMode
      ? []
      : [
          // 压缩js代码
          // webpack v5 使用内置的TerserJSPlugin替代UglifyJsPlugin，因为UglifyJsPlugin不支持ES6
          new TerserJSPlugin({
            parallel: true // 使用多进程并行运行
          }),
        ]
  }
}

module.exports = config