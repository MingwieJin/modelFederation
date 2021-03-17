const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    devtool: false,
    entry: './src/main.js',
    mode: "development",
    devServer: {
      port: 3001,
      contentBase: path.join(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
        ]
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        // webpack5 federation
        new ModuleFederationPlugin({
          // 应用名，全局唯一，不可冲突
          name: "app2",
          // 远程引用的应用名及其别名的映射，使用时以key值作为name
          remotes: {
            app1: "app1@http://localhost:3000/remoteEntry.js",
          },
          // shared: ["vue"],
        })
      ]
}
