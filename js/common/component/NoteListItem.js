import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import moment from "moment";
import NavigationUtil from "../../navigator/NavigationUtil";
import {connect} from "react-redux";

class NoteListItem extends Component {
    render() {
        const {item} = this.props
        const createdTime = moment(item.createdTime).format('YYYY-MM-DD')
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: this.props.theme.THEME_BACK_COLOR,
                    padding: 10,
                    borderBottomWidth: 0.4,
                    height: 60,
                    marginTop: 10
                }}
                onPress={() => {
                    NavigationUtil.goPage({
                        note: item
                    }, 'EditNotePage')
                }}
            >
                <View>
                    <Text style={{fontSize: 16, color: this.props.theme.THEME_TEXT_COLOR}}>{item.title}</Text>
                </View>
                <View style={{marginTop:10}}>
                    <Text
                        style={{fontSize: 12, color: this.props.theme.THEME_TEXT_COLOR}}>{createdTime}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})
export default connect(mapStateToProps)(NoteListItem)