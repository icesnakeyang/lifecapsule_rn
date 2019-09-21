import React, {Component} from 'react'

import {
    View,
    Text,
    TextInput,
    Button,
    DeviceEventEmitter
} from 'react-native'
import NavigationUtil from "../navigator/NavigationUtil";

export default class CategoryDetail extends Component {
    saveCategory() {
        DeviceEventEmitter.emit('refresh_list')
        NavigationUtil.goBack(this.props.navigation)
    }



    render() {
        return (
            <View style={{flex: 1}}>
                <Text>category detail</Text>
                <Button title={'save'} onPress={() => {
                    this.saveCategory()
                }}
                />
            </View>
        )
    }

}