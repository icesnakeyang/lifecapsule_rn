import React, {Component} from 'react'
import {TouchableOpacity} from "react-native";
import NavigationUtil from "../../navigator/NavigationUtil";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class GetLeftButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{padding: 8, paddingLeft: 12}}
                onPress={() => {
                    NavigationUtil.goBack(this.props.navigation)
                }}
            >
                <Ionicons
                    name={'ios-arrow-back'}
                    size={26}
                    style={{color: '#ddd'}}
                />
            </TouchableOpacity>
        )
    }
}