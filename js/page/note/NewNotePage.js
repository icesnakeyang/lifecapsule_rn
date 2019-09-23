import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput, DeviceEventEmitter
} from 'react-native'
import Textarea from 'react-native-textarea'
import NavigationBar from "../../common/component/NavigationBar";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from "react-redux";
import {Encrypt, GenerateKey, RSAencrypt} from "../../common/encoder/crypto";
import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";
import CryptoJS from 'crypto-js'
import NavigationUtil from "../../navigator/NavigationUtil";

class NewNotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editDetail: '',
            editTitle: ''
        }
    }

    getRightButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => {
                        console.log('go to trigger page')
                        /**
                         * 先保存note，获取noteId，再进入trigger页面
                         * 把note保存到AsyncStorage，再进入trigger页面。保存trigger时，一起保存note
                         */
                    }}
                >
                    <View style={{padding: 5, marginRight: 13}}>
                        <Ionicons
                            name={'md-stopwatch'}
                            size={26}
                            style={{color: '#ddd'}}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.saveNote()
                    }}
                >
                    <View style={{padding: 5, marginRight: 8}}>
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

    saveNote() {
        const uuid = GenerateKey()
        const keyAES = CryptoJS.SHA256(uuid)
        const keyAESBase64 = CryptoJS.enc.Base64.stringify(keyAES)
        const categoryId = ''
        const token = this.props.user.user.token
        let params = {
            title: this.state.editTitle,
            detail: Encrypt(this.state.editDetail, keyAESBase64, keyAESBase64),
            encryptKey: keyAESBase64,
            categoryId: categoryId
        }
        let url = API.apiGetRSAKey
        let dataStore = new DataStore()
        dataStore.fetchNetData(url)
            .then((response) => {
                if (response.code === 0) {
                    params.encryptKey = RSAencrypt(params.encryptKey, response.data.publicKey)
                    params.keyToken = response.data.keyToken
                    this.saving = true
                    url = API.apiCreateNote
                    dataStore.fetchPostData(url, params, token)
                        .then((response) => {
                            if (response.code === 0) {
                                DeviceEventEmitter.emit('Refresh_NoteList')
                                NavigationUtil.goBack(this.props.navigation)
                            } else {
                            }
                        })
                        .catch((error) => {
                        })
                } else {
                }
            })
            .catch((error) => {
            })
    }

    render() {
        let statusBar = {
            backgroundColor: '#678',
            barStyle: 'light-content'
        }
        let navigationBar =
            <NavigationBar
                title={'Note'}
                statusBar={statusBar}
                style={{backgroundColor: '#678'}}
                rightButton={this.getRightButton()}
            />
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <View style={{borderBottomWidth: 0.5}}>
                    <TextInput
                        style={{margin: 10}}
                        onChangeText={(editTitle) => this.setState({editTitle})}
                    />
                </View>
                <View style={{borderTopWidth: 0.5}}>
                    <Textarea
                        containerStyle={{margin: 10}}
                        onChangeText={(editDetail) => this.setState({editDetail})}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})
export default connect(mapStateToProps)(NewNotePage)