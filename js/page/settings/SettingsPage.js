import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity
} from 'react-native'
import {connect} from "react-redux";
import NavigationBar from "../../common/component/NavigationBar";
import Ionicons from 'react-native-vector-icons/Ionicons'
import UserHeader from "./components/UserHeader";
import {I18nJs} from '../../language/I18n'

class SettingsPage extends Component {
    constructor(props) {
        super(props);
        console.log(I18nJs.locale)
        I18nJs.locale = 'zh'
        console.log(I18nJs.locale)
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
                            style={{color: this.props.theme.THEME_ICON_COLOR}}
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
                            style={{color: this.props.theme.THEME_ICON_COLOR}}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar =
            <NavigationBar
                title={'Settings'}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                rightButton={this.getRightButton()}
            />
        return (
            <View>
                {navigationBar}
                <UserHeader/>
                <Button title={'change color'} onPress={() => {
                    this.props.onThemeChange('#ff0000')
                }}
                />
                <Button
                    title={'test storage'}
                    onPress={() => {
                        this.loadData()
                    }}
                />
                <Text>{I18nJs.t('note')}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    user: state.user
})

export default connect(mapStateToProps)(SettingsPage)