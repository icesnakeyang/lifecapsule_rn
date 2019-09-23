import React, {Component} from 'react'
import {
    createBottomTabNavigator,
    createAppContainer,
    BottomTabBar
} from 'react-navigation'
import NoteListPage from "../page/note/NoteListPage";
import NoteCategoryPage from "../page/category/NoteCategoryPage";
import NewNotePage from "../page/note/NewNotePage";
import SettingsPage from "../page/SettingsPage";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from "react-redux";

const TABS = {
    Note: {
        screen: NoteListPage,
        navigationOptions: {
            tabBarLabel: 'NoteList',
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
            tabBarLabel: 'Category',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-folder'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    New: {
        screen: NewNotePage,
        navigationOptions: {
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-add-circle'}
                    size={32}
                    style={{color: tintColor}}
                />
            )
        }
    },
    Settings: {
        screen: SettingsPage,
        navigationOptions: {
            tabBarLabel: 'Settings',
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

class DynamicTabNavigator extends Component {
    _genBottomTab() {
        if (this.Tabs) {
            return this.Tabs
        }
        this.Tabs = createAppContainer(
            createBottomTabNavigator(TABS, {
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