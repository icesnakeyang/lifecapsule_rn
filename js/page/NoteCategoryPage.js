import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native'
import actions from "../action";
import {connect} from "react-redux";

class NoteCategoryPage extends Component {
    render() {
        return (
            <View>
                <Text>Note category page</Text>
                <Button title={'change color'} onPress={() => {
                    this.props.onThemeChange('#ff0000')
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