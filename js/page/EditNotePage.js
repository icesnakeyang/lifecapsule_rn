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
        this.getRSAPublicKey()
    }

    getRSAPublicKey() {
        const {getRSA} = this.props
        getRSA()
    }

    render() {
        console.log(this.note)
        console.log(this.props)
        return (
            <View>
                <Text>edit note here</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    RSA: state.RSA,
    noteDetail: state.noteDetail
})

const mapDispatchToProps = dispatch => ({
    getRSA: () => dispatch(actions.getRSA()),
    onNoteDetail: (noteId) => dispatch(actions.onNoteDetail(noteId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNotePage)