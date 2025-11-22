export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(onboarding)/splash',
};

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  // Temporarily disabled auth check to let app load
  // Will re-enable once Appwrite is fully configured

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(resident)" />
        <Stack.Screen name="(worker)" />
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
