import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";

class EmailBindingPage extends Component{
    render(){
        return(
            <View>
                <Text>email binding page</Text>
            </View>
        )
    }
}

const mapStateToProps=state=>({
    theme:state.theme.theme
})

export default connect(mapStateToProps)(EmailBindingPage)