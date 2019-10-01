import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    DeviceEventEmitter,
    TouchableOpacity,
    FlatList
} from 'react-native'
import {connect} from "react-redux";
import NoteListItem from "../../common/component/NoteListItem";
import actions from "../../action";
import Feather from 'react-native-vector-icons/Feather'
import NavigationBar from "../../common/component/NavigationBar";
import NavigationUtil from "../../navigator/NavigationUtil";
import {I18nJs} from "../../language/I18n";
import Ionicons from "react-native-vector-icons/Ionicons";

class NoteListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noteList: [],
            refreshing: true
        }
    }

    componentDidMount() {
        this.loadData()
        DeviceEventEmitter.addListener('Refresh_NoteList', (params) => {
            this.loadData()
        })
    }

    loadData() {
        if (this.props.category.categoryId) {
            //有category，读取分类笔记
            const params = {
                categoryId: this.props.category.categoryId,
                pageIndex: 1,
                pageSize: 20,
                token: this.props.user.user.token
            }

            const {listNoteByCategory} = this.props
            listNoteByCategory(params, (result) => {
                if (result) {
                    this.setState({
                        noteList: this.props.note.noteList
                    })
                }
            })
        } else {
            //没有category，读取最新的笔记
            const {listNoteRecent} = this.props
            let params = {
                token: this.props.user.user.token,
                pageIndex: 1,
                pageSize: 20
            }
            listNoteRecent(params, (result) => {
                if (result) {
                    this.setState({
                        noteList: this.props.note.noteList,
                        refreshing: this.props.note.refreshing
                    })
                }
            })
        }
    }

    renderItem(data) {
        return (
            <NoteListItem item={data}></NoteListItem>
        )
    }

    getRightButton() {
        return (
            <View style={styles.right_button_view}>
                <TouchableOpacity
                    onPress={() => {
                        NavigationUtil.goPage({...this.props}, 'SelectCategory')
                    }}
                >
                    <View style={{padding: 5, marginRight: 8}}>
                        <Ionicons
                            name={'md-folder'}
                            size={24}
                            style={{color: '#ddd'}}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        NavigationUtil.goPage({}, 'NewNotePage')
                    }}
                >
                    <View style={{padding: 5, marginRight: 8}}>
                        <Feather
                            name={'plus'}
                            size={24}
                            style={{color: '#ddd'}}
                        >
                        </Feather>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _data() {

    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.theme.THEME_COLOR,
            barStyle: 'light-content'
        }
        let navigationBar =
            <NavigationBar
                title={I18nJs.t('noteList.headerName')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.theme.THEME_COLOR}}
                rightButton={this.getRightButton()}
            />
        return (
            <View>
                {navigationBar}
                <FlatList
                    data={this.state.noteList}
                    renderItem={({item}) => (
                        this.renderItem(item)
                    )}
                />
            </View>
        )
    }
}

const
    mapStateToProps = state => ({
        user: state.user,
        note: state.note,
        theme: state.theme,
        category: state.category
    })
const
    mapDispatchToProps = dispatch => ({
        listNoteRecent: (params, callback) => dispatch(actions.listNoteRecent(params, callback)),
        listNoteByCategory: (params, callback) => dispatch(actions.listNoteByCategory(params, callback))
    })

export default connect(mapStateToProps, mapDispatchToProps)(NoteListPage)

const styles = StyleSheet.create({
    right_button_view: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})