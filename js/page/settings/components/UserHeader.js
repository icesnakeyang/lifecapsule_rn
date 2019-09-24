import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class UserHeader extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row', margin: 20}}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                    <View style={{marginLeft: 20, marginTop: 5}}>
                        <Ionicons
                            name={'md-contact'}
                            size={48}
                            style={{color: '#0000ff'}}
                        />
                    </View>
                    <View style={{marginLeft: 20}}>
                        <View>
                            <Text style={{fontSize: 26}}>snake</Text>
                        </View>
                        <View>
                            <Text>2019-10-11 12:34</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}