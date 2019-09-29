import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    DeviceEventEmitter,
    Dimensions
} from 'react-native'
import Textarea from 'react-native-textarea'
import NavigationBar from "../../common/component/NavigationBar";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from "react-redux";
import NavigationUtil from "../../navigator/NavigationUtil";
import actions from "../../action";
import {I18nJs} from "../../language/I18n";
import GetLeftButton from "../../common/component/GetLeftButton";

class NewNotePage extends Component {
    constructor(props) {
        super(props);
        let {height, width} = Dimensions.get('window')
        this.state = {
            editDetail: '',
            editTitle: '',
            height: height,
            width: width
        }

    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    getRightButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => {
                        /**
                         * 先保存note，获取noteId，再进入trigger页面
                         * 把note保存到AsyncStorage，再进入trigger页面。保存trigger时，一起保存note
                         */
                    }}
                >
                    <View style={{padding: 5, marginRight: 13}}>
                        <Ionicons
                            name={'md-stopwatch'}
                            size={26}
                            style={{color: '#ddd'}}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.saveNote()
                    }}
                >
                    <View style={{padding: 5, marginRight: 8}}>
                        <Ionicons
                            name={'md-checkmark'}
                            size={26}
                            style={{color: '#ddd'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    saveNote() {
        const {saveNote} = this.props
        const token = this.props.user.user.token
        const categoryId = this.props.category.categoryId

        const params = {
            title: this.state.editTitle,
            detail: this.state.editDetail,
            token: token,
            categoryId: categoryId
        }

        saveNote(params, (result) => {
            if (result) {
                DeviceEventEmitter.emit('Refresh_NoteList')
                NavigationUtil.goBack(this.props.navigation)
            }
        })
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_COLOR,
            barStyle: 'light-content'
        }
        let navigationBar =
            <NavigationBar
                title={I18nJs.t('note.newNote')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        return (
            <View style={styles.container}>
                {navigationBar}
                <View style={styles.title_view}>
                    <TextInput
                        style={styles.title_text}
                        onChangeText={(editTitle) => this.setState({editTitle})}
                    />
                </View>
                <View style={{height: this.state.height}}>
                    <Textarea
                        containerStyle={styles.detail_text}
                        onChangeText={(editDetail) => this.setState({editDetail})}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme.theme,
    category: state.category
})
const mapDispatchToProps = dispatch => ({
    saveNote: (params, callback) => dispatch(actions.saveNote(params, callback))
})
export default connect(mapStateToProps, mapDispatchToProps)(NewNotePage)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title_view: {
        marginTop: 20,
        borderBottomWidth: 0.5,
        borderColor: '#111111'
    },
    title_text: {
        fontSize: 24,
        paddingLeft: 10,
        paddingRight: 10
    },
    detail_text: {
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10
    }
})