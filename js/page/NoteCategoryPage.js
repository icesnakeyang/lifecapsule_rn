import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native'
import actions from "../action";
import {connect} from "react-redux";
import DataStore from "../expand/dao/DataStore";

const url = 'https://api.github.com/search/repositories?q=java'

class NoteCategoryPage extends Component {
    loadData() {
        console.log('load data')
        let ds = new DataStore()
        ds.fetchData(url)
            .then((response) => {
                console.log(`初次加载：${new Date(response.timestamp)}`)
                console.log(response)
            })

    }

    render() {
        return (
            <View>
                <Text>Note category page</Text>
                <Button title={'change color'} onPress={() => {
                    this.props.onThemeChange('#ff0000')
                }}
                />
                <Button
                    title={'test storage'}
                    onPress={() => {
                        this.loadData()
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteCategoryPage)