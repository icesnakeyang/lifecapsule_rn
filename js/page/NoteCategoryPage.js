import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native'

import actions from "../action";
import {connect} from "react-redux";
import DataStore from "../expand/dao/DataStore";
import {API} from "../api/api";
import NavigationUtil from "../navigator/NavigationUtil";
import CategoryListItem from "../common/component/CategoryListItem";
import Feather from 'react-native-vector-icons/Feather'
import NavigationBar from "../common/component/NavigationBar";

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
                if (response.code === 0) {
                    this.setState({
                        categoryList: response.data.categoryList
                    })
                }
            })
            .catch((error) => {
            })

    }

    renderItem(data) {
        const item = data.item
        return (
            <CategoryListItem item={data}></CategoryListItem>
        )
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

    getRightButton(){
        return(
            <View>
                <TouchableOpacity
                    onPress={()=>{
                        console.log('add category')
                    }}
                >
                    <View style={{padding:5, marginRight:8}}>
                        <Feather
                            name={'plus'}
                            size={24}
                            style={{color:'#ddd'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let statusBar={
            backgroundColor: '#678',
            barStyle:'light-content'
        }
        let navigationBar=
            <NavigationBar
                title={'Category'}
                statusBar={statusBar}
                style={{backgroundColor: '#678'}}
                rightButton={this.getRightButton()}
            />
        return (
            <View style={styles.container}>
                {navigationBar}
                <View style={styles.row_container}>
                    <FlatList
                        keyExtractor={item => '' + item.id}
                        data={this.state.categoryList}
                        renderItem={({item}) => (
                            this.renderItem(item)
                        )}
                    />
                </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row_container:{
        backgroundColor:'#ddd',

    }
})