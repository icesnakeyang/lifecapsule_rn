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
import NavigationUtil from "../../navigator/NavigationUtil";

class SettingsPage extends Component {
    constructor(props) {
        super(props);
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
                title={I18nJs.t('settings.settings')}
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
                <View>
                    <TouchableOpacity
                        style={styles.touch_row_container}
                        onPress={() => {
                            NavigationUtil.goPage({...this.props}, 'LanguagePage')
                        }}
                    >
                        <Text
                            style={{marginLeft: 20, fontSize: 18}}
                        >{I18nJs.t('settings.language')}</Text>
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
                <Text>{I18nJs.t('settings.language')}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    user: state.user
})

export default connect(mapStateToProps)(SettingsPage)

const styles = StyleSheet.create({
    touch_row_container: {
        flexDirection: 'row',
        backgroundColor: '#faf4f4',
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})