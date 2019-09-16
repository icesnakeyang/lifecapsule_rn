import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList
} from 'react-native'
import actions from "../action";
import {connect} from "react-redux";
import DataStore from "../expand/dao/DataStore";

const url = 'http://gogorpg.com:8088/category/listCategory'


class NoteCategoryPage extends Component {
    constructor(props) {
        super(props)
        this.categoryList = []
    }

    componentDidMount() {
        this.loadData()
    }


    loadData() {
        const data = {
            pageIndex: 1,
            pageSize: 10
        }

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
        ds.fetchPostData(url, postParams)
            .then((response) => {
                if (response.code === 0) {
                    this.categoryList = response.data.categoryList
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }

    renderItem(data) {
        const item = data.item
        return (
            <View>
                <Text>ok</Text>
            </View>
        )
    }

    render() {
        return (
            <View>
                <Text>Note category page</Text>

                <View>
                    <FlatList
                        keyExtractor={item => '' + item.id}
                        data={this.categoryList}
                        renderItem={data => this.renderItem(data)}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteCategoryPage)