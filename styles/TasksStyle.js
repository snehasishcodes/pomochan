import { StyleSheet } from 'react-native';

const TasksStyle = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 4,
    },
    menu: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8
    },
    menuFirst: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 4
    },
    tasks: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        marginBottom: 20
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 20,
        paddingVertical: 12
    },
    input: {
        fontSize: 18,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        width: '80%',
        paddingHorizontal: 12,
        paddingVertical: 6
    }
});

export default TasksStyle;