const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  publicPath: "/",
  productionSourceMap: false,
  transpileDependencies: ["vue-echarts", "resize-detector"],
  configureWebpack: () => {
    let config = {
      optimization: {
        splitChunks: {
          chunks: "all"
        }
      }
    };

    if (process.env.NODE_ENV === "production") {
      config = {
        ...config,
        ...{
          plugins: [
            new CompressionWebpackPlugin({
              filename: "[path].gz[query]",
              algorithm: "gzip",
              test: /\.js$|\.css$|\.html$/,
              threshold: 10240,
              minRatio: 0.8
            }),
            new CompressionWebpackPlugin({
              filename: "[path].br[query]",
              algorithm: "brotliCompress",
              test: /\.(js|css|html|svg)$/,
              compressionOptions: { level: 11 },
              threshold: 10240,
              minRatio: 0.8
            })
          ]
        }
      };
    }

    return config;
  }
};
