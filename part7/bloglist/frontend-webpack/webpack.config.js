const path = require('path');
const webpack = require('webpack');

const config = (env, argv) => {
  console.log('argv', argv.mode)

  const production_backend = 'http://localhost:3003';
  const development_backend = production_backend;

  const backend_url = argv.mode === 'production'
    ? production_backend
    : development_backend;

  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'main.js',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      compress: true,
      port: 3000,
      proxy: {
        '/api': 'http://localhost:3003',
      }
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            emitError: true,
            fix: true,
            cache: true,
          }
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
        },
      ]
    },
    performance: {
      hints: false,
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
      }),
    ]
  }
}

module.exports = config;