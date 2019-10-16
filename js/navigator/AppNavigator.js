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
import NewCategoryDetail from "../page/category/NewCategoryDetail";
import MyAccount from "../page/settings/user/MyAccount";
import LoginPage from "../page/settings/user/LoginPage";
import NickNamePage from "../page/settings/user/NickNamePage";
import LanguagePage from "../page/settings/language/LanguagePage";
import SelectCategory from "../page/category/SelectCategory";
import TriggerPage from "../page/trigger/TriggerPage";
import KeyPlaza from "../page/trigger/gogokey/KeyPlaza";
import KeyDetail from "../page/trigger/gogokey/KeyDetail";
import KeyUserRemark from "../page/trigger/KeyUserRemark";
import DateTimePickerPage from "../page/trigger/gogokey/DateTimePickerPage";
import RecipientList from "../page/trigger/recipient/RecipientList";
import RecipientDetail from "../page/trigger/recipient/RecipientDetail";
import RecipientPhone from "../page/trigger/recipient/RecipientPhone";
import RecipientName from "../page/trigger/recipient/RecipientName";
import RecipientEmail from "../page/trigger/recipient/RecipientEmail";
import RecipientAddress from "../page/trigger/recipient/RecipientAddress";
import RecipientRemark from "../page/trigger/recipient/RecipientRemark";
import EmailBindingPage from "../page/settings/user/EmailBindingPage";
import PhoneBindingPage from "../page/settings/user/PhoneBindingPage";
import SecurityPage from "../page/settings/user/SecurityPage";
import PasswordPage from "../page/settings/user/PasswordPage";

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
    },
    TriggerPage: {
        screen: TriggerPage,
        navigationOptions: {
            header: null
        }
    },
    KeyPlaza: {
        screen: KeyPlaza,
        navigationOptions: {
            header: null
        }
    },
    KeyDetail: {
        screen: KeyDetail,
        navigationOptions: {
            header: null
        }
    },
    KeyUserRemark: {
        screen: KeyUserRemark,
        navigationOptions: {
            header: null
        }
    },
    DateTimePickerPage: {
        screen: DateTimePickerPage,
        navigationOptions: {
            header: null
        }
    },
    RecipientList: {
        screen: RecipientList,
        navigationOptions: {
            header: null
        }
    },
    RecipientDetail: {
        screen: RecipientDetail,
        navigationOptions: {
            header: null
        }
    },
    RecipientPhone: {
        screen: RecipientPhone,
        navigationOptions: {
            header: null
        }
    },
    RecipientName: {
        screen: RecipientName,
        navigationOptions: {
            header: null
        }
    },
    RecipientEmail: {
        screen: RecipientEmail,
        navigationOptions: {
            header: null
        }
    },
    RecipientAddress: {
        screen: RecipientAddress,
        navigationOptions: {
            header: null
        }
    },
    RecipientRemark: {
        screen: RecipientRemark,
        navigationOptions: {
            header: null
        }
    },
    SecurityPage: {
        screen: SecurityPage,
        navigationOptions: {
            header: null
        }
    },
    PasswordPage: {
        screen: PasswordPage,
        navigationOptions: {
            header: null
        }
    },
    PhoneBindingPage: {
        screen: PhoneBindingPage,
        navigationOptions: {
            header: null
        }
    },
    EmailBindingPage: {
        screen: EmailBindingPage,
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