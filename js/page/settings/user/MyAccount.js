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
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        const {logoutUser} = this.props
                        logoutUser()
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