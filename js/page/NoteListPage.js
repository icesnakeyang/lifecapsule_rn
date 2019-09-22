import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList, BackHandler, DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import NoteListItem from "../common/component/NoteListItem";
import {API} from "../api/api";
import DataStore from "../expand/dao/DataStore";
import actions from "../action";

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
        const token = this.props.user.user.token
        console.log(url)
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

    render() {
        return (
            <View>
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
    note: state.note
})
const mapDispatchToProps = dispatch => ({
    refreshNoteList: () => (actions.refreshNoteList())
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteListPage)