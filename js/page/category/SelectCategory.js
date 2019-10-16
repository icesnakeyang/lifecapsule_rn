import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    DeviceEventEmitter,
    Dimensions
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
        let {height, width} = Dimensions.get('window')
        this.state = {
            screen_height: height,
            screen_width: width,
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
        let {loadCategory} = this.props
        if (this.props.user && this.props.user.user && this.props.user.user.token) {
            loadCategory(1, 20, this.props.user.user.token, (result) => {
                if (result) {
                    this.setState({
                        categoryList: this.props.category.categoryList.categoryList
                    })
                }
            })
        }
    }

    renderItem(data) {
        const item = data
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    marginTop: 10,
                    backgroundColor: this.props.theme.THEME_ROW_COLOR,
                    height: 50,
                    padding: 10,
                    justifyContent: 'center'
                }}
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
                <Text style={{fontSize: 16, color: this.props.theme.THEME_TEXT_COLOR}}>{item.categoryName}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('note.selectCategory')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View style={{backgroundColor: this.props.theme.THEME_BACK_COLOR}}>
                {navigationBar}
                <View style={{height: this.state.screen_height}}>
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