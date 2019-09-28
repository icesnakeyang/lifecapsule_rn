import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions, default as PixelRatio
} from 'react-native'
import NavigationUtil from "../navigator/NavigationUtil";
import actions from "../action";
import {connect} from "react-redux";
import DeviceInfo from 'react-native-device-info'
import {I18nJs} from "../language/I18n";

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        // I18nJs.locale = 'zh'
        let {height, width} = Dimensions.get('window')
        this.state = {
            width: width,
            height: height
        }
    }

    componentDidMount() {
        this.loadData()
        const {loadLanguage} = this.props
        loadLanguage((result) => {
            I18nJs.locale = result
        })

    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    loadData() {
        /**
         * 读取device信息
         * @type {{}}
         */
        let deviceId = null
        const device = {};
        device.DeviceID = DeviceInfo.getUniqueId()
        device.DeviceID.then(res => {
            deviceId = res
            const {loginUserAuto} = this.props
            loginUserAuto(deviceId, (result) => {
                if (result) {
                    this.timer = setTimeout(() => {
                        NavigationUtil.resetToHomePage({
                            navigation: this.props.navigation
                        })
                    }, 500)
                } else {
                }
            })
        })
    }

    _store() {
        const {user} = this.props
        let store = {}
        if (user.user) {
            store = {
                name: user.user.nickname
            }
        }
        return store
    }

    _init() {
        screen = {
            width: 0,
            height: 0
        }
        if (this.state.width) {
            screen.width = this.state.width
        }
        if (this.state.height) {
            screen.height = this.state.height
        }
        return screen
    }

    render() {
        let store = this._store()
        return (
            <View style={styles.container}>
                <View style={styles.img_view}>
                    <Image source={require('../static/imgs/page1image5566720.png')}
                        // style={{width: this.state.width, height: this.state.height}}
                           style={{width: this.state.width, height: 300}}
                           resizeMode="cover"
                    />
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.welcome}>{I18nJs.t('title')}</Text>
                    <Text style={{fontSize: 18, color: '#ddd', paddingTop: 20}}>{I18nJs.t('slogan')}</Text>
                    <Text style={styles.user_name}>{store.name}</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme,
    language: state.language
})

const mapDispatchToProps = dispatch => ({
    loginUserAuto: (deviceId, callback) => dispatch(actions.loginUserAuto(deviceId, callback)),
    loadLanguage: (callback) => dispatch(actions.loadLanguage(callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000'
    },
    welcome: {
        fontSize: 26,
        color: '#ddd',
        paddingTop: 20,
    },
    user_name: {
        fontSize: 16,
        color: '#ddd',
        paddingTop: 20
    },
    img_view: {
        flex: 1
    }
})