const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    devtool: false,
    entry: './src/main.js',
    mode: "development",
    devServer: {
      port: 3000,
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
            // 构建输出的文件名。对应app2引入的的remoteEntry.js
            filename: "remoteEntry.js",
            // 必传值，即输出的模块名，被远程引用时路径为${name}/${expose}
            name: "app1",
            // 声明全局变量的方式，name为umd的name
            library: { type: "var", name: "app1" },
            // 需要暴露的模块，使用时通过 `${name}/${expose}` 引入
            exposes: {
                './Header': "./src/components/Header.vue",
                './Footer': "./src/components/Footer.vue",
            },
            // 与其他应用之间可以共享的第三方依赖，使你的代码中不用重复加载同一份依赖
            // shared: ["vue"]
          })
      ]
}
