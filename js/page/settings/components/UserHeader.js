import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from "../../../navigator/NavigationUtil";
import {connect} from "react-redux";
import moment from 'moment'

class UserHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const userNickName = this.props.user.user.nickname
        const createdTime = moment(this.props.user.user.createdTime).format('YYYY-MM-DD')
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
                            style={{color: this.props.theme.THEME_COLOR}}
                        />
                    </View>
                    <View style={{marginLeft: 20}}>
                        <View>
                            <Text style={{fontSize: 26}}>{userNickName}</Text>
                        </View>
                        <View>
                            <Text>{createdTime}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme:state.theme.theme
})

export default connect(mapStateToProps)(UserHeader)