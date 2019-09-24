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
        /**
         * 首先，检查用户的token，如果有token，就跳转到首页，
         * 如果没有token，就创建token，然后再检查
         * 如果创建成功，就跳转到首页
         * @type {number}
         */
        this.timer = setTimeout(() => {
            let user = this.props.user.user
            console.log(this.props)
            if (!user || !user.token) {
                //本地没有用户，创建一个临时用户
                this.createBlankUser()
                user = this.props.user.user
                if (!user || !user.token) {
                    //跳转到错误页面
                }
            } else {
                //本地有用户，检测用户是否过期
                //如果用户已过期，则自动续签一个token
                const {loginUser} = this.props
                loginUser(user.token)
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
    loginUser: (token) => dispatch(actions.loginUser(token))
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