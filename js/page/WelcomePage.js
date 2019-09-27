import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import NavigationUtil from "../navigator/NavigationUtil";
import actions from "../action";
import {connect} from "react-redux";
import DeviceInfo from 'react-native-device-info'

class WelcomePage extends Component {
    componentDidMount() {
        this.loadData()
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
                    this.timer=setTimeout(() => {
                        NavigationUtil.resetToHomePage({
                            navigation: this.props.navigation
                        })
                    },2000)
                }else{
                }
            })
        })

        // device.UserAgent = deviceInfo.getUserAgent();
        // device.DeviceBrand = deviceInfo.getBrand();
        // device.DeviceModel = deviceInfo.getModel();
        // device.SystemVersion = deviceInfo.getSystemVersion();
        // device.AppVersion = deviceInfo.getVersion();
        // device.AppReadableVersion = deviceInfo.getReadableVersion();

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

    render() {
        let store = this._store()
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome LefeCapsule</Text>
                <Text style={styles.user_name}>{store.name}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({
    loginUserAuto: (deviceId, callback) => dispatch(actions.loginUserAuto(deviceId, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008871'
    },
    welcome: {
        fontSize: 26,
        color: '#ddd'
    },
    user_name: {
        fontSize: 20,
        color: '#ddd'
    }
})