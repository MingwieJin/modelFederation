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
            // 远程应用时被其他应用引入的js文件名称。对应app2引入的的remoteEntry.js
            filename: "remoteEntry.js",
            // 应用名，全局唯一，不可冲突
            name: "app1",
            // UMD标准导出，和name保持一致即可
            library: { type: "var", name: "app1" },
            // 需要暴露的模块，使用时通过 `${name}/${expose}` 引入
            exposes: {
                './Header': "./src/components/Header.vue",
            },
            // 若是配置了这个属性。webpack在加载的时候会先判断本地应用是否存在对应的包，若是不存在，则加载远程应用的依赖包。
            // shared: ["vue"]
          })
      ]
}
