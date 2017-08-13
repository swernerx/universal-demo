import React from 'react'
import ReactDOM from 'react-dom/server'
import createHistory from 'history/createMemoryHistory'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import App from './components/App'
import loadMessages from './loadMessages'

export default ({ clientStats }) => (req, res) => {
  const history = createHistory({ initialEntries: [req.path] })
  const LANG = 'en'
  const messages = loadMessages(LANG)

  const app = ReactDOM.renderToString(
    <App history={history} messages={messages} />
  )
  const chunkNames = flushChunkNames()

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets
  } = flushChunks(clientStats, { chunkNames })

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)
  console.log('STYLESHEETS SERVED', stylesheets)

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          ${styles}
        </head>
        <body>
          <div id="root">${app}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
  )
}
