import { useFonts } from 'expo-font';
import '../global.css';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { white } from 'tailwindcss/colors';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'urbanist-medium': require('../assets/fonts/Urbanist/Urbanist-Medium.ttf'),
    'inter-regular': require('../assets/fonts/Inter/Inter-Regular.ttf'),
    'inter-medium': require('../assets/fonts/Inter/Inter-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          animation: 'ios',
          headerShown: false,
          contentStyle: { backgroundColor: white },
        }}
      />
    </GestureHandlerRootView>
  );
}
