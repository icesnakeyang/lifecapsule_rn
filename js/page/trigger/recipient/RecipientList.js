import React, {Component} from 'react'
import {
    View,
    Text, TouchableOpacity, DeviceEventEmitter, FlatList
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../../common/component/GetLeftButton";
import NavigationBar from "../../../common/component/NavigationBar";
import {I18nJs} from "../../../language/I18n";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationUtil from "../../../navigator/NavigationUtil";
import InputRow from "../../../common/component/InputRow";
import actions from "../../../action";

class RecipientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipientList: []
        }
    }

    componentDidMount() {
        this.loadAllData()
        this.listener = DeviceEventEmitter.addListener('Refresh_RecipientList', (params) => {
            this.loadAllData()
        })
    }

    componentWillUnmount() {
        this.listener.remove()
    }

    loadAllData() {
        console.log(this.props.trigger)
        if(this.props.trigger.trigger && this.props.trigger.trigger.triggerId){
            const {getTrigger}=this.props
            getTrigger()
        }
        if (this.props.trigger.trigger && this.props.trigger.trigger.recipientList.length > 0) {
            this.setState({
                recipientList: this.props.trigger.trigger.recipientList
            })
        } else {
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    getRightButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{padding: 5, paddingRight: 8}}>
                    <TouchableOpacity
                        onPress={() => {
                            NavigationUtil.goPage({}, 'RecipientDetail')
                        }}
                    >
                        <Ionicons
                            name={'md-add'}
                            size={26}
                            style={{color: this.props.theme.THEME_ICON_COLOR}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderItem(data) {
        let func = () => {
            /**
             * 把当前data保存到this.props.trigger.recipient
             * 跳转到修改页面
             */
            const {saveRecipient} = this.props
            saveRecipient(data, (result) => {
                if (result) {
                    NavigationUtil.goPage({...data}, 'RecipientDetail')
                }
            })
        }

        console.log(data)

        return (
            <InputRow
                touchFunction={func}
                content={data.recipientName}
                label={I18nJs.t('trigger.name')}
                showLabel={true}
            />
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar = (
            <NavigationBar
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                title={I18nJs.t('trigger.settingRecipient')}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <Text>recipient list</Text>
                <FlatList
                    keyExtractor={item => '' + item.ids}
                    data={this.state.recipientList}
                    renderItem={({item}) => (
                        this.renderItem(item)
                    )}
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
    saveRecipient: (params, callback) => dispatch(actions.saveRecipient(params, callback)),
    getTrigger: (params, callback) => dispatch(actions.getTrigger(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipientList)