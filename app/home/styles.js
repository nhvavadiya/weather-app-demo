import { StyleSheet } from 'react-native';
import COLOR_CONST from '../theme/ColorConstants'
export default StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerView: {
        height: 55,
        backgroundColor: COLOR_CONST.green,
        justifyContent: "center",
        alignItems: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Roboto-Medium',

    },
    boxView: {
        height: 60,
        width: '100%',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    box1: {
        flex: 1,
        padding: 10,
        justifyContent: "space-between",
    },
    box2: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tempText: {
        fontSize: 22,
        fontFamily: 'Roboto-Medium'
    },
    cityname: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,

    },
    weatherdes: {
        fontFamily: 'Roboto-Light',
        fontSize: 12,

    }
});