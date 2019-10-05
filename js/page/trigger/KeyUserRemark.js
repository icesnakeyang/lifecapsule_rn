import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";

class KeyUserRemark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remark: '',
            editRemark: ''
        }
    }

    componentDidMount() {
        this.loadAllData()
    }

    loadAllData() {
        console.log(this.props)
        if (this.props.trigger.gogoKey) {
            this.setState({
                remark: this.props.trigger.gogoKey.remark
            })
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    getRightButton() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        this.saveRemark()
                    }}
                    style={{margin: 8, marginRight: 13}}>
                    <View>
                        <Ionicons
                            name={'md-checkmark'}
                            size={26}
                            style={{color: this.props.theme.THEME_ICON_COLOR}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    saveRemark() {
        console.log(this.state)
    }


    render() {
        console.log(this.props)
        let statusBar = {
            backgroundColor: this.props.theme.THEME_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('trigger.userRemark')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.THEME_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <View>
                    <TextInput
                        defaultValue={this.state.remark}
                        onChangeText={(editRemark) => this.setState({editRemark})}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    trigger: state.trigger
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(KeyUserRemark)