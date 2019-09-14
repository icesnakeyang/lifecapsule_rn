import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import NavigationUtil from "../navigator/NavigationUtil";
import actions from "../action";
import {connect} from "react-redux";
import {create} from "react-native/jest/renderer";

class WelcomePage extends Component {
    componentDidMount() {
        this.loadData()
        this.timer = setTimeout(() => {
            console.log(this.props.user.user.token)
            const user = this.props.user.user
            console.log(user.token)
            if (!user || !user.token) {
                console.log('no user')
                this.createBlankUser().then(response => {
                    console.log(response)
                })

                console.log(user)
            }
            NavigationUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        }, 1000)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    loadData() {
        const {getLocalToken} = this.props
        getLocalToken()
    }

    async createBlankUser() {
        const {createBlankUser} = this.props
        await createBlankUser()
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome page</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    getLocalToken: () => dispatch(actions.getLocalToken()),
    createBlankToken: () => dispatch(actions.createBlankToken()),
    loginUser: () => dispatch(actions.loginUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)

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