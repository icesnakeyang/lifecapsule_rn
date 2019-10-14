import React, {Component} from 'react'
import {
    View,
    Text,
    Button,
    TextInput,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native'
import {connect} from "react-redux";
import Textarea from "react-native-textarea";
import NavigationUtil from "../../navigator/NavigationUtil";
import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";
import {Decrypt, Decrypt2, Encrypt, GenerateKey, GenerateRandomString16, RSAencrypt} from "../../common/encoder/crypto";
import CryptoJS from "crypto-js";
import actions from "../../action";
import NavigationBar from "../../common/component/NavigationBar";
import GetLeftButton from "../../common/component/GetLeftButton";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {I18nJs} from "../../language/I18n";

class EditNotePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editTitle: '',
            editDetail: '',
            note: {}
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        const noteId = this.props.navigation.state.params.note.noteId
        const token = this.props.user.user.token
        const params = {
            noteId: noteId,
            token: token
        }
        const {getNoteByNoteId} = this.props
        getNoteByNoteId(params, (result) => {
            if (result) {
                this.setState({
                    note: this.props.note.note
                })
            }
        })
    }

    saveNote() {
        let theTitle = this.state.editTitle
        let theDetail = this.state.editDetail

        if (!this.state.editTitle && !this.state.editDetail) {
            return
        } else {
            let note = this.state.note
            if (theTitle) {
                note.title = theTitle
            }
            if (theDetail) {
                note.detail = theDetail
            }

            const token = this.props.user.user.token
            let params = {
                note: note,
                token: token
            }
            this.updateNote(params)
        }
    }

    updateNote(params) {
        let body = {
            noteId: params.note.noteId,
            title: params.note.title,
            detail: params.note.detail,
            token: params.token
        }
        console.log(body)
        let {updateNote} = this.props
        updateNote(body, (result) => {
            if (result) {
                DeviceEventEmitter.emit('Refresh_NoteList')
                NavigationUtil.goPage({}, 'HomePage')
            }
        })
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    getRightButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => {
                        /**
                         * 首先要把props.trigger.trigger清空
                         */
                        const {clearTrigger} = this.props
                        clearTrigger()
                        NavigationUtil.goPage({...this.props}, 'TriggerPage')
                    }}
                >
                    <View style={{padding: 5, marginRight: 13}}>
                        <Ionicons
                            name={'md-stopwatch'}
                            size={26}
                            style={{color: this.props.theme.THEME_HEAD_TEXT}}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.saveNote()
                    }}
                >
                    <View style={{padding: 5, marginRight: 13}}>
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

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_HEAD_COLOR,
        }
        let navigationBar =
            <NavigationBar
                title={I18nJs.t('note.editNote')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        return (
            <View style={{flex: 1}}>
                {/*<View style={{flex: 1, fontSize: 48, backgroundColor: '#00ff00'}}>*/
                }
                {/*    <WebView*/
                }
                {/*        style={{color: '#ffff00', fontSize: 48}}*/
                }
                {/*        originWhitelist={['*']}*/
                }
                {/*        source={{html: detail}}*/
                }
                {/*    />*/
                }
                {/*</View>*/
                }
                {navigationBar}
                <TextInput
                    defaultValue={this.state.note.title}
                    // onChangeText={(editTitle)=>this.setState({editTitle})}
                    onChangeText={(editTitle) => this.setState({editTitle})}
                />
                <Textarea
                    containerStyle={
                        {
                            flex: 1
                        }
                    }
                    defaultValue={this.state.note.detail}
                    onChangeText={(editDetail) => this.setState({editDetail})
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme.theme,
    note: state.note
})

const mapDispatchToProps = dispatch => ({
    refreshNoteList: (params) => dispatch(actions.refreshNoteList(params)),
    getNoteByNoteId: (params, callback) => dispatch(actions.getNoteByNoteId(params, callback)),
    clearTrigger: () => dispatch(actions.clearTrigger()),
    updateNote: (params, callback) => dispatch(actions.updateNote(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNotePage)