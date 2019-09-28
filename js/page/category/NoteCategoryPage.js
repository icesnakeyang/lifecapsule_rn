import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native'

import actions from "../../action";
import {connect} from "react-redux";
import DataStore from "../../expand/dao/DataStore";
import {API} from "../../api/api";
import NavigationUtil from "../../navigator/NavigationUtil";
import CategoryListItem from "../../common/component/CategoryListItem";
import Feather from 'react-native-vector-icons/Feather'
import NavigationBar from "../../common/component/NavigationBar";

class NoteCategoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: 'init',
            categoryList: [],
            pageIndex: 1,
            pageSize: 10
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
        if (!this.props.user.user) {
            return
        }
        const data = {
            pageIndex: 1,
            pageSize: 10
        }

        const {loadCategory} = this.props
        loadCategory(this.state.pageIndex, this.state.pageSize, this.props.user.user.token, (result) => {
            console.log(result)
            console.log(this.props)
            if (result) {
                this.setState({
                    categoryList: this.props.category.categoryList.categoryList
                })
            }
        })
    }

    renderItem(data) {
        console.log(data)
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

    getRightButton() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        NavigationUtil.goPage({}, 'NewCategoryDetail')
                    }}
                >
                    <View style={{padding: 5, marginRight: 8}}>
                        <Feather
                            name={'plus'}
                            size={24}
                            style={{color: '#ddd'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.theme.THEME_COLOR,
            barStyle: 'light-content'
        }
        let navigationBar =
            <NavigationBar
                title={'Category'}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.theme.THEME_COLOR}}
                rightButton={this.getRightButton()}
            />
        return (
            <View style={styles.container}>
                {navigationBar}
                <View style={styles.row_container}>
                    <FlatList
                        keyExtractor={item => '' + item.ids}
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
    category: state.category,
    theme: state.theme,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
    loadCategory: (pageIndex, pageSize, token, callback) => dispatch(actions.loadCategory(pageIndex, pageSize, token, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteCategoryPage)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row_container: {
        backgroundColor: '#ddd',

    }
})