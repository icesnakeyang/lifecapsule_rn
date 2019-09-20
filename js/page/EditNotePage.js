import React, {Component} from 'react'
import {
    View,
    Text,
    Button,
    TextInput
} from 'react-native'
import {WebView} from "react-native-webview"
import actions from "../action";
import {connect} from "react-redux";
import Textarea from "react-native-textarea";

class EditNotePage extends Component {
    constructor(props) {
        super(props)
        const {clearNote}=this.props
        clearNote()
        this.state={
            showDetail:'',
            editDetail:'',
        }
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
        note.detail=this.state.editDetail
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
        if (this.props.note.note) {
            theDetail=this.props.note.note.detail
        }
        return (
            <View style={{flex: 1}}>
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
                    onChangeText={(editDetail)=>this.setState({editDetail})}
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
    note: state.note,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    getRSA: () => dispatch(actions.getRSA()),
    onNoteDetail: (noteId, token) => dispatch(actions.onNoteDetail(noteId, token)),
    updateNote:(params)=>dispatch(actions.updateNote(params)),
    clearNote:()=>dispatch(actions.clearNote())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNotePage)