const _ = require('lodash')

module.exports = _(require('./webpack.config'))
.chain()
.clone()
.extend({
  output: {
    path: '/',
    filename: '/walderpi-media-server/scripts/bundle.js',
  },
  devtool: 'cheap-module-inline-source-map',
  plugins: [],
})
.value()
