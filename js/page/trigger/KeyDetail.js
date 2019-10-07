import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    DeviceEventEmitter,
    FlatList
} from 'react-native'
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavigationBar from "../../common/component/NavigationBar";
import GetLeftButton from "../../common/component/GetLeftButton";
import lifestyles from '../../common/styles/lifestyles'
import InputRow from "../../common/component/InputRow";
import NavigationUtil from "../../navigator/NavigationUtil";
import {I18nJs} from "../../language/I18n";

class KeyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gogoKey: {},
            userRemark: '',
            datetime: ''
        }
    }

    componentDidMount() {
        this.loadAllData()
        DeviceEventEmitter.addListener('refresh_trigger_detail', (params) => {
            this.loadAllData()
        })
    }

    loadAllData() {
        console.log(this.state)
        /**
         * 1、用户已经设置了trigger，读取的是用户设置的trigger
         * 2、如果用户没有设置trigger，读取的是空
         * 3、用户从gogoKeyPlaza选择了trigger返回，此时trigger为空，但应该要显示gogoKey的模板
         */
        if (this.props.trigger.status === 'SETTING_GOGOKEY') {
            this.setState({
                gogoKey: this.props.trigger.publicKey,
                userRemark: this.props.trigger.userRemark,
                datetime: this.props.trigger.datetime
            })

            if (this.props.trigger.params && this.state.gogoKey && this.state.gogoKey.keyParams) {
                const tmpData = this.state.gogoKey
                tmpData.keyParams.map((item1, index1) => {
                    if (item1.type === 'datetime') {
                        if (item1.param === this.props.trigger.params.param) {
                            item1.value = this.props.trigger.params.value
                            this.setState(Object.assign({}, this.state, {
                                gogoKey: tmpData
                            }))
                        }
                    }
                })
            }

            // this.setState(Object.assign({}, this.state, {
            //     dataArray: newlist
            // }));

            // if (this.state.gogoKey) {
            //     this.state.gogoKey.keyParams.forEach((item, index) => {
            //         console.log(item)
            //         if (item.type === 'datetime') {
            //             console.log(item.param)
            //             item.value = this.state.datetime
            //         }
            //     })
            // }
        } else {
        }
    }

    GetLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    GetRightButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{padding: 5, paddingRight: 13}}>
                    <TouchableOpacity
                        onPress={() => {

                        }}
                    >
                        <Ionicons
                            name={'md-checkmark'}
                            size={26}
                            style={{color: this.props.theme.THEME_ICON_COLOR}}
                        />
                    </TouchableOpacity>
                </View>
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

    renderItem(data) {
        return (
            <InputRow
                touchFunction={() => {
                    if (data.type === 'datetime') {
                        NavigationUtil.goPage({...data}, 'DateTimePickerPage')
                    }
                }}
                label={data.param}
                content={data.value}
                showLabel={true}
            />
        )
    }

    render() {
        if (!this.props.trigger.trigger) {
        }
        let statusBar = {
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={'key detail'}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                leftButton={this.GetLeftButton()}
                rightButton={this.GetRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <View style={lifestyles.tip_view}>
                    <Text style={lifestyles.tip_text}>{I18nJs.t('trigger.tip2')}</Text>
                </View>
                <View style={lifestyles.tip_view2}>
                    <Text style={lifestyles.tip_text2}>{this.state.gogoKey.title}</Text>
                </View>
                <View style={lifestyles.tip_view2}>
                    <Text style={lifestyles.tip_text2}>{this.state.gogoKey.description}</Text>
                </View>
                <FlatList
                    data={this.state.gogoKey.keyParams}
                    renderItem={({item}) => (
                        this.renderItem(item)
                    )}
                />
                <InputRow
                    touchFunction={() => {
                        NavigationUtil.goPage({}, 'KeyUserRemark')
                    }}
                    label={I18nJs.t('trigger.userRemark')}
                    content={this.state.userRemark}
                    showLabel={true}
                />
                <View style={{marginTop: 30}}>
                    <Button
                        title={I18nJs.t('trigger.selectPublicKey')}
                        onPress={() => {
                            NavigationUtil.goPage({}, 'KeyPlaza')
                        }}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    note: state.note,
    theme: state.theme.theme,
    trigger: state.trigger
})

export default connect(mapStateToProps)(KeyDetail)