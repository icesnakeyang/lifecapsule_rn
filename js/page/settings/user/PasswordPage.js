import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../../common/component/GetLeftButton";
import NavigationBar from "../../../common/component/NavigationBar";
import {I18nJs} from "../../../language/I18n";
import Ionicons from 'react-native-vector-icons/Ionicons'
import actions from "../../../action";
import Toast from 'react-native-easy-toast'
import NavigationUtil from "../../../navigator/NavigationUtil";

class PasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtPassword: ''
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    getRightButton() {
        return (
            <View>
                <TouchableOpacity
                    style={{margin: 5, marginRight: 8}}
                    onPress={() => {
                        console.log(this.state)
                        const {saveLoginPassword} = this.props
                        let params = {
                            password: this.state.txtPassword,
                            token: this.props.user.user.token
                        }
                        console.log(this.props)
                        saveLoginPassword(params, (result) => {
                            if (result) {
                                this.refs.toast.show(I18nJs.t('security.savePasswordSuccess'))
                                NavigationUtil.goPage({}, 'SecurityPage')
                            } else {
                                this.refs.toast.show(I18nJs.t('security.savePasswordFail'))
                            }
                        })
                    }}
                >
                    <Ionicons
                        name={'md-checkmark'}
                        size={26}
                        style={{color: this.props.theme.THEME_HEAD_TEXT}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('security.password')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <View>
                    <View style={{
                        flexDirection: 'row',
                        margin: 10,
                        justifyContent: 'center',
                        alignItems: 'flex-end'
                    }}>
                        <Text style={{paddingBottom: 3}}>{I18nJs.t('security.newPassword')}</Text>
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
                </View>
                <Toast ref={'toast'}
                       position={'center'}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    saveLoginPassword: (params, callback) => dispatch(actions.saveLoginPassword(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPage)