import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import styles from './styles/AppStyle';
import Pomodoro from './components/Pomodoro';

export default function App() {
	useKeepAwake();

	return (
		<View style={[styles.app]}>
			<StatusBar style={'auto'} />
			<Pomodoro />
		</View>
	);
}


