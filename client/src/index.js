import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'
import './styles/style.css'

const rootEl = document.getElementById('root')

ReactDOM.render(
    <App/>,
    rootEl
)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    ReactDOM.render(
        <NextApp/>,
        rootEl
    )
  })
}