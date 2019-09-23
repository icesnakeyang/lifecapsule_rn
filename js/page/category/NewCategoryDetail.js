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

class NewCategoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editCategoryName: ''
        }
    }

    componentDidMount() {
    }

    saveCategory() {
        const url = API.apiCreateCategory
        const token = this.props.user.user.token
        const editCategoryName = this.state.editCategoryName

        let dataStore = new DataStore()
        const requestBody = {
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
        return (
            <View style={{flex: 1}}>
                <Text>Category name:</Text>
                <TextInput
                    style={{borderWidth: .5, margin: 10}}
                    defaultValue={''}
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

export default connect(mapStateToProps)(NewCategoryDetail)