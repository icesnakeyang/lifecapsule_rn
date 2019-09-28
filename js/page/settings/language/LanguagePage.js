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
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('settings.language')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View style={styles.page_container}>
                {navigationBar}
                <View style={styles.row_view}>
                    <TouchableOpacity
                        onPress={() => {
                            this.changeLanguage('zh')
                        }}
                        style={styles.touch_view}>
                        <Text style={styles.row_text}>中文</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row_view}>
                    <TouchableOpacity
                        onPress={() => {
                            this.changeLanguage('en')
                        }}
                        style={styles.touch_view}>
                        <Text style={styles.row_text}>English</Text>
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

const styles = StyleSheet.create({
    page_container: {
        flex: 1
    },
    row_view: {
        height: 40,
        marginTop: 10,
        backgroundColor: '#ddd',
        justifyContent: 'center'
    },
    touch_view: {
        // backgroundColor:'#ffff00'
    },
    row_text: {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
    }
})