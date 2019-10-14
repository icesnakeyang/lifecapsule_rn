import React, {Component} from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import GetLeftButton from "../../../common/component/GetLeftButton";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from "react-redux";
import NavigationBar from "../../../common/component/NavigationBar";
import actions from "../../../action";
import NavigationUtil from "../../../navigator/NavigationUtil";
import {I18nJs} from "../../../language/I18n";

class NickNamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            editNickname: ''
        }
    }

    componentDidMount() {
        this.loadAllData()
    }

    componentWillUnmount() {

    }

    loadAllData() {
        console.log(this.props)
        if (this.props.user.user && this.props.user.user.nickname) {
            this.setState({
                nickname: this.props.user.user.nickname,
                editNickname: this.props.user.user.nickname
            })
        }
    }

    saveNickname() {
        const {saveNickName} = this.props
        saveNickName(this.state.editNickname, this.props.user.user.token, (result) => {
            if (result) {
                NavigationUtil.goPage({
                    navigation: this.props.navigation
                }, 'MyAccount')
            }
        })
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    getRightButton() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        this.saveNickname()
                    }}
                    style={{padding: 5, paddingRight: 13}}
                >
                    <Ionicons
                        name={'md-checkmark'}
                        size={26}
                        style={{color: this.props.theme.THEME_ICON_COLOR}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('myAccount.nickname')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <TextInput
                    style={styles.input_text}
                    defaultValue={this.state.nickname}
                    onChangeText={(editNickname) => this.setState({editNickname})}
                ></TextInput>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    saveNickName: (nickname, token, callback) => dispatch(actions.saveNickName(nickname, token, callback))
})
export default connect(mapStateToProps, mapDispatchToProps)(NickNamePage)

const styles = StyleSheet.create({
    input_text: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 16,
        borderBottomWidth: 1
    }
})