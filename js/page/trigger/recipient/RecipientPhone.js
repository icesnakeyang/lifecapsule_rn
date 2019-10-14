import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../../common/component/GetLeftButton";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationBar from "../../../common/component/NavigationBar";
import {I18nJs} from "../../../language/I18n";
import actions from "../../../action";
import NavigationUtil from "../../../navigator/NavigationUtil";

class RecipientPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            editPhone: ''
        }
    }

    componentDidMount() {
        this.loadAllData()
    }

    componentWillUnmount() {

    }

    loadAllData() {
        if (this.props.trigger.recipient) {
            this.setState({
                phone: this.props.trigger.recipient.phone,
                editPhone: this.props.trigger.recipient.phone
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
                    onPress={() => {
                        this.saveRecipient()
                    }}
                    style={{margin: 8}}
                >
                    <View>
                        <Ionicons
                            name={'md-checkmark'}
                            size={26}
                            style={{color: this.props.theme.THEME_HEAD_TEXT}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    saveRecipient() {
        let recipient = {}
        if (this.props.trigger.recipient) {
            recipient = this.props.trigger.recipient
        }
        recipient.phone = this.state.editPhone
        const {saveRecipient} = this.props
        saveRecipient(recipient, (result) => {
            DeviceEventEmitter.emit('Refresh_RecipientDetail')
            NavigationUtil.goPage({}, 'RecipientDetail')
        })
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('trigger.phone')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <TextInput
                    defaultValue={this.state.phone}
                    onChangeText={(editPhone) => this.setState({editPhone})}
                />
            </View>
        )
    }
}

const
    mapStateToProps = state => ({
        theme: state.theme.theme,
        trigger: state.trigger
    })

const
    mapDispatchToProps = dispatch => ({
        saveRecipient: (params, callback) => dispatch(actions.saveRecipient(params, callback))
    })

export default connect(mapStateToProps, mapDispatchToProps)(RecipientPhone)