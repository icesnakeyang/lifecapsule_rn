import React, {Component} from 'react'
import {
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation'
import NoteListPage from "../page/NoteListPage";
import NoteCategoryPage from "../page/NoteCategoryPage";
import NewNotePage from "../page/NewNotePage";
import SettingsPage from "../page/SettingsPage";
import Ionicons from 'react-native-vector-icons/Ionicons'

const TABS = {
    Note: {
        screen: NoteListPage,
        navigationOptions: {
            tabBarLabel: 'Note',
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
        this.Tabs = createBottomTabNavigator(TABS)
        return this.Tabs
    }

    render() {
        const Tab = createAppContainer(this._genBottomTab())
        return (
            <Tab/>
        )
    }
}

export default DynamicTabNavigator