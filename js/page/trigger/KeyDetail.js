import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'

export default class KeyDetail extends Component {
    render() {
        console.log(this.props)
        return (
            <View>
                <Text>key Detail</Text>
            </View>
        )
    }
}