/* eslint-disable */
require('babel-polyfill')
require('babel-register')

const express = require('express')
const compression = require('compression')
require('pug')
const bodyParser = require('body-parser')

const appBaseUrl = '/home-hue-svc'

const app = express()
app.set('view engine', 'pug')
app.use(compression())


if ( process.env.NODE_ENV !== 'production' ) {
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpack = require('webpack')
  const middlewareOptions = {
    stats: { colors: true },
    noInfo: true, // Comment this out for more verbose webpack information
  }
  app.use(webpackDevMiddleware(webpack(require('./webpack.dev.config')), middlewareOptions))
}

app.use(bodyParser.json());

app.use(`${appBaseUrl}/services/v1`, require('./routes/V1Services'))

app.get('/*', ( req, res ) => {
  // template is not actually needed because we're not doing server-side rendering... you could pre-render
  // the template and send a string or just use static html
  res.render('page', { appBaseUrl, title: 'home-hue-svc' })
})

const port = parseInt(process.env.PORT || 3000, 10)

const server = app.listen(port, () => {
  const address = server.address()
  const url = `http://${address.host || 'localhost'}:${port}`
  console.info(`Listening at ${url}`)
})
