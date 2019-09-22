import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar, TouchableOpacity
} from 'react-native'
import NavigationBar from "../common/component/NavigationBar";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationUtil from "../navigator/NavigationUtil";

export default class TriggerPage extends Component{
    getRightButton(){
        return(
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={()=>{
                        console.log('press third button')
                    }}
                >
                    <View style={{padding:5, marginRight:13}}>
                        <Feather
                            name={'search'}
                            size={24}
                            style={{color:'#ddd'}}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        console.log('press right button')
                    }}
                >
                    <View style={{padding:5, marginRight:8}}>
                        <Feather
                            name={'search'}
                            size={24}
                            style={{color:'#ddd'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    getLeftButton(callBack){
        return (
            <TouchableOpacity
                style={{padding:8,paddingLeft:12}}
                onPress={()=>{
                    console.log('press left button')
                    NavigationUtil.goBack(this.props.navigation)
                }}
            >
                <Ionicons
                    name={'ios-arrow-back'}
                    size={26}
                    style={{color:'#ddd'}}
                />
            </TouchableOpacity>
        )
    }

    render(){
        let statusBar={
            backgroundColor: '#678',
            barStyle:'light-content'
        }
        let navigationBar=
            <NavigationBar
            title={'最热'}
            statusBar={statusBar}
            style={{backgroundColor: '#678'}}
            rightButton={this.getRightButton()}
            leftButton={this.getLeftButton()}
        />

        return(
            <View>
                {navigationBar}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#ff7500'
    }
})
