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
import GetLeftButton from "../../common/component/GetLeftButton";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";

class NewCategoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editCategoryName: ''
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    getRightButton() {
        return (
            <View>
                <TouchableOpacity
                    style={{margin: 5, marginRight: 8}}
                    onPress={() => {
                        this.saveCategory()
                    }}
                >
                    <Ionicons
                        name={'md-checkmark'}
                        size={26}
                        style={{color: this.props.theme.THEME_HEAD_TEXT}}
                    />
                </TouchableOpacity>
            </View>
        )
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
                if (response.code === 0) {
                    DeviceEventEmitter.emit('refresh_list')
                    NavigationUtil.goBack(this.props.navigation)
                }
            })
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('category.newCategory')}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                statusBar={statusBar}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <TextInput
                    style={{borderBottomWidth: .5, margin: 10}}
                    defaultValue={''}
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

export default connect(mapStateToProps)(NewCategoryDetail)