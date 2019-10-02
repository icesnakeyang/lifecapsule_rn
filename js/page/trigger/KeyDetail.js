import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";

class KeyDetail extends Component {
    render() {
        console.log(this.props)
        return (
            <View>
                <Text>key Detail</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    note: state.note
})

export default connect(mapStateToProps)(KeyDetail)