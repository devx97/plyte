import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk"

import socketIO from '../middlewares/socketIO'
import rootReducer from '../reducers'

const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, socketIO(process.env.PORT || 'http://192.168.0.15:4000'))
    ))

export default store