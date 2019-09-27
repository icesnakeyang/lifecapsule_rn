import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Button, DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import actions from "../../../action";
import NavigationUtil from "../../../navigator/NavigationUtil";
import GetLeftButton from "../../../common/component/GetLeftButton";
import NavigationBar from "../../../common/component/NavigationBar";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtLoginName: '',
            txtPassword: '',
            oldToken: '',
            newToken: ''
        }
    }

    login() {
        this.setState({
            oldToken: this.props.user.user.token
        })
        const {loginUserByNamePass} = this.props
        loginUserByNamePass(this.state.txtLoginName, this.state.txtPassword, (result) => {
            DeviceEventEmitter.emit('Refresh_NoteList')
            NavigationUtil.goPage({}, 'HomePage')
        })
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.theme.THEME_COLOR,
            barStyle: 'light-content'
        }
        let navigationBar = (
            <NavigationBar
                title={'Sign in'}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.theme.THEME_COLOR}}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <View style={{flexDirection: 'row', margin: 10}}>
                    <Text>Login Name: </Text>
                    <View style={{flex: 1}}>
                        <TextInput
                            style={{borderWidth: 1}}
                            onChangeText={(txtLoginName) => this.setState({txtLoginName})}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', margin: 10}}>
                    <Text>Password: </Text>
                    <View style={{flex: 1}}>
                        <TextInput
                            style={{borderWidth: 1}}
                            onChangeText={(txtPassword) => this.setState({txtPassword})}
                        />
                    </View>
                </View>
                <Button
                    color={this.props.theme.theme.THEME_COLOR}
                    title={'Login'}
                    onPress={() => {
                        this.login()
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({
    loginUserByNamePass: (username, password, callback) => dispatch(actions.loginUserByNamePass(username, password, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)