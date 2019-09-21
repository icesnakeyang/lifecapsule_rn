import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native'

import actions from "../action";
import {connect} from "react-redux";
import DataStore from "../expand/dao/DataStore";
import {API} from "../api/api";
import NavigationUtil from "../navigator/NavigationUtil";

class NoteCategoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: 'init',
            categoryList: []
        }
    }

    componentDidMount() {
        this.loadData()
        DeviceEventEmitter.addListener('refresh_list', (params) => {
            console.log('refresh_list')
            this.setState({
                text: 'init4'
            })
            this.loadData()
        })
    }


    loadData() {
        const data = {
            pageIndex: 1,
            pageSize: 10
        }

        const url = API.apiListCategory
        const token = '3e75b1bb-d664-4949-9a22-d86bd5645bae'

        const postParams = {
            method: 'POST',
            // mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json;charset=UTF-8",
                token: token
            }
        }

        let ds = new DataStore()
        ds.fetchPostData(url, data, token)
            .then((response) => {
                console.log(response)
                if (response.code === 0) {
                    this.setState({
                        categoryList: response.data.categoryList
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }

    renderItem(data) {
        const item = data.item
        console.log(item)
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        NavigationUtil.goPage({
                            item: item
                        }, 'CategoryDetail')
                    }}
                >
                    <Text>{item.categoryName}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    goDetail() {
        NavigationUtil.goPage({}, 'CategoryDetail')
    }

    render() {
        console.log(this.props)
        console.log(this.state)
        return (
            <View>
                <Text>Note category page</Text>
                <Text>{this.state.text}</Text>
                <View>

                    <FlatList
                        keyExtractor={item => '' + item.id}
                        data={this.state.categoryList}
                        renderItem={data => this.renderItem(data)}
                    />
                </View>
                <Button title={'detail'} onPress={() => {
                    this.goDetail()
                }}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    category: state.category
})

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
    loadCategory: () => dispatch(actions.loadCategory())
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteCategoryPage)