import { StyleSheet } from 'react-native';

const SettingsStyle = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 20,
        padding: 20,
        height: '90%'
    },
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 20
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
    },
    numberInput: {
        fontSize: 18,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 6
    },
    btns: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
        marginTop: 20
    }
});

export default SettingsStyle;