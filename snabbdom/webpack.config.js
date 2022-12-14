// 从https://webpack.docschina.org/
const path = require('path');

module.exports = {
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    // 虚拟打包路径，就是说文件不会真正生产，而是在8080端口虚拟生成
    publicPath: 'xuni',
    //  打包出来的文件名
    filename: 'bundle.js',
  },
  devServer: {
    // 端口号
    port: 8888,
    // 静态资源文件夹
    contentBase: 'www',
  },
};
