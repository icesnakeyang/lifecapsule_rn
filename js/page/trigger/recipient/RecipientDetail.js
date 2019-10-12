import React, {Component} from 'react'
import {
    View,
    Text,
    Button, DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../../common/component/GetLeftButton";
import NavigationBar from "../../../common/component/NavigationBar";
import {I18nJs} from "../../../language/I18n";
import InputRow from "../../../common/component/InputRow";
import NavigationUtil from "../../../navigator/NavigationUtil";

class RecipientDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: {}
        }
    }

    componentDidMount() {
        this.loadAllData()
        this.listener = DeviceEventEmitter.addListener('Refresh_RecipientDetail', (params) => {
            this.loadAllData()
        })
    }

    componentWillUnmount() {
        this.listener.remove()
    }

    loadAllData() {
        console.log(this.props)
        if (this.props.trigger.recipient) {
            console.log('fix')
            this.setState({
                recipient: this.props.trigger.recipient
            })
        } else {
            console.log('new')
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    saveData() {
        console.log(this.props.trigger.recipient)
        return
        let recipientList = []
        if (this.props.trigger.trigger.recipientList.length > 0) {
        } else {
            let recipient = {
                phone: this.state.editPhone
            }
            recipientList.push(recipient)
        }
        let trigger = this.props.trigger.trigger
        trigger.recipientList = recipientList
        const {saveTrigger} = this.props
        saveTrigger(trigger, (result) => {
        })
    }

    _showData() {
        let showData = {
            name: '',
            phone: '',
            email: '',
            address: '',
            remark: ''
        }
        if (this.props.trigger.recipient) {
            if (this.props.trigger.recipient.phone) {
                showData.phone = this.props.trigger.recipient.phone
            }
            if (this.props.trigger.recipient.name) {
                showData.name = this.props.trigger.recipient.name
            }
            if (this.props.trigger.recipient.email) {
                showData.email = this.props.trigger.recipient.email
            }
            if (this.props.trigger.recipient.address) {
                showData.address = this.props.trigger.recipient.address
            }
            if (this.props.trigger.recipient.remark) {
                showData.remark = this.props.trigger.recipient.remark
            }
        }
        return showData
    }

    render() {
        let showData = this._showData()
        let statusBar = {
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar = (
            <NavigationBar
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                title={I18nJs.t('trigger.addRecipient')}
                leftButton={this.getLeftButton()}
            >
            </NavigationBar>
        )
        return (
            <View>
                {navigationBar}
                <Text>recipient detail</Text>
                <InputRow
                    touchFunction={() => {
                        NavigationUtil.goPage({...this.props}, 'RecipientName')
                    }}
                    label={I18nJs.t('trigger.name')}
                    content={showData.name}
                    showLabel={true}
                />
                <InputRow
                    touchFunction={() => {
                        NavigationUtil.goPage({...this.props}, 'RecipientPhone')
                    }}
                    label={I18nJs.t('trigger.phone')}
                    content={showData.phone}
                    showLabel={true}
                />
                <InputRow
                    touchFunction={() => {
                        NavigationUtil.goPage({...this.props}, 'RecipientEmail')
                    }}
                    label={I18nJs.t('trigger.email')}
                    content={showData.email}
                    showLabel={true}
                />
                <InputRow
                    touchFunction={() => {
                        NavigationUtil.goPage({...this.props}, 'RecipientAddress')
                    }}
                    label={I18nJs.t('trigger.address')}
                    content={showData.address}
                    showLabel={true}
                />
                <InputRow
                    touchFunction={() => {
                        NavigationUtil.goPage({...this.props}, 'RecipientRemark')
                    }}
                    label={I18nJs.t('trigger.recipientRemark')}
                    content={showData.remark}
                    showLabel={true}
                />
                <View>
                    <Button
                        color={this.props.theme.THEME_COLOR}
                        title={I18nJs.t('trigger.btSaveRecipient')}
                        onPress={() => {
                            this.saveData()
                        }}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    trigger: state.trigger
})

export default connect(mapStateToProps)(RecipientDetail)