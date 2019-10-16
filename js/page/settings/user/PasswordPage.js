import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../../common/component/GetLeftButton";
import NavigationBar from "../../../common/component/NavigationBar";
import {I18nJs} from "../../../language/I18n";

class PasswordPage extends Component {
    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('security.password')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <View>
                    <Text>{I18nJs.t('security.newPassword')}</Text>
                    <View>

                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

export default connect(mapStateToProps)(PasswordPage)