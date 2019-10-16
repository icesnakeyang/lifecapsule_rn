import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions
} from 'react-native'
import {connect} from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons'
import GetLeftButton from "../../../common/component/GetLeftButton";
import NavigationBar from "../../../common/component/NavigationBar";
import {I18nJs} from "../../../language/I18n";
import actions from "../../../action";
import Toast from 'react-native-easy-toast'
import NavigationUtil from "../../../navigator/NavigationUtil";

class PhoneBindingPage extends Component {
    constructor(props) {
        super(props);
        const {width, height} = Dimensions.get("window")
        this.state = {
            phoneNumber: '',
            screen_width: width,
            screen_height: height
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
                        const {bindPhone1} = this.props
                        const params = {
                            phone: this.state.txtPhone,
                            token: this.props.user.user.token
                        }
                        bindPhone1(params, (result) => {
                            if (result) {
                                NavigationUtil.goPage({}, 'SecurityPage')
                            } else {
                                {
                                    this.refs.toast.show(I18nJs.t('security.phone1Fail'))
                                }
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
                title={I18nJs.t('security.phone')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View
                style={{flex: 1, height: this.state.screen_height, backgroundColor: this.props.theme.THEME_BACK_COLOR}}>
                {navigationBar}
                <View style={{
                    flexDirection: 'row',
                    margin: 10,
                    marginTop: 20,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View>
                        <Text>{I18nJs.t('security.phoneNumber')}</Text>
                    </View>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <TextInput
                            style={{borderBottomWidth: 0.5, padding: 0}}
                            onChangeText={(txtPhone) => this.setState({txtPhone})}
                        />
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
    bindPhone1: (params, callback) => dispatch(actions.bindPhone1(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBindingPage)