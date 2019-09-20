import {rootCam, RootNavigator} from "../navigator/AppNavigator";
import {combineReducers} from "redux";
import theme from './theme'
import user from './user'

const navState = RootNavigator.router.getStateForAction(
    RootNavigator.router.getActionForPathAndParams(rootCam)
)

const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state)
    return nextState || state
}

const index = combineReducers({
    nav: navReducer,
    theme,
    user,
})

export default index