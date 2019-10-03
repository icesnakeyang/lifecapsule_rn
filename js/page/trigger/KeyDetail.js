import React, {Component} from 'react'
import {
    View,
    Text, TouchableOpacity
} from 'react-native'
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationBar from "../../common/component/NavigationBar";
import GetLeftButton from "../../common/component/GetLeftButton";
import lifestyles from '../../common/styles/lifestyles'
import InputRow from "../../common/component/InputRow";

class KeyDetail extends Component {
    GetLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    GetRightButton() {
        return (
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
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={'key detail'}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                leftButton={this.GetLeftButton()}
                rightButton={this.GetRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <View style={lifestyles.tip_view}>
                    <Text style={lifestyles.tip_text}>key Detail</Text>
                </View>
                <InputRow
                    touchFunction={()=>{

                    }}
                    label={'触发时间'}
                    content={'2019-9-9'}
                    showLabel={true}
                />

            </View>
        )
    }
}

const mapStateToProps = state => ({
    note: state.note,
    theme: state.theme.theme
})

export default connect(mapStateToProps)(KeyDetail)