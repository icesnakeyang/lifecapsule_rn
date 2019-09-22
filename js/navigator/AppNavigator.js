import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation'
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import {createReactNavigationReduxMiddleware, createReduxContainer} from "react-navigation-redux-helpers";
import {connect} from "react-redux";
import NewNotePage from "../page/NewNotePage";
import EditNotePage from "../page/EditNotePage";
import CategoryDetail from "../page/CategoryDetail";
import TriggerPage from "../page/TriggerPage";

export const rootCam = 'Init'

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage
    }
})

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions:{
            header:null
        }
    },
    NewNotePage: {
        screen: NewNotePage
    },
    EditNotePage: {
        screen: EditNotePage
    },
    CategoryDetail: {
        screen: CategoryDetail
    },
    TriggerPage:{
        screen:TriggerPage,
        navigationOptions:{
            title:'Trigger',
            header:null
        }
    }
})

export const RootNavigator = createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator
})

// export default createAppContainer(RootNavigator)

export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root'
)

const AppWithNavigationState = createReduxContainer(
    RootNavigator,
    'root'
)

const mapStateToProps = state => ({
    state: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)