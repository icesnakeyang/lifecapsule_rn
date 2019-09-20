import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList, BackHandler
} from 'react-native'
import {connect} from "react-redux";
import NoteListItem from "../common/component/NoteListItem";
import {API} from "../api/api";
import DataStore from "../expand/dao/DataStore";
import {NavigationActions} from "react-navigation";
import actions from "../action";

class NoteListPage extends Component {
    constructor(props) {
        console.log('construct note list page')
        super(props)
        this.state={
            noteList:this.props.note.noteList
        }
    }

    componentDidMount() {
        this.willFocusSubscription=this.props.navigation.addListener(
            'willFocus',
            payload=>{
                const {refreshNoteList}=this.props
                refreshNoteList()
                console.log('load payload')
                console.log(this.props)
                // this.loadData()
            }
        )
        // this.loadData()
        // BackHandler.addEventListener('hardwareBackPress', ()=>{
        //     const {nav, dispatch} =this.props
        //     if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
        //         return false;
        //     }
        //     dispatch(NavigationActions.back());
        //     return true;
        // })
    }

    componentWillUnmount(){

    }


    loadData() {
        const url = API.apiListNote
        let dataStore = new DataStore()
        const requestBody = {
            pageIndex: 1,
            pageSize: 10
        }
        const token = this.props.user.user.token
        dataStore.fetchPostData(url, requestBody, token)
            .then((data) => {
                this.setState({
                    noteList:data.data.noteList
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    renderItem(data) {
        return (
            <NoteListItem item={data}></NoteListItem>
        )
    }

    render() {
        console.log('render note list page')
        console.log(this.state)
        console.log(this.props)
        return (
            <View>
                {/*<FlatList*/}
                {/*    data={this.state.noteList}*/}
                {/*    renderItem={({item}) => (*/}
                {/*        this.renderItem(item)*/}
                {/*    )}*/}
                {/*/>*/}
                <Text>test 1</Text>
                <Text>test 2</Text>
                <Text>test 3</Text>
                <Text>{this.state.noteList}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
        user: state.user,
    note:state.note
    })
const mapDispatchToProps=dispatch=>({
    refreshNoteList:(params)=>(actions.refreshNoteList(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteListPage)