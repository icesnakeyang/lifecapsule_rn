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
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar =
            <NavigationBar
                title={I18nJs.t('myAccount.myAccount')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                leftButton={this.getLeftButton()}
            />
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <UserHeader/>
                <View>
                    <TouchableOpacity
                        style={styles.touch_row_container}
                        onPress={() => {
                            NavigationUtil.goPage({...this.props}, 'NickNamePage')
                        }}
                    >
                        <Text
                            style={{marginLeft: 20, fontSize: 18}}
                        >{I18nJs.t('myAccount.nickname')}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text
                                style={{marginRight: 20}}
                            >{this.props.user.user.nickname}</Text>
                            <View
                                style={{marginRight: 20}}
                            >
                                <Ionicons
                                    name={'ios-arrow-forward'}
                                    size={20}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, marginTop: 20}}>
                    <Button
                        color={this.props.theme.THEME_COLOR}
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