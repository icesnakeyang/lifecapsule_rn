import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput
} from 'react-native'
import actions from "../action";
import {connect} from "react-redux";

class EditNotePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: 'ok'
        }
    }

    componentWillMount() {
        this.loadData()
    }


    loadData() {
        const {onNoteDetail} = this.props
        const noteId = this.props.navigation.state.params.note.noteId
        const token = this.props.user.user.token
        onNoteDetail(noteId, token)
    }

    render() {
        let detail = ''
        if (this.props.noteList.note) {
            detail = this.props.noteList.note.detail
        }
        console.log(detail)
        return (
            <View style={{flex: 1}}>
                <Text>edit note here2</Text>
                <Text>我是谁</Text>
                <View style={{flex: 1, backgroundColor:'#ddff00'}}>
                    <TextInput
                        value={detail}
                    ></TextInput>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    RSA: state.RSA,
    noteList: state.noteList,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    getRSA: () => dispatch(actions.getRSA()),
    onNoteDetail: (noteId, token) => dispatch(actions.onNoteDetail(noteId, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNotePage)