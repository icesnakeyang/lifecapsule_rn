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


class NoteListPage extends Component {
    constructor(props) {
        super(props)
    }

    loadData() {
        const {onListNote} = this.props
        const token=this.props.user.user.token
        onListNote(token)
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
        const {noteList} = this.props.noteList
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
    noteList: state.noteList,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    onListNote: (token) => dispatch(actions.onListNote(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteListPage)