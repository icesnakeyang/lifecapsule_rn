import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import NavigationUtil from "../../navigator/NavigationUtil";

export default class CategoryListItem extends Component {
    render() {
        console.log(this.props)
        const {item} = this.props
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => {
                    NavigationUtil.goPage({
                        item: item
                    }, 'CategoryDetail')
                }}
            >
                <Text style={styles.title}>{item.categoryName}</Text>
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