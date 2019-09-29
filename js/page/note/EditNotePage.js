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

        let url = API.apiGetRSAKey
        let RSA = null
        let dataStore = new DataStore()
        dataStore.fetchNetData(url).then((data) => {
            RSA = data.data
            let params = {
                noteId: noteId,
            }
            const keyAES_1 = GenerateRandomString16();
            if (RSA) {
                const publicKey = RSA.publicKey
                const keyToken = RSA.keyToken

                params.encryptKey = RSAencrypt(keyAES_1, publicKey)
                params.keyToken = keyToken

                const url = API.apiGetNoteDetailByNoteId
                dataStore.fetchPostData(url, params, token)
                    .then((responseData) => {
                        if (responseData.code === 0) {
                            let note = responseData.data.note
                            let strKey = note.userEncodeKey
                            strKey = Decrypt2(strKey, keyAES_1)
                            note.detail = Decrypt(note.detail, strKey, strKey)
                            this.setState({
                                note: responseData.data.note
                            })
                        }
                    })
            }
        }).catch((error) => {
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
        let url = ''

        /**
         * 生成一个uuid
         * 根据uuid生成一个sha256，作为AES私钥
         * 把AES转换为base64格式
         * 把note的detail进行AES加密，秘钥是base64的AES秘钥
         * 从服务器请求一个RSA公钥
         * 用RSA公钥来加密base64的AES私钥
         * 此时得到一个公钥加密了AES私钥的秘钥，和一个对应的keyToken
         * 把noteId,title,AES加密的detail，公钥加密的AES私钥，以及keyToken作为参数调用updateNote的api来保存
         */

        const uuid = GenerateKey()
        const keyAES = CryptoJS.SHA256(uuid)
        const keyAESBase64 = CryptoJS.enc.Base64.stringify(keyAES)

        let postParams = {
            noteId: params.note.noteId,
            title: params.note.title,
            detail: Encrypt(params.note.detail, keyAESBase64, keyAESBase64),
            encryptKey: keyAESBase64
        }

        url = API.apiGetRSAKey
        const dataStore = new DataStore()
        dataStore.fetchNetData(url)
            .then((response) => {
                if (response.code === 0) {
                    postParams.encryptKey = RSAencrypt(postParams.encryptKey, response.data.publicKey)
                    postParams.keyToken = response.data.keyToken

                    url = API.apiUpdateNote
                    dataStore.fetchPostData(url, postParams, params.token)
                        .then((response) => {
                            if (response.code === 0) {
                                DeviceEventEmitter.emit('Refresh_NoteList')
                                NavigationUtil.goBack(this.props.navigation)
                            } else {
                            }
                        })
                        .catch((error) => {
                        })
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
                        this.saveNote()
                    }}
                >
                    <View style={{padding: 5, marginRight: 13}}>
                        <Ionicons
                            name={'md-checkmark'}
                            size={26}
                            style={{color: '#ddd'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.theme.THEME_COLOR,
            barStyle: 'light-content'
        }
        let navigationBar =
            <NavigationBar
                title={I18nJs.t('note.editNote')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.theme.THEME_COLOR}}
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
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({
    refreshNoteList: (params) => dispatch(actions.refreshNoteList(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNotePage)