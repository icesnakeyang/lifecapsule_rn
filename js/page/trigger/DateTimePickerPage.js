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
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import actions from "../../action";
import NavigationUtil from "../../navigator/NavigationUtil";

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
                            const {saveParam} = this.props
                            const params = {
                                param: this.state.param,
                                value: this.state.value
                            }
                            saveParam(params, (result) => {
                                if (result) {
                                    DeviceEventEmitter.emit('refresh_trigger_detail')
                                    NavigationUtil.goPage({}, 'KeyDetail')
                                }
                            })
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
    saveParam: (params, callback) => dispatch(actions.saveParam(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(DateTimePickerPage)