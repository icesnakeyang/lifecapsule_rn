import React, {Component} from 'react'
import {
    ViewPropTypes,
    View,
    StatusBar,
    Text,
    StyleSheet,
    Platform,
    DeviceInfo,
    TouchableOpacity
} from 'react-native'
import {PropTypes} from 'prop-types'

const NAV_BAR_HEIGHT_IOS=44
const NAV_BAR_HEIGHT_ANDROID=50
const NAV_BAR_HEIGHT=Platform.OS==='ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID
const STATUS_BAR_HEIGHT=(Platform.OS!=='ios'||DeviceInfo.isIPhoneX_deprecated)?0:20

const StatusBarShape={
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    hidden:PropTypes.boolean,
    backgroundColor:PropTypes.string
}

export default class NavigationBar extends Component{
    static propTypes={
        style:ViewPropTypes.style,
        title:PropTypes.string,
        titleView:PropTypes.element,
        titleLayoutStyle:ViewPropTypes.style,
        hidden:PropTypes.boolean,
        statusBar:PropTypes.shape(StatusBarShape),
        rightButton:PropTypes.element,
        leftButton:PropTypes.element
    }

    static defaultProps={
        statusBar:{
            barStyle: 'light-content',
            hidden:false
        }
    }

    render(){
        let statusBar=!this.props.statusBar.hidden?
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar}/>
            </View>:null

        let titleView=this.props.titleView?this.props.titleView:
            <Text ellipsizeMode='head' numberOfLines={1} style={styles.title}>{this.props.title}</Text>

        let content=this.props.hide?null:
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>
        
        return(
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }

    getButtonElement(data) {
        return(
            <View style={styles.navBarButton}>
                {data?data:null}
            </View>
        )
        
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#2196f3'
    },
    navBarButton:{
        alignItems:'center'
    },
    navBar:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        height:NAV_BAR_HEIGHT
    },
    navBarTitleContainer:{
        alignItems:'center',
        justifyContent: 'center',
        position:'absolute',
        left:40,
        right:40,
        top:0,
        bottom:0
    },
    title:{
        fontSize:20,
        color:'#ddd'
    },
    statusBar:{
        height: STATUS_BAR_HEIGHT
    }
})