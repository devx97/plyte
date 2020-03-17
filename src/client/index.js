import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import {Provider} from 'react-redux'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import './styles/style.css'

const rootEl = document.getElementById('root')

const renderApp = () =>
    ReactDOM.render(
        <Provider store={store}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </Provider>,
        rootEl
    )

renderApp()

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', renderApp)
}