import React, {Component} from 'react'
import {
    View,
    Text, TouchableOpacity, DeviceEventEmitter, FlatList
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../../common/component/GetLeftButton";
import NavigationBar from "../../../common/component/NavigationBar";
import {I18nJs} from "../../../language/I18n";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationUtil from "../../../navigator/NavigationUtil";
import InputRow from "../../../common/component/InputRow";

class RecipientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipientList: []
        }
    }

    componentDidMount() {
        this.loadAllData()
        this.listener = DeviceEventEmitter.addListener('Refresh_NoteList', (params) => {
            this.loadAllData()
        })
    }

    componentWillUnmount() {
        this.listener.remove()
    }

    loadAllData() {
        if (this.props.trigger.trigger && this.props.trigger.trigger.recipientList.length > 0) {
            this.setState({
                recipientList: this.props.trigger.trigger.recipientList
            })
        } else {
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    getRightButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{padding: 5, paddingRight: 8}}>
                    <TouchableOpacity
                        onPress={() => {
                            NavigationUtil.goPage({}, 'RecipientDetail')
                        }}
                    >
                        <Ionicons
                            name={'md-add'}
                            size={26}
                            style={{color: this.props.theme.THEME_ICON_COLOR}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderItem(data) {
        let func = () => {

        }

        return (
            <InputRow
                touchFunction={func}
                content={data.phone}
                label={'ll'}
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
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                title={I18nJs.t('trigger.settingRecipient')}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <Text>recipient list</Text>
                <FlatList
                    keyExtractor={item => '' + item.ids}
                    data={this.state.recipientList}
                    renderItem={({item}) => (
                        this.renderItem(item)
                    )}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    trigger: state.trigger
})

export default connect(mapStateToProps)(RecipientList)