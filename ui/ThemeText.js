import { StyleSheet, Text } from 'react-native';

export default function ThemeText({ children, style = [], ...props }) {

    return (
        <Text style={[styles.text, ...style]} {...props}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: '#ffffff'
    }
});

