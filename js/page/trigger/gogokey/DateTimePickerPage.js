import React, {Component} from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native'
import DatePicker from "react-native-datepicker";

import {connect} from "react-redux";
import GetLeftButton from "../../../common/component/GetLeftButton";
import NavigationBar from "../../../common/component/NavigationBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import actions from "../../../action";
import NavigationUtil from "../../../navigator/NavigationUtil";
import {saveTrigger} from "../../../action/trigger";

class DateTimePickerPage extends Component {
    constructor(props) {
        super(props);
        let {height, width} = Dimensions.get('window')
        this.state = {
            param: '',
            value: '',
            width: width
        }
    }

    componentDidMount() {
        this.loadAllData()
    }

    loadAllData() {
        this.setState({
            param: this.props.navigation.state.params.param,
            value: this.props.navigation.state.params.value
        })
    }


    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    GetRightButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{padding: 5, paddingRight: 8}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.saveTheTrigger()
                        }}
                    >
                        <Ionicons
                            name={'md-checkmark'}
                            size={26}
                            style={{color: this.props.theme.THEME_ICON_COLOR}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    saveTheTrigger() {
        const {saveTrigger} = this.props
        let trigger = this.props.trigger.trigger
        if (trigger.gogoKey.keyParams.length > 0) {
            trigger.gogoKey.keyParams.forEach((item, index) => {
                if (item.param === this.state.param) {
                    item.value = this.state.value
                }
            })
        } else {
            trigger.gogoKey.keyParams = [
                {
                    param: this.state.param,
                    value: this.state.value
                }
            ]
        }

        saveTrigger(trigger, (result) => {
            if (result) {
                DeviceEventEmitter.emit('refresh_key_detail')
                NavigationUtil.goPage({}, 'KeyDetail')
            }
        })
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar = (
            <NavigationBar
                statusBar={statusBar}
                title={'设置时间'}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.GetRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <View style={{marginTop: 20, margin: 10}}>
                    <Text>{this.state.param}</Text>
                    <DatePicker
                        style={{width: this.state.width}}
                        date={this.state.value}
                        mode='datetime'
                        placeholder="select date"
                        format="YYYY-MM-DD HH:mm"
                        confirmBtnText="confirm"
                        cancelBtnText="cancel"
                        onDateChange={(value) => {
                            this.setState({value})
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

const mapDispatchToProps = dispatch => ({
    saveTrigger: (params, callback) => dispatch(actions.saveTrigger(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(DateTimePickerPage)