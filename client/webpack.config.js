const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      new WebpackPwaManifest({
        name: 'JATE manifest',
        short_name: 'jateman',
        description:'Manifest for shipping my logos',
        background_color: '#3effed',
        start_url: "./",
        theme_color: "#56177a",
        orientation:'portrait',
        display:'standalone',
        icons:[
          {
            src: path.resolve('./src/images/logo.png'),
            sizes:[96, 128, 192, 256, 384, 512]
          }
        ]//
      }), 
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js'
    }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use:['style-loader','css-loader']
        },
        {
          test:/\.m?js$/,
          exclude:/node_modules/,
          use:{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }
          }
        }
      ],
    },
  };
};
