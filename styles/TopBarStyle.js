import { StyleSheet } from 'react-native';

const TopBarStyle = StyleSheet.create({
    topbar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        gap: 10,
    },
    branding: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    brandingName: {
        fontSize: 30,
        fontWeight: 500,
        textAlign: 'center',
        fontFamily: 'monospace'
    },
    btns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5
    }
});


export default TopBarStyle;