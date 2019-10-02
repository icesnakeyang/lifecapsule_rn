import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'

export default class KeyPlaza extends Component{
    render(){
        console.log(this.props)
        return(
            <View>
                <Text>key plaza</Text>
            </View>
        )
    }
}