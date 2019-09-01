import {middleware} from "../navigator/AppNavigator";
import {applyMiddleware, createStore} from "redux";
import reducers from '../reducer'
import thunk from "redux-thunk";

const middlewares = [
    middleware,
    thunk
]

export default createStore(reducers, applyMiddleware(...middlewares))