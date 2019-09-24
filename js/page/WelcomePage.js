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
        console.log(this.props)
        /**
         * 首先，检查用户的token，如果有token，就跳转到首页，
         * 如果没有token，就创建token，然后再检查
         * 如果创建成功，就跳转到首页
         * @type {number}
         */
        this.timer = setTimeout(() => {
            console.log(this.props)
            let user = this.props.user.user
            if (!user || !user.token) {
                this.createBlankUser()
                user = this.props.user.user
                if (!user || !user.token) {
                    //跳转到错误页面
                }
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

    createBlankUser() {
        const {createBlankToken} = this.props
        createBlankToken()
    }


    render() {
        console.log(this.props)
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome LefeCapsule</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme
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
        backgroundColor: '#008871'
    },
    welcome: {
        fontSize: 26,
        color: '#ddd'
    }
})