import '../global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { white } from 'tailwindcss/colors';

import { queryClient } from '~/data/query-client';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'urbanist-medium': require('../assets/fonts/Urbanist/Urbanist-Medium.ttf'),
    'urbanist-semibold': require('../assets/fonts/Urbanist/Urbanist-SemiBold.ttf'),
    'inter-regular': require('../assets/fonts/Inter/Inter-Regular.ttf'),
    'inter-medium': require('../assets/fonts/Inter/Inter-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            animation: 'ios',
            headerShown: false,
            contentStyle: { backgroundColor: white },
          }}
        />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
