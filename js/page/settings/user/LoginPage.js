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
            console.log(result)
            DeviceEventEmitter.emit('Refresh_NoteList')
            NavigationUtil.goPage({}, 'HomePage')
        })
    }

    render() {
        return (
            <View>
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
                < Button
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
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    loginUserByNamePass: (username, password, callback) => dispatch(actions.loginUserByNamePass(username, password, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)