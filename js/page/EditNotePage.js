import React, {Component} from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import {WebView} from "react-native-webview"
import actions from "../action";
import {connect} from "react-redux";
import Textarea from "react-native-textarea";

class EditNotePage extends Component {
    constructor(props) {
        super(props)
        this.state={
            noteDetail:''
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

    saveNote(){
        let note=this.props.noteList.note
        note.detail=this.state.noteDetail
        const token=this.props.user.user.token
        let params={
            note:note,
            token:token
        }

        const {updateNote}=this.props
        updateNote(params)
    }

    render() {
        let theDetail=''
        if (this.props.noteList.note) {
            theDetail=this.props.noteList.note.detail
        }
        return (
            <View style={{flex: 1}}>
                <Text>edit note here</Text>
                {/*<View style={{flex: 1, fontSize: 48, backgroundColor: '#00ff00'}}>*/}
                {/*    <WebView*/}
                {/*        style={{color: '#ffff00', fontSize: 48}}*/}
                {/*        originWhitelist={['*']}*/}
                {/*        source={{html: detail}}*/}
                {/*    />*/}
                {/*</View>*/}
                <Textarea
                    containerStyle={{flex:1}}
                    defaultValue={theDetail}
                    onChangeText={(noteDetail)=>this.setState({noteDetail})}
                />
                <Button
                    title={'Save'}
                    onPress={()=>{
                        this.saveNote()
                    }}
                />
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
    onNoteDetail: (noteId, token) => dispatch(actions.onNoteDetail(noteId, token)),
    updateNote:(params)=>dispatch(actions.updateNote(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNotePage)