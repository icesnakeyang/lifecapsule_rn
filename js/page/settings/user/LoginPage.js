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
import {I18nJs} from "../../../language/I18n";
import Toast from "react-native-easy-toast";

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
            if (result) {
                DeviceEventEmitter.emit('Refresh_NoteList')
                NavigationUtil.goPage({}, 'HomePage')
            } else {
                this.refs.toast.show(I18nJs.t('syserr.' + this.props.user.error));
            }
        })
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.theme.THEME_HEAD_COLOR,
            barStyle: 'light-content'
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('myAccount.login')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <View style={{
                    flexDirection: 'row',
                    margin: 10,
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{paddingBottom: 3}}>{I18nJs.t('myAccount.loginName')}</Text>
                    <View style={{flex: 1, marginLeft: 20}}>
                        <TextInput
                            style={{borderBottomWidth: 0.5, padding: 0}}
                            onChangeText={(txtLoginName) => this.setState({txtLoginName})}
                        />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    margin: 10,
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{paddingBottom: 3}}>{I18nJs.t('myAccount.password')}</Text>
                    <View style={{
                        flex: 1,
                        marginLeft: 20,
                    }}>
                        <TextInput
                            style={{borderBottomWidth: 0.5, padding: 0}}
                            onChangeText={(txtPassword) => this.setState({txtPassword})}
                        />
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <Button
                        color={this.props.theme.theme.THEME_HEAD_COLOR}
                        title={I18nJs.t('myAccount.login')}
                        onPress={() => {
                            this.login()
                        }}
                    />
                </View>
                <Toast ref={'toast'}
                       position={'center'}
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