import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native'

export default class SettingsPage extends Component{
    render(){
        return(
            <View>
                <Text>Settings page</Text>
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
            </View>
        )
    }
}