import React, {Component} from 'react'
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import actions from "../../../action";
import {connect} from "react-redux";
import NavigationUtil from "../../../navigator/NavigationUtil";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationBar from "../../../common/component/NavigationBar";
import GetLeftButton from "../../../common/component/GetLeftButton";
import UserHeader from "../components/UserHeader";
import {I18nJs} from "../../../language/I18n";
import InputRow from "../../../common/component/InputRow";

class MyAccount extends Component {
    checkout() {
        NavigationUtil.goPage({}, 'LoginPage')
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_HEAD_COLOR
        }
        let navigationBar =
            <NavigationBar
                title={I18nJs.t('myAccount.myAccount')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
            />
        return (
            <View style={{flex: 1, backgroundColor: this.props.theme.THEME_BACK_COLOR}}>
                {navigationBar}
                <UserHeader/>
                <InputRow
                    label={I18nJs.t('myAccount.nickname')}
                    content={this.props.user.user.nickname}
                    showLabel={true}
                    touchFunction={() => {
                        NavigationUtil.goPage({...this.props}, 'NickNamePage')
                    }}
                />
                <View style={{flex: 1, marginTop: 20}}>
                    <Button
                        color={this.props.theme.THEME_HEAD_COLOR}
                        title={I18nJs.t('myAccount.changeUser')}
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

const styles = StyleSheet.create({
    touch_row_container: {
        flexDirection: 'row',
        backgroundColor: '#faf4f4',
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})