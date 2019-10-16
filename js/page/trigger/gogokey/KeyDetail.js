import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    DeviceEventEmitter,
    FlatList
} from 'react-native'
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationBar from "../../../common/component/NavigationBar";
import GetLeftButton from "../../../common/component/GetLeftButton";
import lifestyles from '../../../common/styles/lifestyles'
import InputRow from "../../../common/component/InputRow";
import NavigationUtil from "../../../navigator/NavigationUtil";
import {I18nJs} from "../../../language/I18n";
import actions from "../../../action";
import possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";

class KeyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gogoKey: {},
            remark: '',
        }
    }

    componentDidMount() {
        this.loadAllData()
        this.listener = DeviceEventEmitter.addListener('refresh_key_detail', (params) => {
            this.loadAllData()
        })
    }

    componentWillUnmount() {
        this.listener.remove()
    }


    loadAllData() {
        /**
         * 1、用户已经设置了trigger，读取的是用户设置的trigger
         * 2、如果用户没有设置trigger，读取的是空
         * 3、用户从gogoKeyPlaza选择了trigger返回，此时trigger为空，但应该要显示gogoKey的模板
         */
        if (this.props.trigger.trigger && this.props.trigger.trigger.gogoKey) {
            //把props里的gogokey赋值给state
            this.setState({
                gogoKey: this.props.trigger.trigger.gogoKey
            })
            //赋值后页面不会刷新，拷贝出来，清空，再赋值一次就可以刷新了
            const tmpData = this.props.trigger.trigger.gogoKey
            this.setState({
                gogoKey: {}
            })
            this.setState({
                gogoKey: tmpData
            })
        }
    }

    GetLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    GetRightButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{padding: 5, paddingRight: 13}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.saveKeyDetail()
                        }}
                    >
                        <Ionicons
                            name={'md-checkmark'}
                            size={26}
                            style={{color: this.props.theme.THEME_HEAD_TEXT}}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{padding: 5, paddingRight: 8}}>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                    >
                        <Ionicons
                            name={'md-trash'}
                            size={26}
                            style={{color: this.props.theme.THEME_HEAD_TEXT}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    saveKeyDetail() {
        const {saveGogoKeyServer} = this.props
        if (!(this.props.user.user && this.props.user.user.token)) {
            return
        }
        if (!(this.props.note.note && this.props.note.note.noteId)) {
            return
        }
        let params = {
            token: this.props.user.user.token,
            noteId: this.props.note.note.noteId
        }
        if (this.props.trigger.trigger) {
            if (this.props.trigger.trigger.triggerId) {
                params.triggerId = this.props.trigger.trigger.triggerId
            }
            if (this.props.trigger.trigger.gogoKey && this.props.trigger.trigger.gogoKey.publicKeyId) {
                params.gogoPublicKeyId = this.props.trigger.trigger.gogoKey.publicKeyId
                params.keyParams = this.props.trigger.trigger.gogoKey.keyParams
            }
        }

        saveGogoKeyServer(params, (result) => {
            if (result) {
                DeviceEventEmitter.emit('Refresh_TriggerPage')
                NavigationUtil.goPage({}, 'TriggerPage')
            }
        })
    }

    renderItem(data) {
        return (
            <InputRow
                touchFunction={() => {
                    if (data.type === 'datetime') {
                        NavigationUtil.goPage({...data}, 'DateTimePickerPage')
                    }
                }}
                label={data.param}
                content={data.value}
                showLabel={true}
            />
        )
    }

    render() {
        if (!this.props.trigger.trigger) {
        }
        let statusBar = {
            backgroundColor: this.props.theme.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={'key detail'}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.GetLeftButton()}
                rightButton={this.GetRightButton()}
            />
        )
        return (
            <View style={{backgroundColor: this.props.theme.THEME_BACK_COLOR}}>
                {navigationBar}
                <View style={lifestyles.tip_view}>
                    <Text style={lifestyles.tip_text}>{I18nJs.t('trigger.tip2')}</Text>
                </View>
                <View style={lifestyles.tip_view2}>
                    <Text style={lifestyles.tip_text2}>{this.state.gogoKey.title}</Text>
                </View>
                <View style={lifestyles.tip_view2}>
                    <Text style={lifestyles.tip_text2}>{this.state.gogoKey.description}</Text>
                </View>
                <FlatList
                    data={this.state.gogoKey.keyParams}
                    renderItem={({item}) => (
                        this.renderItem(item)
                    )}
                />
                <View style={{marginTop: 30}}>
                    <Button
                        color={this.props.theme.THEME_HEAD_COLOR}
                        title={I18nJs.t('trigger.selectPublicKey')}
                        onPress={() => {
                            NavigationUtil.goPage({}, 'KeyPlaza')
                        }}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    note: state.note,
    theme: state.theme.theme,
    trigger: state.trigger,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    saveGogoKeyServer: (params, callback) => dispatch(actions.saveGogoKeyServer(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(KeyDetail)