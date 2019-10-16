import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../../common/component/GetLeftButton";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationBar from "../../../common/component/NavigationBar";
import {I18nJs} from "../../../language/I18n";
import actions from "../../../action";
import Toast from 'react-native-easy-toast'
import NavigationUtil from "../../../navigator/NavigationUtil";

class EmailBindingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldEmail: '',
            editEmail: ''
        }
    }

    componentDidMount() {
        if (this.props.user.user && this.props.user.user.email) {
            this.setState({
                oldEmail: this.props.user.user.email
            })
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
                        let params = {
                            email: this.state.editEmail,
                            token: this.props.user.user.token
                        }
                        const {bindEmail1} = this.props
                        bindEmail1(params, (result) => {
                            if (result) {
                                this.refs.toast.show(I18nJs.t('security.saveEmailSuccess'))
                                NavigationUtil.goPage({}, 'SecurityPage')
                            } else {
                                this.refs.toast.show(I18nJs.t('security.saveEmailFail'))
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
                title={I18nJs.t('security.email')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <View style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View>
                        <Text>{I18nJs.t('security.emailAddress')}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <TextInput
                            style={{borderBottomWidth: 0.5, paddingBottom: 0}}
                            defaultValue={this.state.oldEmail}
                            onChangeText={(editEmail) => this.setState({editEmail})}
                        />
                    </View>
                </View>
                <Toast
                    ref={'toast'}
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
    bindEmail1: (params, callback) => dispatch(actions.bindEmail1(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmailBindingPage)