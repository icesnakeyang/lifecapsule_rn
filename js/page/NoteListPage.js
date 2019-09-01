import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native'
import actions from "../action";
import {connect} from "react-redux";
import NoteListItem from "../common/component/NoteListItem";

const URL = 'http://gogorpg.com:8088/note/listNoteByUserToken'

class NoteListPage extends Component {
    constructor(props) {
        super(props)
    }

    loadData() {
        const {onListNote} = this.props
        const url = URL
        onListNote(url)
    }

    componentDidMount() {
        this.loadData()
    }

    renderItem(data) {

        return (
            <NoteListItem item={data}></NoteListItem>
        )
    }

    render() {
        console.log(this.props.noteList)
        const {noteList} = this.props.noteList
        console.log(noteList)
        return (
            <View>
                <Text>note list page</Text>
                <FlatList
                    data={noteList}
                    renderItem={({item}) => (
                        this.renderItem(item)
                    )}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    noteList: state.noteList
})

const mapDispatchToProps = dispatch => ({
    onListNote: (url) => dispatch(actions.onListNote(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteListPage)