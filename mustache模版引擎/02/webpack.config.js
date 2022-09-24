const path = require('path');

module.exports = {
  // 模式：开发
  mode: 'development',
  //  入口
  entry: './src/index.js',
  // 打包什么样的文件
  output: {
    filename: 'build.js',
  },
  // 配置一下webpack-dev-serve
  devServer: {
    // 静态文件根目录
    contentBase: path.join(__dirname, 'www'),
    // 不压缩
    compress: false,
    // 端口号
    port: 8080,
    // 虚拟打包路径 build.js文件没有真的生成
    publicPath: '/sun/',
  },
};
