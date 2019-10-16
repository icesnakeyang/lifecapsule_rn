import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import {connect} from "react-redux";
import NavigationBar from "../../common/component/NavigationBar";
import Ionicons from 'react-native-vector-icons/Ionicons'
import UserHeader from "./components/UserHeader";
import {I18nJs} from '../../language/I18n'
import NavigationUtil from "../../navigator/NavigationUtil";
import InputRow from "../../common/component/InputRow";

class SettingsPage extends Component {
    constructor(props) {
        super(props);
        let {height, width} = Dimensions.get('window')
        this.state = {
            screen_height: height,
            screen_width: width,
            lan: 'en'
        }
    }

    getRightButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{padding: 5, paddingRight: 8}}>
                    <TouchableOpacity
                        onPress={() => {
                        }}
                    >
                        <Ionicons
                            name={'md-mail'}
                            size={26}
                            style={{color: this.props.theme.THEME_HEAD_TEXT}}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{padding: 5, paddingRight: 13}}>
                    <TouchableOpacity
                        onPress={() => {
                        }}
                    >
                        <Ionicons
                            name={'md-settings'}
                            size={26}
                            style={{color: this.props.theme.THEME_HEAD_TEXT}}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_HEAD_COLOR
        }
        let navigationBar =
            <NavigationBar
                title={I18nJs.t('settings.settings')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                rightButton={this.getRightButton()}
            />
        return (
            <View>
                {navigationBar}
                <UserHeader/>
                <View style={{
                    marginTop: 20,
                    backgroundColor: this.props.theme.THEME_BACK_COLOR,
                    height: this.state.screen_height
                }}>
                    <InputRow
                        label={I18nJs.t('settings.language')}
                        content={I18nJs.t(`settings.${I18nJs.locale}`)}
                        showLabel={true}
                        touchFunction={() => {
                            NavigationUtil.goPage({...this.props}, 'LanguagePage')
                        }}
                    />
                    <InputRow
                        label={I18nJs.t('security.security')}
                        content={I18nJs.t('security.tip1')}
                        showLabel={true}
                        touchFunction={() => {
                            NavigationUtil.goPage({}, 'SecurityPage')
                        }}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    user: state.user,
    language: state.language
})

export default connect(mapStateToProps)(SettingsPage)

const styles = StyleSheet.create({
    touch_row_container: {
        flexDirection: 'row',
        backgroundColor: '#d3d5d7',
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})