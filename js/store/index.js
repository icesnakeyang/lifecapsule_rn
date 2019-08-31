import {middleware} from "../navigator/AppNavigator";
import {applyMiddleware, createStore} from "redux";
import reducers from '../reducer'

const middlewares = [
    middleware
]

export default createStore(reducers, applyMiddleware(...middlewares))