import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import {Provider} from 'react-redux'
import App from './components/App.js'
import './styles/style.css'

const rootEl = document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    rootEl
)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    ReactDOM.render(
        <Provider store={store}>
          <NextApp/>
        </Provider>,
        rootEl
    )
  })
}