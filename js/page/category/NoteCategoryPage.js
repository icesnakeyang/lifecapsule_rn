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
import NavigationUtil from "../../navigator/NavigationUtil";
import CategoryListItem from "../../common/component/CategoryListItem";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import InputRow from "../../common/component/InputRow";
import PropTypes from "prop-types";

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
        this.listener = DeviceEventEmitter.addListener('refresh_list', (params) => {
            this.setState({
                text: 'init4'
            })
            this.loadData()
        })
    }

    componentWillUnmount() {
        this.listener.remove()
    }


    loadData() {
        if (!this.props.user.user) {
            return
        }

        const {loadCategory} = this.props
        loadCategory(this.state.pageIndex, this.state.pageSize, this.props.user.user.token, (result) => {
            if (result) {
                if (this.props)
                    this.setState({
                        categoryList: this.props.category.categoryList.categoryList
                    })
            }
        })
    }

    renderItem(data) {
        let func = () => {
            NavigationUtil.goPage({...data}, 'CategoryDetail')
        }
        return (
            <InputRow
                optionalFunc={func}
                content={data.categoryName}
                showLabel={false}
            />
        )
    }

    getRightButton() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={() => {
                        NavigationUtil.goPage({}, 'NewCategoryDetail')
                    }}
                >
                    <View style={{padding: 5, marginRight: 8}}>
                        <Ionicons
                            name={'md-add'}
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
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('category.category')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.theme.THEME_COLOR}}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={styles.container}>
                {navigationBar}
                <View>
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
    }
})