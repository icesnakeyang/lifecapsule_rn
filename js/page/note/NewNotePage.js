import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import NavigationBar from "../../common/component/NavigationBar";
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class NewNotePage extends Component{
    getRightButton(){
        return(
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={()=>{
                        console.log('save')
                    }}
                >
                    <View style={{padding:5, marginRight:13}}>
                        <Ionicons
                            name={'md-stopwatch'}
                            size={26}
                            style={{color:'#ddd'}}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        console.log('save')
                    }}
                >
                    <View style={{padding:5, marginRight:8}}>
                        <Ionicons
                            name={'md-checkmark'}
                            size={26}
                            style={{color:'#ddd'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    render(){
        let statusBar={
            backgroundColor:'#678',
            barStyle:'light-content'
        }
        let navigationBar=
            <NavigationBar
                title={'Note'}
                statusBar={statusBar}
                style={{backgroundColor:'#678'}}
                rightButton={this.getRightButton()}
                />
        return(
            <View>
                {navigationBar}
                <Text>note new page</Text>
            </View>
        )
    }
}