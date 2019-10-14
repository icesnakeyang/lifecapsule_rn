import React, {Component} from 'react'

import {
    View,
    Text,
    TextInput,
    Button,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native'
import NavigationUtil from "../../navigator/NavigationUtil";
import {API} from "../../api/api";
import {connect} from "react-redux";
import DataStore from "../../expand/dao/DataStore";
import NavigationBar from "../../common/component/NavigationBar";
import Ionicons from 'react-native-vector-icons/Ionicons'
import GetLeftButton from "../../common/component/GetLeftButton";

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
            categoryId: this.props.navigation.state.params.categoryId
        }
        const token = this.props.user.user.token
        dataStore.fetchPostData(url, requestBody, token)
            .then((response) => {
                if (response.code === 0) {
                    this.setState({
                        category: response.data.category
                    })
                }
            })
    }

    saveCategory() {
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
                if (response.code === 0) {
                    DeviceEventEmitter.emit('refresh_list')
                    NavigationUtil.goBack(this.props.navigation)
                }
            })
    }

    getRightButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => {
                        this.saveCategory()
                    }}
                >
                    <View style={{padding: 5, marginRight: 8}}>
                        <Ionicons
                            name={'md-checkmark'}
                            size={26}
                            style={{color: '#ddd'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={'Category'}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <TextInput
                    style={{borderBottomWidth: .5, margin: 10}}
                    defaultValue={this.state.category.categoryName}
                    onChangeText={(editCategoryName) => this.setState({editCategoryName})}
                ></TextInput>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme.theme
})

export default connect(mapStateToProps)(CategoryDetail)