import React, {Component} from 'react'

import {
    View,
    Text,
    TextInput,
    Button,
    DeviceEventEmitter
} from 'react-native'
import NavigationUtil from "../../navigator/NavigationUtil";
import {API} from "../../api/api";
import {connect} from "react-redux";
import DataStore from "../../expand/dao/DataStore";

class CategoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {},
            editCategoryName: ''
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        let dataStore = new DataStore()
        //读取分类信息详情
        const url = API.apiGetCategory
        const requestBody = {
            categoryId: this.props.navigation.state.params.item.categoryId
        }
        const token = this.props.user.user.token
        dataStore.fetchPostData(url, requestBody, token)
            .then((response) => {
                console.log(response)
                if (response.code === 0) {
                    this.setState({
                        category: response.data.category
                    })
                    console.log(this.state)
                }
            })
    }


    saveCategory() {
        console.log(this.state)
        const url = API.apiUpdateCategory
        const token = this.props.user.user.token
        const categoryId = this.state.category.categoryId
        const editCategoryName = this.state.editCategoryName

        let dataStore = new DataStore()
        const requestBody = {
            categoryId: categoryId,
            categoryName: editCategoryName
        }
        dataStore.fetchPostData(url, requestBody, token)
            .then((response) => {
                console.log(response)
                if (response.code === 0) {
                    DeviceEventEmitter.emit('refresh_list')
                    NavigationUtil.goBack(this.props.navigation)
                }
            })
    }


    render() {
        console.log(this.props)
        return (
            <View style={{flex: 1}}>
                <Text>Category name:</Text>
                <TextInput
                    style={{borderWidth:.5, margin:10}}
                    defaultValue={this.state.category.categoryName}
                    onChangeText={(editCategoryName) => this.setState({editCategoryName})}
                ></TextInput>
                <Button title={'save'} onPress={() => {
                    this.saveCategory()
                }}
                />
            </View>
        )
    }

}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(CategoryDetail)