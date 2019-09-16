import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import actions from "../action";
import {connect} from "react-redux";

class EditNotePage extends Component {
    constructor(props) {
        super(props)
        this.note = this.props.navigation.state.params.note
    }

    getRSA(){

    }

    render() {
        console.log(this.note)
        return (
            <View>
                <Text>edit note here</Text>
            </View>
        )
    }

}

const mapStateToProps = state => ({
    noteDetail: state.noteDetail
})

const mapDispatchToProps = dispatch => ({
    onNoteDetail: (noteId) => dispatch(actions.onNoteDetail(noteId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNotePage)