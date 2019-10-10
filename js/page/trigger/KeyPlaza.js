import React, {Component} from 'react'
import {
    View,
    Text,
    FlatList, DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import InputRow from "../../common/component/InputRow";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import NavigationUtil from "../../navigator/NavigationUtil";
import actions from "../../action";
import {I18nJs} from "../../language/I18n";
import lifestyles from "../../common/styles/lifestyles";

class KeyPlaza extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gogoPublickKeyList: []
        }
    }

    componentDidMount() {
        this.loadAllData()
    }

    loadAllData() {
        const {listPublicKey} = this.props
        const params = {
            token: this.props.user.user.token
        }
        listPublicKey(params, (result) => {
            if (result) {
                this.setState({
                    gogoPublickKeyList: this.props.trigger.gogoPublickKeyList
                })
            }
        })
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    renderItem(data) {
        let func = () => {
            const token = this.props.user.user.token
            const publicKeyId = data.publicKeyId
            const params = {
                publicKeyId: publicKeyId,
                token: token
            }
            if (this.props.trigger.trigger) {
                params.trigger = this.props.trigger.trigger
            }
            let {getGogoPublicKey} = this.props
            getGogoPublicKey(params, (result) => {
                if (result) {
                    DeviceEventEmitter.emit('refresh_key_detail')
                    NavigationUtil.goPage({...params}, 'KeyDetail')
                }
            })
        }

        return (
            <InputRow
                touchFunction={func}
                content={data.description}
                label={data.title}
                showLabel={true}
            />
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={'title'}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <View style={lifestyles.tip_view}>
                    <Text style={lifestyles.tip_text}>{I18nJs.t('trigger.tip2')}</Text>
                </View>
                <FlatList
                    keyExtractor={item => '' + item.ids}
                    data={this.state.gogoPublickKeyList}
                    renderItem={({item}) => (
                        this.renderItem(item)
                    )}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    note: state.note,
    theme: state.theme.theme,
    user: state.user,
    trigger: state.trigger
})

const mapDispatchToProps = dispatch => ({
    listPublicKey: (params, callback) => dispatch(actions.listPublicKey(params, callback)),
    getGogoPublicKey: (params, callback) => dispatch(actions.getGogoPublicKey(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(KeyPlaza)