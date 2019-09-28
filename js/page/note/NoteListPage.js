import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList, BackHandler, DeviceEventEmitter,
    TouchableOpacity
} from 'react-native'
import {connect} from "react-redux";
import NoteListItem from "../../common/component/NoteListItem";
import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";
import actions from "../../action";
import Feather from 'react-native-vector-icons/Feather'
import NavigationBar from "../../common/component/NavigationBar";
import NavigationUtil from "../../navigator/NavigationUtil";
import {I18nJs} from "../../language/I18n";

class NoteListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noteList: this.props.note.noteList
        }
    }

    componentDidMount() {
        this.loadData()
        DeviceEventEmitter.addListener('Refresh_NoteList', (params) => {
            this.loadData()
        })
    }

    loadData() {
        const url = API.apiListNote
        let dataStore = new DataStore()
        const requestBody = {
            pageIndex: 1,
            pageSize: 10
        }
        if (!this.props.user.user) {
            return
        }
        const token = this.props.user.user.token
        dataStore.fetchPostData(url, requestBody, token)
            .then((data) => {
                this.setState({
                    noteList: data.data.noteList
                })
            })
            .catch((error) => {
            })
    }

    renderItem(data) {
        return (
            <NoteListItem item={data}></NoteListItem>
        )
    }

    getRightButton() {
        return (
            <View>
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

const mapStateToProps = state => ({
    user: state.user,
    note: state.note,
    theme: state.theme
})
const mapDispatchToProps = dispatch => ({
    refreshNoteList: () => (actions.refreshNoteList())
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteListPage)