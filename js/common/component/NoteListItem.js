import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import moment from "moment";
import NavigationUtil from "../../navigator/NavigationUtil";

export default class NoteListItem extends Component {
    render() {
        const {item} = this.props
        const createdTime = moment(item.createdTime).format('YYYY-MM-DD')
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={()=>{
                    NavigationUtil.goPage({
                    note: item
                }, 'EditNotePage')}}
            >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>{createdTime}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        backgroundColor: '#fefffb',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd'
    },
    title: {
        fontSize: 16,
        color: '#424240'
    },
    time: {
        fontSize: 12,
        color: '#424240'
    }
})