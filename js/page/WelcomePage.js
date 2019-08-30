import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import NavigationUtil from "../navigator/NavigationUtil";

export default class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            NavigationUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        }, 500)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome page</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#405697'
    },
    welcome: {
        fontSize: 26,
        color: '#f4f6ff'
    }
})