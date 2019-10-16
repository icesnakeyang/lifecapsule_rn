import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";

class PhoneBindingPage extends Component{
    render(){
        return(
            <View>
                <Text>phone binding page</Text>
            </View>
        )
    }
}

const mapStateToProps=state=>({
    theme:state.theme.theme
})

export default connect(mapStateToProps)(PhoneBindingPage)