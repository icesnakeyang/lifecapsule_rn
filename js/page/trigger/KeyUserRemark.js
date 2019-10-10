import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput, DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import actions from "../../action";
import NavigationUtil from "../../navigator/NavigationUtil";
import Textarea from "react-native-textarea";

class KeyUserRemark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remark: '',
            editRemark: ''
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
                            style={{color: this.props.theme.THEME_ICON_COLOR}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    saveRemark() {
        const {saveTriggerRemark} = this.props
        let params = {
            remark: this.state.editRemark
        }
        saveTriggerRemark(params, (result) => {
            if (result) {
                DeviceEventEmitter.emit('Refresh_TriggerPage')
                NavigationUtil.goPage({...params}, 'TriggerPage')
            }
        })
    }


    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('trigger.userRemark')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <View style={{flex: 1, backgroundColor: '#555'}}>
                    <Textarea containerStyle={{flex: 1}}
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
    trigger: state.trigger
})

const mapDispatchToProps = dispatch => ({
    saveTriggerRemark: (params, callback) => dispatch(actions.saveTriggerRemark(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(KeyUserRemark)