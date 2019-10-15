import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, TextInput
} from 'react-native'
import NavigationUtil from "../../../navigator/NavigationUtil";
import GetLeftButton from "../../../common/component/GetLeftButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationBar from "../../../common/component/NavigationBar";
import {connect} from "react-redux";
import {I18nJs} from "../../../language/I18n";
import actions from "../../../action";

class LanguagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editLanguage: ''
        }
    }

    changeLanguage(lan) {
        I18nJs.locale = lan
        const {changeLanguage} = this.props
        changeLanguage(lan)
        NavigationUtil.goPage({
            navigation: this.props.navigation
        }, 'WelcomePage')
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
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('settings.language')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View style={{flex: 1, backgroundColor: this.props.theme.THEME_BACK_COLOR}}>
                {navigationBar}
                <View style={{
                    height: 40,
                    marginTop: 10,
                    backgroundColor: this.props.theme.THEME_ROW_COLOR,
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.changeLanguage('zh')
                        }}
                    >
                        <Text style={{
                            fontSize: 18,
                            marginLeft: 10,
                            marginRight: 10,
                            color: this.props.theme.THEME_TEXT_COLOR
                        }}>中文</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    height: 40,
                    marginTop: 10,
                    backgroundColor: this.props.theme.THEME_ROW_COLOR,
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.changeLanguage('en')
                        }}
                    >
                        <Text style={{
                            fontSize: 18,
                            marginLeft: 10,
                            marginRight: 10,
                            color: this.props.theme.THEME_TEXT_COLOR
                        }}>English</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

const mapDispatchToProps = dispatch => ({
    changeLanguage: (lan) => dispatch(actions.changeLanguage(lan))
})

export default connect(mapStateToProps, mapDispatchToProps)(LanguagePage)