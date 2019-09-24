import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from "../../../navigator/NavigationUtil";
import {connect} from "react-redux";

class UserHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        const userNickName = this.props.user.user.nickName
        return (
            <View style={{flexDirection: 'row', margin: 20}}>
                <TouchableOpacity style={{flexDirection: 'row'}}
                                  onPress={() => {
                                      NavigationUtil.goPage({}, 'MyAccount')
                                  }}
                >
                    <View style={{marginLeft: 20, marginTop: 5}}>
                        <Ionicons
                            name={'md-contact'}
                            size={48}
                            style={{color: '#0000ff'}}
                        />
                    </View>
                    <View style={{marginLeft: 20}}>
                        <View>
                            <Text style={{fontSize: 26}}>{userNickName}</Text>
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

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(UserHeader)