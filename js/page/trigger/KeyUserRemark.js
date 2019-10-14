import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    DeviceEventEmitter,
    Dimensions
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import actions from "../../action";
import NavigationUtil from "../../navigator/NavigationUtil";
import Textarea from "react-native-textarea";
import {saveRemarkServer} from "../../action/trigger";

class KeyUserRemark extends Component {
    constructor(props) {
        super(props);
        let {height, width} = Dimensions.get('window')
        this.state = {
            remark: '',
            editRemark: '',
            screen_height: height,
            screen_width: width
        }
    }

    componentDidMount() {
        this.loadAllData()
    }

    loadAllData() {
        if (this.props.trigger.remark) {
            this.setState({
                remark: this.props.trigger.remark
            })
        } else {
            if (this.props.trigger.trigger && this.props.trigger.trigger.remark) {
                this.setState({
                    remark: this.props.trigger.trigger.remark
                })
            }
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
                        this.saveRemark()
                    }}
                    style={{margin: 8, marginRight: 13}}>
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

    saveRemark() {
        let params = {
            token: this.props.user.user.token,
            noteId: this.props.note.note.noteId
        }
        if (this.props.trigger.trigger && this.props.trigger.trigger.triggerId) {
            params.triggerId = this.props.trigger.trigger.triggerId
        }
        params.remark = this.state.editRemark


        const {saveRemarkServer} = this.props

        saveRemarkServer(params, (result) => {
            if (result) {
                DeviceEventEmitter.emit('Refresh_TriggerPage')
                NavigationUtil.goPage({...params}, 'TriggerPage')
            }
        })
    }


    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('trigger.userRemark')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={{flex: 1, backgroundColor: this.props.theme.THEME_BACK_COLOR}}>
                {navigationBar}
                <View style={{flex: 1}}>
                    <Textarea containerStyle={{
                        height: this.state.screen_height,
                        backgroundColor: this.props.theme.THEME_ROW_COLOR
                    }}
                              defaultValue={this.state.remark}
                              onChangeText={(editRemark) => this.setState({editRemark})}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    trigger: state.trigger,
    note: state.note,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    saveRemarkServer: (params, callback) => dispatch(actions.saveRemarkServer(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(KeyUserRemark)