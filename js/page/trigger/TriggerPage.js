import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from "../../navigator/NavigationUtil";

class TriggerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            triggerTitle: 'aa',
            editTriggerTittle: ''
        }
    }


    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    getRightButton() {
        return (
            <View>
                <View style={{padding: 5, paddingRight: 8}}>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                    >
                        <Ionicons
                            name={'md-trash'}
                            size={26}
                            style={{color: this.props.theme.THEME_ICON_COLOR}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('trigger.trigger')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={styles.page_container}>
                {navigationBar}
                <View style={styles.tip_view}>
                    <Text style={styles.tip_text}>{I18nJs.t('trigger.tip1')}</Text>
                </View>
                <View style={styles.trigger_view}>
                    <View style={styles.trigger_view_cell_view}>
                        <View style={{width: 80}}>
                            <Text style={styles.trigger_view_cell_label_text}>{I18nJs.t('trigger.triggerName')}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <TextInput
                                style={{backgroundColor: '#ddd', padding: 0, paddingLeft: 10, marginLeft: 10}}
                                defaultValue={this.state.triggerTitle}
                                onChangeText={(editTriggerTittle) => this.setState(editTriggerTittle)}
                            />
                        </View>
                    </View>
                    <View style={styles.trigger_view_cell_view}>
                        <View style={{width: 80}}>
                            <Text style={styles.trigger_view_cell_label_text}>{I18nJs.t('trigger.triggerRemark')}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <TextInput
                                style={{backgroundColor: '#ddd', padding: 0, paddingLeft: 10, marginLeft: 10}}
                                defaultValue={this.state.triggerTitle}
                                onChangeText={(editTriggerTittle) => this.setState(editTriggerTittle)}
                            />
                        </View>
                    </View>
                </View>
                <View
                    style={styles.condition_view}>
                    < Text> condition
                        content </Text>
                </View>
                <View style={styles.recipient_view}>
                    <Text>recipient content</Text>
                </View>
                <View style={{marginTop: 10}}>
                    <TouchableOpacity
                        style={styles.touch_row_container}
                        onPress={() => {
                            NavigationUtil.goPage({...this.props}, 'LanguagePage')
                        }}
                    >
                        <Text style={styles.trigger_view_cell_label_text}>{I18nJs.t('trigger.triggerName')}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <View
                                style={{marginRight: 20}}
                            >
                                <Ionicons
                                    name={'ios-arrow-forward'}
                                    size={20}
                                    style={{color: '#777'}}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.touch_row_container}
                        onPress={() => {
                            NavigationUtil.goPage({...this.props}, 'LanguagePage')
                        }}
                    >
                        <Text style={styles.trigger_view_cell_label_text}>{I18nJs.t('trigger.triggerRemark')}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{ marginRight: 10}}>
                                刘洋，是个疯子。他这天999岁
                            </Text>

                            <View
                                style={{marginRight: 20}}
                            >
                                <Ionicons
                                    name={'ios-arrow-forward'}
                                    size={20}
                                    style={{color: '#777'}}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme.theme,
    note: state.note
})

export default connect(mapStateToProps)(TriggerPage)

const styles = StyleSheet.create({
    page_container: {
        flex: 1
    },
    touch_row_container: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: '#d3d5d7',
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    tip_view: {
        margin: 10
    },
    tip_text: {
        fontSize: 14,
        padding: 3,
        backgroundColor: '#ddd',
        borderWidth: 0.5,
        borderColor: '#aaa'
    },
    trigger_view: {
        backgroundColor: '#ff0000'
    },
    trigger_view_cell_view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#00ffff'
    },
    trigger_view_cell_label_text: {
        fontSize: 14,
        marginLeft: 10
    },
    trigger_view_cell_content_text: {
        fontSize: 12,
        backgroundColor: '#999'
    },
    condition_view: {},
    recipient_view: {}
})