import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation'
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import {createReactNavigationReduxMiddleware, createReduxContainer} from "react-navigation-redux-helpers";
import {connect} from "react-redux";
import NewNotePage from "../page/note/NewNotePage";
import EditNotePage from "../page/note/EditNotePage";
import CategoryDetail from "../page/category/CategoryDetail";
import TriggerPage from "../page/TriggerPage";
import NewCategoryDetail from "../page/category/NewCategoryDetail";
import MyAccount from "../page/settings/user/MyAccount";
import LoginPage from "../page/settings/user/LoginPage";
import NickNamePage from "../page/settings/user/NickNamePage";
import LanguagePage from "../page/settings/language/LanguagePage";
import SelectCategory from "../page/category/SelectCategory";

export const rootCam = 'Init'

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    }
})

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    NewNotePage: {
        screen: NewNotePage,
        navigationOptions: {
            header: null
        }
    },
    EditNotePage: {
        screen: EditNotePage,
        navigationOptions: {
            header: null
        }
    },
    CategoryDetail: {
        screen: CategoryDetail,
        navigationOptions: {
            header: null
        }
    },
    TriggerPage: {
        screen: TriggerPage,
        navigationOptions: {
            title: 'Trigger',
            header: null
        }
    },
    NewCategoryDetail: {
        screen: NewCategoryDetail,
        navigationOptions: {
            header: null
        }
    },
    MyAccount: {
        screen: MyAccount,
        navigationOptions: {
            header: null
        }
    },
    LoginPage: {
        screen: LoginPage,
        navigationOptions: {
            header: null
        }
    },
    NickNamePage: {
        screen: NickNamePage,
        navigationOptions: {
            header: null
        }
    },
    LanguagePage: {
        screen: LanguagePage,
        navigationOptions: {
            header: null
        }
    },
    SelectCategory: {
        screen: SelectCategory,
        navigationOptions: {
            header: null
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