import {
    StyleSheet,
    Dimensions
} from 'react-native';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },

    tabContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 50,
        backgroundColor: 'white'
    },

    tab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    tabItem: {
        height: 35,
        width: 50,
        resizeMode: 'contain'
    },

    tabLine: {
        position: 'absolute', 
        top: 0, 
        height: 1, 
        width: '200%', 
        backgroundColor: 'rgb(226, 226, 226)'
    },

    header: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between'
    },

    headerButtons: {
        flexDirection: 'row',
        marginRight: 10
    },

    headerButton: {
        margin: 10,
        height: 30,
        width: 23,
        resizeMode: 'contain'
    },

    notifications: {
        position: 'absolute',
        bottom: 9,
        left: 5,
        backgroundColor: '#FF1654',
        height: 16,
        width: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    notificationText: {
        color: 'white',
        fontSize: 10
    },

    title: {
        fontFamily: 'System',
        fontWeight: 'bold',
        color: '#FF1654',
        fontSize: 35,
        margin: 20,
        marginTop: 28
    },

    optionItem: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        padding: 5,
        width: 110,
        borderWidth: 1,
        borderColor: '#FF1654',
        borderRadius: 3.4
    },

    optionText: {
        color: '#FF1654'
    },

    list: {
        backgroundColor: 'rgb(226, 226, 226)',
        width: '100%',
        marginBottom: 50
    },

    card: {
        margin: 5,
        backgroundColor: 'white',
        width: (window.width-20)/2,
        borderRadius: 6,
        overflow: 'hidden'
    },

    cardImage: {
        width: '100%',

    },

    sale: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 5,
        paddingVertical: 2,
        backgroundColor: '#FF1654',
        color: 'white'
    },

    productName: {
        fontWeight: 'bold',
        padding: 5
    },

    brand: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    brandImage: {
        margin: 5,
        height: 14,
        width: 14
    },

    brandText: {
        fontSize: 11
    },

    price: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },

    priceText: {
        color: '#FF1654',
        paddingLeft: 5
    },

    oldPriceText: {
        fontSize: 11
    },

    featured: {
        fontSize: 11,
        padding: 5
    },

    likes: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    friendImage: {
        width: 24,
        height: 24,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 12
    },

    likedImage: {
        width: 20,
        height: 18,
        resizeMode: 'contain'
    },

    likesText: {
        fontSize: 11
    },

    containerLongPress: {
        flex: 1, 
        justifyContent: 'center'
    },

    longPressButton: {
        width: 50,
        height: 50,
        borderRadius: 6,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },


});