import React, {Component} from 'react'
import {NavigationActions} from "react-navigation";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
import NavigationUtil from "../navigator/NavigationUtil";
import {connect} from "react-redux";
import {BackHandler} from 'react-native'

class HomePage extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', ()=>{
            const {nav, dispatch} =this.props
            if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
                return false;
            }
            dispatch(NavigationActions.back());
            return true;
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress")
    }

    render() {
        NavigationUtil.navigation = this.props.navigation
        return (
            <DynamicTabNavigator/>
        )
    }
}


const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(HomePage);