import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image, DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from "../../navigator/NavigationUtil";
import InputRow from "../../common/component/InputRow";

import lifeStyles from '../../common/styles/lifestyles'
import actions from "../../action";

class TriggerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editTrigger: ''
        }
    }

    componentDidMount() {
        this.loadAllData()
        DeviceEventEmitter.addListener('Refresh_TriggerPage', (params) => {
            console.log('refresh')
            this.loadAllData()
        })
    }

    loadAllData() {
        /**
         * 首先检查editTrigger是否存在。存在即表示已经读取了数据，并处于修改状态。
         * 如果不存在就读取服务器数据，然后复制给editTrigger。
         * 页面显示的数据，绑定在editTrigger
         * 保存时，直接保存editTrigger
         */
        console.log(this.props)
        if (!this.props.trigger.trigger) {
            if (!(this.props.user && this.props.user.user)) {
                return
            }
            const token = this.props.user.user.token
            if (!(this.props.note && this.props.note.note)) {
                return
            }
            const noteId = this.props.note.note.noteId
            const {getTrigger} = this.props
            const params = {
                noteId: noteId,
                token: token
            }
            getTrigger(params, (result) => {
                if (result) {
                    console.log(this.props)
                    this.setState({
                        editTrigger: this.props.trigger.trigger
                    })
                }
            })
        } else {
            console.log(this.props)
            this.setState({
                editTrigger: this.props.trigger.trigger
            })
            console.log(this.state)
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    getRightButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{padding: 5, paddingRight: 13}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.saveTrigger()
                        }}
                    >
                        <Ionicons
                            name={'md-checkmark'}
                            size={26}
                            style={{color: this.props.theme.THEME_ICON_COLOR}}
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
                            style={{color: this.props.theme.THEME_ICON_COLOR}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    saveTrigger() {
        console.log(this.props)
        console.log(this.state)
        const {saveTriggerToServer} = this.props
        let params = {}
        params.token = this.props.user.user.token
        if (this.props.note.note.noteId) {
            params.noteId = this.props.note.note.noteId
        }
        if (this.props.trigger.trigger) {
            if (this.props.trigger.trigger.triggerId) {
                params.triggerId = this.props.trigger.trigger.triggerId
            }
            if (this.props.trigger.trigger.remark) {
                params.remark = this.props.trigger.trigger.remark
            }
            if (this.props.trigger.trigger && this.props.trigger.trigger.gogoKey) {
                params.gogoKey = this.props.trigger.trigger.gogoKey
            }
        }

        saveTriggerToServer(params, (result) => {
            console.log(result)
        })

    }

    _formatData() {
        let showData = {
            gogoKeyTitle: I18nJs.t('trigger.gogoKeyHolder'),
            gogoKeyDscription: '',
            userRemark: ''
        }
        if (this.props.trigger.trigger && this.props.trigger.trigger.gogoKey) {
            showData.gogoKeyTitle = this.props.trigger.trigger.gogoKey.title
            showData.gogoKeyDscription = this.props.trigger.trigger.gogoKey.description
        }
        if (this.props.trigger.remark) {
            showData.userRemark = this.props.trigger.remark
        }
        console.log(showData)
        return showData
    }

    render() {
        const showData = this._formatData()
        let statusBar = {
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('trigger.trigger')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={styles.page_container}>
                {navigationBar}
                <View style={lifeStyles.tip_view}>
                    <Text style={lifeStyles.tip_text}>{I18nJs.t('trigger.tip1')}</Text>
                </View>
                <InputRow
                    label={showData.gogoKeyTitle}
                    showLabel={true}
                    content={showData.gogoKeyDscription}
                    touchFunction={() => {
                        NavigationUtil.goPage({...this.props}, 'KeyDetail')
                    }}
                />
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        backgroundColor: this.props.theme.THEME_ROW_COLOR,
                        height: 50,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: 10
                    }}
                    onPress={this.props.touchFunction}
                >
                    <Text style={{marginLeft: 10}}>{I18nJs.t('trigger.recipient')}</Text>
                    <View
                        style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <View style={{marginRight: 10}}>
                            <Image
                                style={{width: 24, height: 24}}
                                source={{uri: 'https://img.yeitu.com/2017/0727/20170727040504430.jpg'}}/>
                        </View>
                        <View style={{marginRight: 20}}>
                            <Ionicons
                                name={'ios-arrow-forward'}
                                size={20}
                                style={{color: this.props.theme.THEME_ROW_ICON}}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <InputRow
                    touchFunction={() => {
                        NavigationUtil.goPage({}, 'KeyUserRemark')
                    }}
                    label={I18nJs.t('trigger.userRemark')}
                    content={showData.userRemark}
                    showLabel={true}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme.theme,
    note: state.note,
    trigger: state.trigger
})

const mapDispatchToProps = dispatch => ({
    getTrigger: (params, callback) => dispatch(actions.getTrigger(params, callback)),
    saveTriggerToServer: (params, callback) => dispatch(actions.saveTriggerToServer(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(TriggerPage)

const styles = StyleSheet.create({
    page_container: {
        flex: 1
    }
})