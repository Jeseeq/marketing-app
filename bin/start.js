const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../webpack.config')

const devServerConfig = {
  hot: true,
}

const start = async () => {

  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(compiler, devServerConfig)

  server.listen(8080, '0.0.0.0', (err) => {
    console.log(err)
  })
}


module.exports = start

module.parent || start().catch(e => {
  console.log(e)
  // process.exit(1)
})
