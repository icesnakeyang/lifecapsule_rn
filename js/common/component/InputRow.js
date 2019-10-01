import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class InputRow extends Component {
    static propTypes = {
        optionalFunc: PropTypes.func,
        label: PropTypes.string,
        content: PropTypes.string,
        showLabel: PropTypes.bool
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this._generateRow()}
            </View>
        )
    }

    _generateRow() {
        // if (this.props.showLabel) {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    backgroundColor: this.props.theme.THEME_ROW_COLOR,
                    height: 50,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}
                onPress={this.props.optionalFunc}
            >
                {this.props.showLabel ? <Text style={{marginLeft: 10}}>{this.props.label}</Text> :
                    <Text style={{marginLeft: 10}}>{this.props.content}</Text>}
                <View
                    style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#00ff00'}}>
                    {this.props.showLabel ? <Text style={{marginRight: 10}}>{this.props.content}</Text> : null}
                    <View style={{marginRight: 20}}>
                        <Ionicons
                            name={'ios-arrow-forward'}
                            size={20}
                            style={{color: this.props.theme.THEME_ICON_COLOR}}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
        // } else {
        //     return (
        //         <TouchableOpacity
        //             style={{
        //                 flexDirection: 'row',
        //                 backgroundColor: this.props.theme.THEME_ROW_COLOR,
        //                 height: 50,
        //                 justifyContent: 'flex-start',
        //                 alignItems: 'center'
        //             }}
        //             onPress={this.props.optionalFunc}
        //         >
        //             <Text style={{marginLeft: 10}}>{this.props.content}</Text>
        //             <View
        //                 style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#00ff00'}}>
        //                 <View style={{marginRight: 20}}>
        //                     <Ionicons
        //                         name={'ios-arrow-forward'}
        //                         size={20}
        //                         style={{color: this.props.theme.THEME_ICON_COLOR}}
        //                     />
        //                 </View>
        //             </View>
        //         </TouchableOpacity>
        //     )
        // }
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

export default connect(mapStateToProps)(InputRow)