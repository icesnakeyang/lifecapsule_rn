import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import actions from "../../../action";
import {connect} from "react-redux";
import NavigationUtil from "../../../navigator/NavigationUtil";

class MyAccount extends Component {
    checkout() {
        console.log('check out')
        NavigationUtil.goPage({}, 'LoginPage')
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        this.checkout()
                    }}
                >
                    <Text>
                        resign
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme.theme
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)