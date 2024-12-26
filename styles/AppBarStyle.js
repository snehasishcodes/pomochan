import { StyleSheet } from 'react-native';

const AppBarStyle = StyleSheet.create({
    appbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    startButton: {
        width: '100%'
    }
});


export default AppBarStyle;