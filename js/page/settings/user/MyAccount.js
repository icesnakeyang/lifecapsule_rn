import React, {Component} from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import actions from "../../../action";
import {connect} from "react-redux";
import NavigationUtil from "../../../navigator/NavigationUtil";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationBar from "../../../common/component/NavigationBar";
import GetLeftButton from "../../../common/component/GetLeftButton";

class MyAccount extends Component {
    checkout() {
        console.log('check out')
        NavigationUtil.goPage({}, 'LoginPage')
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar =
            <NavigationBar
                title={'My Account'}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                leftButton={this.getLeftButton()}
            />
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <View style={{flex: 1, marginTop: 20}}>
                    <Button
                        color={this.props.theme.THEME_COLOR}
                        title={'Change User'}
                        onPress={() => {
                            this.checkout()
                        }}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme.theme
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)