import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";

class KeyPlaza extends Component{
    render(){
        console.log(this.props)
        return(
            <View>
                <Text>key plaza</Text>
            </View>
        )
    }
}

const mapStateToProps=state=>({
    note:state.note
})

export default connect(mapStateToProps)(KeyPlaza)