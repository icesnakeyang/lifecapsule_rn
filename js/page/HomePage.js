import React, {Component} from 'react'
import {
    View
} from 'react-native'
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";

export default class HomePage extends Component {
    render() {
        return (
            <DynamicTabNavigator/>
        )
    }

}