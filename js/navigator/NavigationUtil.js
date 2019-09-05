export default class NavigationUtil {
    static resetToHomePage(params) {
        const {navigation} = params
        navigation.navigate('Main')
    }

    static goPage(params, page) {
        const navigation = NavigationUtil.navigation
        console.log(navigation)
        console.log(page)
        navigation.navigate(
            page,
            {...params}
        )
    }
}