import { StyleSheet, View, Text, TouchableHighlight, useColorScheme } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

export default function Button({ children, type = 'text', color, /* or icon */ variant = 'solid', size = 16, onPress = () => { }, style = [], textStyle = [], ...props }) {
    const iconColor = variant === 'solid' ? 'black' : 'white';

    return (
        <TouchableHighlight style={[styles.btn, variant === 'solid' ? {} : { backgroundColor: 'transparent' }, ...style]} onPress={onPress} {...props}>
            {
                type === 'text' ?
                    <Text style={[textStyles.text, variant === 'solid' ? {} : { color: '#fff' }, ...textStyle]}>
                        {children}
                    </Text>
                    :
                    <View>
                        <FontAwesome6 name={children} size={size} color={color || iconColor} />
                    </View>
            }
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: '#ffffff'
    }
});

const textStyles = StyleSheet.create({
    text: {
        fontWeight: 500,
        fontSize: 16,
        color: '#000000'
    }
});