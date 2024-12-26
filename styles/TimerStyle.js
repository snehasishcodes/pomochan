import { StyleSheet } from 'react-native';

const TimerStyle = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        height: '75%',
        padding: 20
    },
    modeBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12
    },
    mode: {
        opacity: 0.2
    },
    modeActive: {
        opacity: 1,
    },
    timerBox: {
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: 300
    },
    timerText: {
        fontSize: 100,
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontWeight: 800,
        width: 300,
        textAlign: 'center',
        fontFamily: 'monospace'
    }
});

export default TimerStyle;