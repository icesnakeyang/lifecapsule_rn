import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet, FlatList, DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import NavigationUtil from "../../navigator/NavigationUtil";
import actions from "../../action";
import I18nJs from "react-native-i18n";

class SelectCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme_color: '#000fff',
            categoryList: []
        }
    }

    componentDidMount() {
        this._data()
    }


    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    _data() {
        if (this.props.theme && this.props.theme.THEME_COLOR) {
            this.setState({
                theme_color: this.props.theme.THEME_COLOR
            })
        }
        let {loadCategory} = this.props
        if (this.props.user && this.props.user.user && this.props.user.user.token) {
            loadCategory(1, 20, this.props.user.user.token, (result) => {
                this.setState({
                    categoryList: this.props.category.categoryList.categoryList
                })
            })
        }
    }

    renderItem(data) {
        const item = data
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={() => {
                    const {setCategory} = this.props
                    setCategory(item.categoryId, (result) => {
                        if (result) {
                            //重新刷新noteList
                            DeviceEventEmitter.emit('Refresh_NoteList')
                            NavigationUtil.goBack(this.props.navigation)
                        }
                    })
                }}
            >
                <Text style={styles.title}>{item.categoryName}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.state.theme_color,
            barStyle: 'light-content'
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('note.selectCategory')}
                statusBar={statusBar}
                style={{backgroundColor: this.state.theme_color}}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View>
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
    user: state.user,
    theme: state.theme.theme,
    category: state.category
})

const mapDispatchToProps = dispatch => ({
    loadCategory: (pageIndex, pageSize, token, callback) =>
        dispatch(actions.loadCategory(pageIndex, pageSize, token, callback)),
    setCategory: (categoryId, callback) => dispatch(actions.setCategory(categoryId, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory)

const styles = StyleSheet.create({
    row: {
        flex: 1,
        backgroundColor: '#fefffb',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd'
    },
})