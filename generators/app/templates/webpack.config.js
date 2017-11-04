const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'bundle.css'
})

module.exports = {
  entry: './app/app.module.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'ng-annotate-loader' },
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          },
        ]
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: extractPlugin.extract({
          use: ['css-loader']
        })
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'ngtemplate-loader?relativeTo=' + __dirname + '/' },
          { loader: 'html-loader' }
        ]
      },
    ]
  },
  plugins: [
    extractPlugin,
  ]
};