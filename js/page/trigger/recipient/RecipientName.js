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

class RecipientName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            editName: ''
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
                name: this.props.trigger.recipient.recipientName,
                editName: this.props.trigger.recipient.recipientName
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
                        this.saveName()
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

    saveName() {
        let recipient = {}
        if (this.props.trigger.recipient) {
            recipient = this.props.trigger.recipient
        }
        recipient.recipientName = this.state.editName
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
                title={I18nJs.t('trigger.name')}
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
                    defaultValue={this.state.name}
                    onChangeText={(editName) => this.setState({editName})}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    trigger: state.trigger
})

const mapDispatchToProps = dispatch => ({
    saveRecipient: (params, callback) => dispatch(actions.saveRecipient(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipientName)