import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import Ionicons from 'react-native-vector-icons/Ionicons'

class TriggerPage extends Component {

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    getRightButton() {
        return (
            <View>
                <View style={{padding: 5, paddingRight: 8}}>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                    >
                        <Ionicons
                            name={'md-trash'}
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
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('trigger.trigger')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <Text>Trigger page</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme.theme,
    note: state.note
})

export default connect(mapStateToProps)(TriggerPage)