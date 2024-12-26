import { View } from 'react-native';
import CB from 'expo-checkbox';
import ThemeText from './ThemeText';

export default function Checkbox({ children, value, onValueChange = () => { } }) {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <CB color={'gray'} style={{ marginVertical: 8, marginRight: 8, borderWidth: 1 }} value={value ?? false} onValueChange={onValueChange} />
            <ThemeText style={[{ fontSize: 22 }]}>{children}</ThemeText>
        </View>
    );
}

