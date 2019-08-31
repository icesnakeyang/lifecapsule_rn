import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native'
import actions from "../action";
import {connect} from "react-redux";
import DataStore from "../expand/dao/DataStore";

// const url = 'https://api.github.com/search/repositories?q=java'
// const url = 'http://127.0.0.1:8088/security/requestRSAPublicKey'
const url = 'http://127.0.0.1:8088/note/listNoteByUserToken'

class NoteCategoryPage extends Component {
    loadData() {
        console.log('load data')
        console.log(url)

        const data = {
            pageIndex: 1,
            pageSize: 10
        }

        const token = '3e75b1bb-d664-4949-9a22-d86bd5645bae'

        const postParams = {
            method: 'POST',
            // mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
                token: token
            }
        }

        let ds = new DataStore()
        ds.fetchPostData(url, postParams)
            .then((response) => {
                // console.log(`初次加载：${new Date(response.timestamp)}`)
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })

    }


    render() {
        return (
            <View>
                <Text>Note category page</Text>
                <Button title={'change color'} onPress={() => {
                    this.props.onThemeChange('#ff0000')
                }}
                />
                <Button
                    title={'test storage'}
                    onPress={() => {
                        this.loadData()
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteCategoryPage)