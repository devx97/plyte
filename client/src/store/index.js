import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk"

import rootReducer from '../reducers'
import socketIO from '../middlewares/socketIO'

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, socketIO())
    ))

export default store