import React, {Component} from 'react'
import {
    View,
    Text,
    Dimensions
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../../common/component/GetLeftButton";
import NavigationBar from "../../../common/component/NavigationBar";
import {I18nJs} from "../../../language/I18n";
import InputRow from "../../../common/component/InputRow";

class SecurityPage extends Component {
    constructor(props) {
        super(props);
        let {height, width} = Dimensions.get('window')
        this.state = {
            height: height,
            width: width
        }
    }

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
                title={I18nJs.t('security.security')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
            />
        )

        return (
            <View style={{backgroundColor: this.props.theme.THEME_BACK_COLOR, height: this.state.height}}>
                {navigationBar}
                <InputRow
                    content={I18nJs.t('security.password')}
                    showLabel={false}
                    touchFunction={() => {

                    }}
                />
                <InputRow
                    content={I18nJs.t('security.phone')}
                    showLabel={false}
                    touchFunction={() => {

                    }}
                />
                <InputRow
                    content={I18nJs.t('security.email')}
                    showLabel={false}
                    touchFunction={() => {

                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

export default connect(mapStateToProps)(SecurityPage)