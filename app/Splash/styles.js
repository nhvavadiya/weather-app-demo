import { StyleSheet } from 'react-native';
import COLOR_CONST from '../theme/ColorConstants'
export default StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: COLOR_CONST.green
    },
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        color: COLOR_CONST.green,
        fontSize: 30,
        fontFamily: 'Roboto-Bold'
    }
});