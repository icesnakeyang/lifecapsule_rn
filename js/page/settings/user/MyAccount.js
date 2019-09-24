import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import actions from "../../../action";
import {connect} from "react-redux";

class MyAccount extends Component {
    render() {
        console.log(this.props)
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        console.log('sign out')
                        const {logoutUser} = this.props
                        logoutUser()
                        console.log(this.props)
                    }}
                >
                    <Text>
                        Sign out
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(actions.logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)