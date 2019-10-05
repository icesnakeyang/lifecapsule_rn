import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image
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
            triggerTitle: 'aa',
            editTriggerTittle: '',
            triggerRemark: '说明'
        }
    }

    componentDidMount() {
        this.loadAllData()
    }

    loadAllData() {
        if(!(this.props.user && this.props.user.user)){
            return
        }
        const token=this.props.user.user.token
        if(!(this.props.note && this.props.note.note)){
            return
        }
        const noteId=this.props.note.note.noteId
        const {getGogoKey}=this.props
        const params={
            noteId:noteId,
            token:token
        }
        getGogoKey(params, (result)=>{
            if(result){

            }
        })
        if (this.props.trigger.trigger) {

        } else {

        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    getRightButton() {
        return (
            <View>
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

    render() {
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
                    label={'指定日期触发'}
                    showLabel={true}
                    content={'2019-10-13 12:00:00'}
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

const mapDispatchToProps=dispatch=>({
    getGogoKey:(params, callback)=>dispatch(actions.getGogoKey(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(TriggerPage)

const styles = StyleSheet.create({
    page_container: {
        flex: 1
    }
})