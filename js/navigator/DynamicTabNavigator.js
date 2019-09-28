import React, {Component} from 'react'
import {
    createBottomTabNavigator,
    createAppContainer,
    BottomTabBar
} from 'react-navigation'
import NoteListPage from "../page/note/NoteListPage";
import NoteCategoryPage from "../page/category/NoteCategoryPage";
import NewNotePage from "../page/note/NewNotePage";
import SettingsPage from "../page/settings/SettingsPage";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from "react-redux";
import {I18nJs} from "../language/I18n";

class DynamicTabNavigator extends Component {
    constructor(props) {
        super(props);
        this.TABS = {
            Note: {
                screen: NoteListPage,
                navigationOptions: {
                    tabBarLabel: I18nJs.t('bottomBar.recent'),
                    tabBarIcon: ({tintColor, focused}) => (
                        <Ionicons
                            name={'ios-journal'}
                            size={26}
                            style={{color: tintColor}}
                        />
                    )
                }
            },
            Category: {
                screen: NoteCategoryPage,
                navigationOptions: {
                    tabBarLabel: I18nJs.t('bottomBar.category'),
                    tabBarIcon: ({tintColor, focused}) => (
                        <Ionicons
                            name={'ios-folder'}
                            size={26}
                            style={{color: tintColor}}
                        />
                    )
                }
            },
            Settings: {
                screen: SettingsPage,
                navigationOptions: {
                    tabBarLabel: I18nJs.t('bottomBar.settings'),
                    tabBarIcon: ({tintColor, focused}) => (
                        <Ionicons
                            name={'ios-settings'}
                            size={32}
                            style={{color: tintColor}}
                        />
                    )
                }
            }
        }
    }

    _genBottomTab() {
        console.log(I18nJs.locale)
        if (this.Tabs) {
            return this.Tabs
        }
        this.Tabs = createAppContainer(
            createBottomTabNavigator(this.TABS, {
                tabBarComponent: props => {
                    return (
                        <TabBarComponent
                            {...props}
                            theme={this.props.theme}
                        />
                    )
                }
            })
        )
        return this.Tabs
    }

    render() {
        const Tab = this._genBottomTab()
        return (
            <Tab/>
        )
    }
}

class TabBarComponent extends Component {
    constructor(props) {
        super(props)
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        }
    }

    render() {
        console.log(this.props)
        console.log(I18nJs.locale)
        return (
            <BottomTabBar
                {...this.props}
                activeTintColor={this.props.theme.THEME_COLOR}
            />
        )
    }

}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator)