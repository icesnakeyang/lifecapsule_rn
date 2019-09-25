import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import NavigationUtil from "../navigator/NavigationUtil";
import actions from "../action";
import {connect} from "react-redux";

class WelcomePage extends Component {
    componentDidMount() {
        this.loadData()
        this.timer = setTimeout(() => {
            NavigationUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        }, 500)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    loadData() {
        const {loginUserAuto} = this.props
        loginUserAuto()
    }

    _store() {
        const {user} = this.props
        let store = {}
        if (user.user) {
            store = {
                name: user.user.nickName
            }
        }
        return store
    }

    render() {
        let store = this._store()
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome LefeCapsule</Text>
                <Text style={styles.user_name}>{store.name}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({
    loginUserAuto: () => dispatch(actions.loginUserAuto())
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008871'
    },
    welcome: {
        fontSize: 26,
        color: '#ddd'
    },
    user_name: {
        fontSize: 20,
        color: '#ddd'
    }
})